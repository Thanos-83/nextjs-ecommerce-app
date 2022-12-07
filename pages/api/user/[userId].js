import connectdb from '../../../database/connectDB';
import User from '../../../models/user';

connectdb();

export default async function userActionsById(req, res) {
  // console.log(req.query);
  const {
    method,
    query: { userId },
  } = req;
  // console.log(method, userId);

  switch (method) {
    // Find user by ID
    case 'GET':
      try {
        const user = await User.findById(userId);
        // const user = await User.find({ _id: userId });
        // const user = await User.find({ firstName: 'Thanos' });

        if (!user) {
          throw new Error('User not found');
        }

        res.status(200).json({ msg: 'User found', user });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    case 'PUT':
      // Find user by id and update
      try {
        const { name, password, email, role } = req.body;
        const updateUser = await User.findById(userId);

        if (!updateUser) {
          throw new Error('User NOT found');
        }

        updateUser.name = name;
        updateUser.password = password;
        updateUser.email = email;
        updateUser.role = role;

        const updatedUser = await updateUser.save();

        res.status(200).json({ msg: 'User updated', updatedUser });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // Find user by id and delete
    case 'DELETE':
      try {
        const deleteUser = await User.findById(userId);

        if (!deleteUser) {
          throw new Error('user NOT found');
        }

        const deletedUser = await deleteUser.remove();
        res.status(200).json({ msg: 'User deleted', deletedUser });
      } catch (error) {
        res
          .status(401)
          .json({ msg: 'Error deleting user', errorMsg: error.message });
      }
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
