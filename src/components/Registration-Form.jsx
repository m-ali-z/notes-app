"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./ui/CardWrapper";
import { RegisterSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { registerUser } from "../actions/register";
export default function RegistrationForm() {
  const [isPending, setIsPending] = useTransition();
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  function onSubmitForm(values) {
    registerUser(values);
  }
  return (
    <CardWrapper title="REGISTRATION">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col space-y-8 mt-10 text-lg">
          <label htmlFor="name">
            NAME
            <input
              type="text"
              name="name"
              placeholder="example name"
              className="w-full mt-2 p-2 rounded-md"
              disabled={isPending}
              {...register("name")}
            />
          </label>
          {errors.name && (
            <span className="p-2 bg-red-300 font-bold text-red-600">
              This field is required!
            </span>
          )}
          <label htmlFor="email">
            EMAIL
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full mt-2 p-2 rounded-md"
              disabled={isPending}
              {...register("email")}
            />
          </label>
          {errors.email && (
            <span className="p-2 bg-red-300 font-bold text-red-600">
              This field is required!
            </span>
          )}
          <label htmlFor="password">
            PASSWORD
            <input
              type="password"
              name="password"
              placeholder="******"
              className="w-full mt-2 p-2 rounded-md"
              disabled={isPending}
              {...register("password")}
            />
          </label>
          {errors.email && (
            <span className="p-2 bg-red-300 font-bold text-red-600">
              This field is required!
            </span>
          )}
          <button type="submit" className="bg-blue-400 rounded-md p-2">
            Register
          </button>
        </div>
      </form>
    </CardWrapper>
  );
}
