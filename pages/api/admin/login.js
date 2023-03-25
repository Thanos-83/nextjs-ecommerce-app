import { withIronSessionApiRoute } from 'iron-session/next';

// export default withIronSessionApiRoute(
//   async function loginRoute(req, res) {
//     // get user from database then:
//     const { email, password } = req.body;
//     console.log('email: ', email, 'password: ', password);
//     req.session.user = {
//       email: email,
//       id: 230,
//       admin: true,
//     };
//     await req.session.save();
//     res.send({ ok: true });
//   },
//   {
//     cookieName: 'myapp_cookiename',
//     password: 'complex_password_at_least_32_characters_long',
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     cookieOptions: {
//       secure: process.env.NODE_ENV === 'production',
//       //   httpOnly: true,
//     },
//   }
// );

async function loginRoute(req, res) {
  // get user from database then:
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        console.log('email: ', email, 'password: ', password);
        console.log(req.session);
        // req.session.user = {
        //   email: email,
        //   id: 230,
        //   admin: true,
        // };
        res.send({ ok: true });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error });
      }

      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}

export default loginRoute;
