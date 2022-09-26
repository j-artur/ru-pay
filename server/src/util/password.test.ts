import { hashPassword, verifyPassword } from "./password";

describe("Password hashing", () => {
  it("should hash a password", async () => {
    const password = "password";

    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });

  it("should verify a password", async () => {
    const password = "password";

    const hashedPassword = await hashPassword(password);
    const isPasswordValid = await verifyPassword(password, hashedPassword);

    expect(isPasswordValid).toBe(true);
  });

  it("should not verify an invalid password", async () => {
    const password = "password";

    const hashedPassword = await hashPassword(password);
    const isPasswordValid = await verifyPassword("invalid", hashedPassword);

    expect(isPasswordValid).toBe(false);
  });
});
