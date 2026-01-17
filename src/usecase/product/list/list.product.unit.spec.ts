import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "Product 1", 100);
const product2 = new Product("456", "Product 2", 200);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list product use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);
    const result = await productListUseCase.execute({});
    
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });

  it("should return empty list when no products exist", async () => {
    const productRepository = MockRepository();
    productRepository.findAll.mockReturnValue(Promise.resolve([]));
    const productListUseCase = new ListProductUseCase(productRepository);
    const result = await productListUseCase.execute({});
    
    expect(result.products.length).toBe(0);
  });
});
