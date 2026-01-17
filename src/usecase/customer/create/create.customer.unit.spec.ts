import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "123 Main St",
    number: 123,
    zip: "12345",
    city: "Anytown",
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    };

    const result = await customerCreateUseCase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an error when name is required", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is required", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
  });
});