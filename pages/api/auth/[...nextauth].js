// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const adminEmails = ['thecodingtutor1@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session }) {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return null; // Return null if not an admin
      }
    },
  },
};

export default NextAuth(authOptions);
