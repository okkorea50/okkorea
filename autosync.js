import { watch } from 'fs';
import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const watchPath = resolve(__dirname, 'src');
let timeoutId = null;

const REPO_OWNER = 'okkorea50';
const REPO_NAME = 'okkorea';

console.log(`🚀 Advanced Auto-sync started! Monitoring: ${watchPath}`);
console.log('💡 Tip: Changes will be validated and pushed 5 seconds after your last edit.');

const runCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) reject({ error, stdout, stderr });
            else resolve({ stdout, stderr });
        });
    });
};

const pollDeploymentStatus = async (commitHash) => {
    console.log(`⏳ Waiting for GitHub Actions deployment to complete (Commit: ${commitHash.substring(0, 7)})...`);

    let attempts = 0;
    const maxAttempts = 20; // 10 minutes max (30s * 20)

    const check = async () => {
        try {
            const { stdout } = await runCommand(`curl -s https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${commitHash}/check-runs`);
            const data = JSON.parse(stdout);

            const deployRun = data.check_runs.find(run => run.name === 'build-and-deploy' || run.name.includes('Deploy'));

            if (deployRun) {
                const { status, conclusion } = deployRun;
                console.log(`   - Current Status: ${status} (${conclusion || 'running'})`);

                if (status === 'completed') {
                    if (conclusion === 'success') {
                        console.log('\n✨ DEPLOYMENT SUCCESSFUL! The site is now live with your latest changes.');
                        console.log(`🔗 URL: https://${REPO_OWNER}.github.io/${REPO_NAME}/`);
                        return true;
                    } else {
                        console.error(`\n❌ Deployment failed with conclusion: ${conclusion}`);
                        return true;
                    }
                }
            } else {
                console.log('   - Waiting for workflow to trigger...');
            }
        } catch (err) {
            console.error('   ⚠️ Error checking status:', err.message);
        }
        return false;
    };

    const interval = setInterval(async () => {
        attempts++;
        const done = await check();
        if (done || attempts >= maxAttempts) {
            clearInterval(interval);
            if (attempts >= maxAttempts) console.log('🛑 Polling timeout. Please check GitHub Actions manually.');
        }
    }, 30000); // Check every 30 seconds
};

const performSync = async () => {
    try {
        console.log('\n🔍 [1/4] Validating code (lint)...');
        await runCommand('npm run lint');

        console.log('🏗️ [2/4] Verifying build...');
        await runCommand('npm run build');

        console.log('📤 [3/4] Pushing changes to GitHub...');
        const timestamp = new Date().toLocaleString();
        const commitMsg = `Auto-sync: ${timestamp}`;

        await runCommand('git add .');
        try {
            await runCommand(`git commit -m "${commitMsg}"`);
        } catch (e) {
            if (e.stdout.includes('nothing to commit')) {
                console.log('✅ Nothing new to commit.');
                return;
            }
            throw e;
        }

        await runCommand('git push origin main');

        const { stdout: hash } = await runCommand('git rev-parse HEAD');
        const commitHash = hash.trim();

        console.log('✅ [4/4] Changes pushed successfully!');

        // Start polling for deployment status
        pollDeploymentStatus(commitHash);

    } catch (err) {
        console.error('\n❌ Auto-sync Process Failed:');
        if (err.stdout) console.error(err.stdout);
        if (err.stderr) console.error(err.stderr);
        console.log('🙏 Please fix the errors above and save again.');
    }
};

watch(watchPath, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.includes('.git')) {
        console.log(`📝 Change detected: ${filename}`);

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            performSync();
            timeoutId = null;
        }, 5000);
    }
});
