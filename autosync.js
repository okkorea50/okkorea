import { watch } from 'fs';
import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const watchPath = resolve(__dirname, 'src');
let timeoutId = null;

console.log(`🚀 Auto-sync started! Monitoring: ${watchPath}`);
console.log('💡 Tip: Changes will be pushed 5 seconds after your last edit.');

const performSync = () => {
    console.log('\n🔄 Syncing changes to GitHub...');

    const timestamp = new Date().toLocaleString();
    const commitMsg = `Auto-sync: ${timestamp}`;

    const command = `git add . && git commit -m "${commitMsg}" && git push origin main`;

    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            if (stdout.includes('nothing to commit')) {
                console.log('✅ Nothing new to commit.');
            } else {
                console.error(`❌ Sync failed: ${error.message}`);
            }
            return;
        }
        if (stderr && !stderr.includes('To https://github.com')) {
            console.warn(`⚠️ Warning: ${stderr}`);
        }
        console.log('✅ Changes pushed successfully!');
        console.log('🚀 GitHub Actions will now start the deployment.');
    });
};

watch(watchPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
        console.log(`📝 Change detected: ${filename}`);

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            performSync();
            timeoutId = null;
        }, 5000); // 5 second debounce
    }
});
