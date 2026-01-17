import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await productCreateUseCase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute({
      name: "",
      price: 100,
    })).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute({
      name: "Product 1",
      price: -10,
    })).rejects.toThrow("Price must be greater than zero");
  });
});
