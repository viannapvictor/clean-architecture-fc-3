import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.costumer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.changeAddress(address);

const mockCustomerRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(customer),
    create: jest.fn().mockResolvedValue(customer),
    update: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn().mockResolvedValue([customer]),
  };
};
describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = mockCustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { 
      id: "123",
    };

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        zip: "Zipcode 1",
        city: "City 1",
      },
    }

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = mockCustomerRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { 
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow("Customer not found");
  });
});