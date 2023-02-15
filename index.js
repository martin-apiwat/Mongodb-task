import mongoose from "mongoose";
import { swamp, faker } from "fongus";

const carSchema = new mongoose.Schema({
  color: String,
  model: String,
  brand: String,
  hp: Number,
});

const Car = mongoose.model("cars", carSchema);

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );

  await swamp({
    count: 10,
    fields: {
      color: faker.color.human,
      model: faker.vehicle.model,
      brand: faker.vehicle.manufacturer,
      hp: faker.random.numeric,
    },
    path: Car,
  });

  const cars = await Car.find().sort({ hp: "desc" }).limit(3);
  console.log(cars);
}

main();
