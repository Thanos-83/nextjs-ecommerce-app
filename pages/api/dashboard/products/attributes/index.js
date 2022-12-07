import connectdb from '../../../../../database/connectDB';

import Attributes from '../../../../../models/attributes';
import Terms from '../../../../../models/terms';
connectdb();

export default async function attributeActions(req, res) {
  const { method } = req;

  switch (method) {
    // @desc    Fetch All attributes from the DB
    // @route   GET /api/dashboard/products/attributes
    // @access  Private
    case 'GET':
      try {
        const attributes = await Attributes.find().populate({
          path: 'terms',
          select: 'slug',
          model: Terms,
        });

        if (attributes.length === 0) {
          throw new Error('There are NO Attributess');
        }
        res.status(200).json({ attributes });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Add Attributes to the DB
    // @route   POST /api/dashboard/products/attributes
    // @access  Private
    case 'POST':
      try {
        const { name, slug, description, terms } = req.body;
        const isAttributeUnique = await Attributes.find({ name });
        if (isAttributeUnique.length !== 0) {
          throw new Error('Attribute already exists!');
        }
        const newAttribute = {
          name,
          slug,
          description,
          terms,
        };

        const attributeCreated = await Attributes.create(newAttribute);
        res.status(200).json({ msg: 'response', attribute: attributeCreated });
      } catch (error) {
        console.log('iam here...');
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Update Attributes
    // @route   PUT /api/dashboard/products/attributes
    // @access  Private
    case 'PUT':
      try {
        const { name, slug, description, attributeID } = req.body;
        const attributeToUpdate = await Attributes.findById(attributeID);

        if (!attributeToUpdate) {
          throw new Error('User NOT found');
        }

        attributeToUpdate.name = name;
        attributeToUpdate.slug = slug;
        attributeToUpdate.description = description;

        const updatedAttribute = await attributeToUpdate.save();

        res.status(200).json({ msg: 'Attribute updated', updatedAttribute });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Delete Attribute from the DB
    // @route   DELETE /api/dashboard/products/attributes
    // @access  Private
    case 'DELETE':
      try {
        // console.log(req.body.attributeID);
        const attributeToDelete = await Attributes.findByIdAndDelete(
          req.body.attributeID
        );
        // console.log(attributeToDelete);

        res.status(200).json({ msg: 'Attribute deleted', attributeToDelete });
      } catch (error) {
        res
          .status(401)
          .json({ msg: 'Error deleting user', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
