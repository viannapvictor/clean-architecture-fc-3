import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);

const mockProductRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = mockProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = { 
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = mockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const useCase = new FindProductUseCase(productRepository);

    const input = { 
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
