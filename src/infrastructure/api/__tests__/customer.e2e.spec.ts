import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
          zip: "12345",
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("123 Main St");
    expect(response.body.address.city).toBe("Anytown");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
      });
    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const customer1 = await request(app)
    .post("/customers")
    .send({
      name: "John Doe",
      address: {
        street: "123 Main St",
        city: "Anytown",
        number: 123,
        zip: "12345",
      },
    });

    expect(customer1.status).toBe(200);

    const customer2 = await request(app)
    .post("/customers")
    .send({
      name: "Jane Doe",
      address: {
        street: "456 Main St",
        city: "Othertown",
        number: 456,
        zip: "54321",
      },
    });

    expect(customer2.status).toBe(200);

    const listResponse = await request(app)
      .get("/customers")
      .send({});
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].name).toBe(customer1.body.name);
    expect(listResponse.body.customers[0].address.street).toBe(customer1.body.address.street);
    expect(listResponse.body.customers[0].address.city).toBe(customer1.body.address.city);
    expect(listResponse.body.customers[0].address.number).toBe(customer1.body.address.number);
    expect(listResponse.body.customers[0].address.zip).toBe(customer1.body.address.zip);
    expect(listResponse.body.customers[1].name).toBe(customer2.body.name);
    expect(listResponse.body.customers[1].address.street).toBe(customer2.body.address.street);
    expect(listResponse.body.customers[1].address.city).toBe(customer2.body.address.city);
    expect(listResponse.body.customers[1].address.number).toBe(customer2.body.address.number);
    expect(listResponse.body.customers[1].address.zip).toBe(customer2.body.address.zip);
  });
});