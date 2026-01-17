import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe", 
  new Address("Street 1", 123, "12345", "Anytown")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe", 
  new Address("Street 2", 456, "54321", "Othertown")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
}

describe("Unit test list customer use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const customerListUseCase = new ListCustomerUseCase(customerRepository);
    const result = await customerListUseCase.execute({});
    expect(result.customers.length).toBe(2);
    expect(result.customers[0].id).toBe(customer1.id);
    expect(result.customers[0].name).toBe(customer1.name);
    expect(result.customers[0].address.street).toBe(customer1.Address.street);
    expect(result.customers[0].address.number).toBe(customer1.Address.number);
    expect(result.customers[0].address.zip).toBe(customer1.Address.zip);
    expect(result.customers[0].address.city).toBe(customer1.Address.city);
    expect(result.customers[1].id).toBe(customer2.id);
    expect(result.customers[1].name).toBe(customer2.name);
    expect(result.customers[1].address.street).toBe(customer2.Address.street);
    expect(result.customers[1].address.number).toBe(customer2.Address.number);
    expect(result.customers[1].address.zip).toBe(customer2.Address.zip);
    expect(result.customers[1].address.city).toBe(customer2.Address.city);
  });
});
