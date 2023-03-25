import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/user';
import connectdb from '../../../database/connectDB';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../database/mongoAdapter';

connectdb();

export const authOptions = {
  session: {
    strategy: 'database',
    // strategy: 'jwt',
    // jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      // credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Invalid email');
        }

        const comparePasswords = await bcrypt.compare(password, user.password);

        if (!comparePasswords) {
          throw new Error('Invalid password!');
        }
        delete user.password;
        // console.log(`Returned User: ${user}`);

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('Sign In: ', { user, account, profile, email, credentials });
      return true;
    },

    async session({ session, token, user, account, profile, email }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;
      // session.user.role = token.role;
      session.test = 'test';
      session.user.cart = { items: [] };

      console.log('Sesssion callback: ', session);
      // console.log('Session callback: ', {
      //   session,
      //   token,
      //   user,
      //   account,
      //   profile,
      //   email,
      // });

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token ? account.access_token : null;
        token.profileID = profile ? profile.id : null;
        token.providerAccountId = account.providerAccountId;
      }
      if (user) {
        console.log('iam in jwt...');
        if (user?.role === 'admin') {
          token.role = 'admin';
        } else {
          token.role = 'customer';
        }
        token.username = user?.name;
        token.id = user.id;
      }
      // console.log('JWT: ', { token, user, account, profile, isNewUser });

      return token;
    },
  },

  pages: {
    signIn: '/account/login/',
  },
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
