const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("should return API is working", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API is working.")
  });
});

describe("GET /api/auth", () => {
  it("should return 404(Not found)", async () => {
    const res = await request(app).get("/api/auth/nonexisting")
    expect(res.statusCode).toBe(404)
  })
})
