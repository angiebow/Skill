const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Mathematics"},
                {name: "Physics"},
                {name: "Chemistry"},
                {name: "Biology"},
                {name: "History"},
                {name: "Geography"},
                {name: "English"},
            ]
        })
        console.log("Database seeded successfully");
    } catch (error) {
        console.log("Error seeding database category", error);
    } finally {
        await database.$disconnect();
    }
}

main();