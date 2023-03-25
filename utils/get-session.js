// import nextSession from 'next-session';
// import { expressSession, promisifyStore } from 'next-session/lib/compat';
// const MongoStore = require('connect-mongo');
// // import MongoStore from 'connect-mongo';
// export const getSession = nextSession({
//   name: 'test_session',
//   autoCommit: true,
//   store: promisifyStore(
//     MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI,
//       autoRemove: 'native', // Default
//       ttl: 14 * 24 * 60 * 60, // = 14 days. Default
//     })
//   ),
//   cookie: {
//     secure: process.env.NODE_ENV !== 'development',
//     sameSite: true,
//   },
// });
