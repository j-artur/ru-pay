import argon2 from "argon2"

export const hashPassword = (pw: string) => argon2.hash(pw)

export const verifyPassword = (pw: string, hash: string) =>
  argon2.verify(hash, pw)
