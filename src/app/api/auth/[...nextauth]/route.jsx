import GoogleProvider from "next-auth/providers/google";
import db from "@/src/lib/db";
import NextAuth from "next-auth/next";
import { saveUser } from "@/src/data/notes";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;
      const providerId = account.providerAccountId;
      const provider = account.provider;
      return true;
    },
    async redirect({}) {
      return "/notes";
    },
    async session({ session, token, user }) {
      // Add custom properties to the session if needed
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Add custom properties to the JWT token if needed
      return token;
    },
  },
});
export { handler as GET, handler as POST };
