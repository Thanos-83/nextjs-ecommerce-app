import connectdb from '../../../database/connectDB';
import User from '../../../models/user';
import bcrypt from 'bcrypt';

connectdb();

export default async function userActions(req, res) {
  console.log(req.method);
  const { method } = req;

  switch (method) {
    // Find and return all users
    case 'GET':
      try {
        console.log('users 1');
        const users = await User.find();
        console.log('users 2');
        if (!users) {
          throw new Error('There are NO Users yet');
        }
        res.status(200).json({ users });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error });
      }
      break;
    // Create user in the DB
    case 'POST':
      try {
        const { name, password, email, role } = req.body;

        const findUser = await User.find({ email });
        // console.log(findUser.length);
        if (findUser.length !== 0) {
          throw new Error(
            `There is already user with the email: ${email}. Plese choose a different one!`
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const newUser = { name, password: hashedPassword, email, role };
        console.log(newUser);

        const userCreated = await User.create(newUser);
        res
          .status(200)
          .json({ msg: 'User created successfully', user: userCreated });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
