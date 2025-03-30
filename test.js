// requrire a .env file in the root directory of the application
require("dotenv").config(); 

describe("Environment Variables Check", () => {
  test("should have all required environment variables", () => {
    expect(process.env.DB_HOST).toBeTruthy();
    expect(process.env.USER).toBeTruthy();
    expect(process.env.USER_PASS).toBeTruthy();
    expect(process.env.DB_NAME).toBeTruthy();
  });
});

