const request = require("supertest");

jest.mock("../config/nodemailer", () => ({
  sendMail: jest.fn().mockResolvedValue(true),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "fake-jwt-token"),
}));

const mockHash = jest.fn().mockResolvedValue("mock_hashed_password");
const mockCompare = jest.fn();

jest.mock("bcryptjs", () => ({
  hash: mockHash,
  compare: mockCompare,
}));

const mockSave = jest.fn().mockResolvedValue(true);
const mockFindOne = jest.fn();

jest.mock("../models/userModel", () => {
  return jest.fn().mockImplementation(() => ({
    save: mockSave,
    _id: "mock_user_id",
  }));
});

const app = require("../app");
const userModel = require("../models/userModel");
userModel.findOne = mockFindOne;

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret-key";
    process.env.SENDER_EMAIL = "test@example.com";
  });

  it("should register a new user successfully", async () => {
    mockFindOne.mockResolvedValue(null);

    const res = await request(app).post("/api/auth/register").send({
      name: "Himadri",
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("User registered successfully.");
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it("should return 400 if name is missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing Details");
  });

  it("should return 400 if email is missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Himadri",
      password: "Himadri@123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing Details");
  });

  it("should return 400 if password is missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Himadri",
      email: "himadri12@zoho.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing Details");
  });

  it("should return 409 if user already exist", async () => {
    mockFindOne.mockResolvedValue({ "_id": "existing_user_id" });

    const res = await request(app).post("/api/auth/register").send({
      name: "Himadri",
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("User already exixts.");
    expect(mockSave).not.toHaveBeenCalled(); // Should NOT save if user exists
  })
});

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret-key";
  });

  it("should the user login successfully", async () => {
    mockFindOne.mockResolvedValue({ "_id": "existing_user_id", "password": "mock_hashed_password" })
    mockCompare.mockResolvedValue(true)

    const res = await request(app).post("/api/auth/login").send({
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe("logged in successfully")
  })

  it("should return 404 if email is missing", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "Himadri@123",
    })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("email and password are required.")
  })

  it("should return 404 if password is missing", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "himadri12@zoho.com",
    })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("email and password are required.")
  })

  it("should return 401 if user not exist", async () => {
    mockFindOne.mockResolvedValue(null)

    const res = await request(app).post("/api/auth/login").send({
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    })

    expect(res.statusCode).toBe(401)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("Invalid credentials")
  })

  it("should return 401 if the password does not match", async () => {
    mockFindOne.mockResolvedValue({ "_id": "existing_user_id", "password": "mock_password" })
    mockCompare.mockResolvedValue(false)

    const res = await request(app).post("/api/auth/login").send({
      email: "himadri12@zoho.com",
      password: "Himadri@123",
    })

    expect(res.statusCode).toBe(401)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("Invalid credentials")
  })
  
})

afterAll(() => {
  jest.restoreAllMocks();
});
