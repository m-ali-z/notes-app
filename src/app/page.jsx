"use client";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import LoginForm from "../components/Login-Form";
export default function Home({ session }) {
  return (
    <main className="flex flex-col h-screen bg-gray-800 ">
      <div className="flex flex-col h-full justify-center items-center">
        <SessionProvider session={session}>
          <LoginForm />
        </SessionProvider>
      </div>
    </main>
  );
}
