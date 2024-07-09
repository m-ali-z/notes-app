"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas";
export const loginUser = async (values) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields!" };
};
