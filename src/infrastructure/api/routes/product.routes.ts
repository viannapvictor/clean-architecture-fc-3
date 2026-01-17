import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoutes = express.Router();

productRoutes.post("/", async (req: Request, res: Response) => {
  const createProductUseCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await createProductUseCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoutes.get("/", async (req: Request, res: Response) => {
  const listProductUseCase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await listProductUseCase.execute({});
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default productRoutes;
