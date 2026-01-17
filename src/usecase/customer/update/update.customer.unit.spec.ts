import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe", 
  new Address("Street 1", 123, "12345", "Anytown")
);

const input = {
  id: customer.id,
  name: "Jane Doe Updated",
  address: {
    street: "Street 2 Updated",
    number: 456,
    zip: "54321 Updated",
    city: "Othertown Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
    const result = await customerUpdateUseCase.execute(input);
    expect(result).toEqual(input);
  });
});