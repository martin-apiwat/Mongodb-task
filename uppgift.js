import mongoose from "mongoose";
import { swamp, faker } from "fongus";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("users", userSchema);

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );

  /* await User.insertMany([
    { name: "Gilbert", age: 5, city: "Stockholm" },
    { name: "Adam", age: 19, city: "Stockholm" },
    { name: "Emma", age: 12, city: "Kalmar" },
    { name: "Fredrik", age: 45, city: "Malmö" },
    { name: "Mia", age: 29, city: "Göteborg" },
  ]); */

  /* await swamp({
    count: 5,
    fields: {
      name: faker.name.firstName,
      age: faker.random.numeric,
      city: faker.address.cityName,
    },
    path: User,
  }); */

  const users = await User.find({ city: "Stockholm" });

  const userUpdate = await User.updateOne(
    { name: "Gilbert", city: "Stockholm" },
    { $set: { city: "Malmö" } }
  );

  const users18 = await User.find({ age: { $gt: 18 } });

  const usersOrder = await User.find().sort({ name: "asc" });
  console.log(users);
}

main();
