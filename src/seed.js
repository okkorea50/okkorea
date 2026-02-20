import { db } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const jobs = [
    {
        title: "Global Marketing Intern",
        company: "Seoul Tech Global",
        location: "Seoul (Gangnam)",
        type: "Internship",
        salary: "KRW 2.2M / Month",
        tags: ["Marketing", "English", "Remote Friendly"],
        date: new Date().toISOString()
    },
    {
        title: "Junior Backend Developer",
        company: "K-Soft Solutions",
        location: "Pangyo Tech Valley",
        type: "Full-time",
        salary: "KRW 45M - 55M / Year",
        tags: ["Node.js", "Firebase", "Visa Support"],
        date: new Date().toISOString()
    },
    {
        title: "Hospitality Manager",
        company: "Evergreen Grand Hotel",
        location: "Jeju Island",
        type: "Full-time",
        salary: "KRW 3.5M / Month",
        tags: ["Hospitality", "Service", "Housing Provided"],
        date: new Date().toISOString()
    }
];

async function seed(retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`📡 Seeding attempt ${i + 1}/${retries}...`);
            const jobsCol = collection(db, 'jobs');
            for (const job of jobs) {
                await addDoc(jobsCol, job);
                console.log(`   ✅ Added job: ${job.title}`);
            }
            console.log("\n✨ Seeding completed successfully!");
            return;
        } catch (e) {
            console.error(`   ⚠️ Attempt ${i + 1} failed: ${e.message}`);
            if (i < retries - 1) {
                console.log("   ⏳ Waiting 10 seconds for database provisioning...");
                await new Promise(r => setTimeout(r, 10000));
            } else {
                console.error("\n❌ Maximum retries reached. Please check the Firebase console.");
            }
        }
    }
}

seed();
