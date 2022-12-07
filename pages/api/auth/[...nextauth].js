import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '../../../models/user';
import connectdb from '../../../database/connectDB';
import bcrypt from 'bcrypt';

connectdb();

export const authOptions = {
  session: {
    // strategy: 'database',
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      type: 'credentials',
      credentials: {},
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
        // console.log(`Here user: ${user}`);
        delete user.password;
        return user;
      },
    }),
    // EmailProvider({
    //   name: 'email',
    //   id: 'email',
    //   type: 'email',
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   // sendVerificationRequest: (params) => {
    //   //   console.log(params);
    //   // },
    // }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      // session.user.accessToken = token.accessToken;
      // console.log(`Inside session cb - session: ${session?.user.id}`, {
      //   session,
      //   token,
      //   user,
      // });
      // console.log(`Inside session cb - user: ${session?.user}`);

      return session;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log('The user account: ', account);
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id;
        token.providerAccountId = account.providerAccountId;
      }
      // console.log('jwt', { token, user });
      if (user) {
        console.log('iam here...');
        token.id = user.id;
      }

      // console.log(`Inside JWT cb - token:${{ token }}`);
      return token;
    },
  },

  pages: {
    signIn: '/account/login/',
  },
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
