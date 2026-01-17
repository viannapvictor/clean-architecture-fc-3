import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRoutes } from "./routes/customer.routes";
import { productRoutes } from "./routes/product.routes";

export const app: Express = express();

app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();