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

async function seed() {
    try {
        const jobsCol = collection(db, 'jobs');
        for (const job of jobs) {
            await addDoc(jobsCol, job);
            console.log(`Added job: ${job.title}`);
        }
        console.log("Seeding completed!");
    } catch (e) {
        console.error("Seeding failed: ", e);
    }
}

seed();
