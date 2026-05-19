import db from "../db/db.js";

const seedUsers = async () => {
  try {
    const addUsers = await db.query(
      `insert into users (email,phone) values('ash@gmail.com','+91 6785674536'),('misty@gmail.com','+91 6754789865'),('brock@pkmn.com','+91 6723456789')`,
    );
    if (!addUsers.rowCount) return console.error(`Seeding Failed!`);
    console.log(`Values Seeded!`);
  } catch (error) {
    if (error.code === "23505")
      return console.log(
        `Values Already seeded,Try adding Custom Values if needed!`,
      );
    console.error(error.message);
  }
};

seedUsers().finally(() => process.exit());
