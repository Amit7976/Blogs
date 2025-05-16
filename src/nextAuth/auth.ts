import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connect();

        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordCorrect = await compare(
          credentials!.password as string,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // custom login page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});