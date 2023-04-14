import connectdb from '../../../../../database/connectDB';
import Tag from '../../../../../models/tags';

connectdb();

export default async function tagActions(req, res) {
  const { method } = req;

  switch (method) {
    // @desc    Fetch tags from the DB
    // @route   GET /api/dashboard/tags
    // @access  Private
    case 'GET':
      try {
        const tags = await Tag.find({});
        // console.log(tags);
        if (tags.length === 0) {
          throw new Error('There are NO Tags');
        }
        res.status(200).json({ tags });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Add Tags to the DB
    // @route   POST /api/dashboard/tags
    // @access  Private
    case 'POST':
      try {
        const { name, slug } = req.body;
        const isTagUnique = await Tag.find({ name });

        if (isTagUnique.length !== 0) {
          throw new Error('Tag already exists!');
        }
        const newTag = {
          name,
          slug,
        };

        const tagCreated = await Tag.create(newTag);
        res.status(200).json({ msg: 'response', tag: tagCreated });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
