import NextAuth from "next-auth";
import { connectToDB } from "./lib/db.connect.js";
import { User } from "./lib/user.model.js";
import mongoose from "mongoose";
import authConfig from "./auth.config";
import { Order } from "./lib/order.model.js";
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user) return false;
      await connectToDB();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser?.isBlocked) return false;
        if (existingUser) {
          user.id = existingUser._id;
          return true;
        }
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        });
        await newUser.save();
        user.id = newUser._id;
        return true;
      }

      return false;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || token.image;
        session.user.role = token.role;
        session.user.phone = token.phone || null;
        session.user.isOrderActive = token.isOrderActive;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      if (mongoose.isValidObjectId(token.sub)) {
        await connectToDB();
        const user = await User.findOne({
          _id: token.sub,
        });
        if (!user) return token;
        const isOrderActive = await Order.find({
          userId: token.sub,
          isOrderActive: true,
          paymentStatus: "success",
          orderStatus: {
            $in: ["rejected", "pending", "processing", "printed"],
          },
        });

        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.phone = user?.phone || null;
        token.isOrderActive = isOrderActive?.length > 0;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
