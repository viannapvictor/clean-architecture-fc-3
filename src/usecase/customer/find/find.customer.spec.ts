import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.costumer.usecase";

describe("Test find customer use case", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequileze.addModels([CustomerModel]);
    await sequileze.sync();

  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const useCase = new FindCustomerUseCase(customerRepository);
    
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});