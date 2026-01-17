import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        price: 100,
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product with empty name", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "",
        price: 100,
      });
    expect(response.status).toBe(500);
  });

  it("should not create a product with negative price", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        price: -10,
      });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const product1 = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        price: 100,
      });

    expect(product1.status).toBe(200);

    const product2 = await request(app)
      .post("/products")
      .send({
        name: "Product 2",
        price: 200,
      });

    expect(product2.status).toBe(200);

    const listResponse = await request(app)
      .get("/products")
      .send({});
    
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].name).toBe(product1.body.name);
    expect(listResponse.body.products[0].price).toBe(product1.body.price);
    expect(listResponse.body.products[1].name).toBe(product2.body.name);
    expect(listResponse.body.products[1].price).toBe(product2.body.price);
  });
});
