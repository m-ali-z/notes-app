"use client";
import Link from "next/link";
import CardWrapper from "./ui/CardWrapper";
import { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";
import { LoginSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser } from "../actions/login";
import { signIn, signOut, useSession } from "next-auth/react";
export default function LoginForm() {
  const { data: session } = useSession();

  const [isPending, setIsPending] = useTransition();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
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
    loginUser(values);
  }
  return (
    <CardWrapper title="LOGIN">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="mt-4 w-[30%] m-auto flex justify-center items-center bg-blue-400 p-2 rounded-lg"
        >
          <FaGoogle color="yellow" />
          {"oogle"}
        </button>
      ) : (
        <div>
          <p>{session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </CardWrapper>
  );
}
