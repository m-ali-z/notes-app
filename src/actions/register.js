"use server";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
export const registerUser = async (values) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields!" };
};
