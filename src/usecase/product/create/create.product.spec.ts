import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.price).toBe(input.price);

    // Verify the product was persisted
    const foundProduct = await productRepository.find(result.id);
    expect(foundProduct.id).toBe(result.id);
    expect(foundProduct.name).toBe(input.name);
    expect(foundProduct.price).toBe(input.price);
  });
});
