import connectdb from '../../../../../../../database/connectDB';
import Term from '../../../../../../../models/terms';
import Attribute from '../../../../../../../models/attributes';

connectdb();

export default async function attributeTermsActions(req, res) {
  const { method } = req;
  const { attributeId } = req.query;

  switch (method) {
    // @desc    Fetch terms from single Attribute
    // @route   GET /api/dashboard/products/terms
    // @access  Private
    case 'GET':
      try {
        // const terms = await Term.find({});
        const attribute = await Attribute.findById(
          req.query.attributeId
        ).populate('terms');
        // console.log('Attribute Terms: ', attribute);
        if (attribute.terms.length === 0) {
          throw new Error('There are NO Terms');
        }
        res.status(200).json({ terms: attribute.terms });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Add Attribute Term
    // @route   POST /api/dashboard/products/attributes/[attributeId]/terms
    // @access  Private
    case 'POST':
      try {
        const { name, slug, description } = req.body;

        const singleAttribute = await Attribute.findById(attributeId).populate({
          path: 'terms',
        });

        const termNotUnique = singleAttribute.terms.find(
          (term) => term.name === name
        );

        if (termNotUnique) {
          throw new Error('Term Exists!');
          // return res.status(200).json({ msg: 'Term Already Exists!' });
        }
        // console.log(slug);
        const newTerm = {
          name,
          slug,
          description,
        };

        const termCreated = await Term.create(newTerm);

        singleAttribute.terms = [...singleAttribute.terms, termCreated];

        const singleAttributeUpdated = await singleAttribute.save();

        res.status(200).json({ msg: 'response', term: termCreated });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Update Attribute Term
    // @route   PUT /api/dashboard/products/attributes/attributeId/terms
    // @access  Private
    case 'PUT':
      try {
        const { name, slug, description, termID } = req.body;
        const attributeTerms = await Attribute.findById(attributeId).populate(
          'terms'
        );

        const termToUpdate = attributeTerms?.terms.find(
          (term) => term._id.valueOf() === termID
        );

        if (!termToUpdate) {
          throw new Error('Term NOT found');
        }

        termToUpdate.name = name;
        termToUpdate.slug = slug;
        termToUpdate.description = description;

        const updatedTerm = await termToUpdate.save();

        res.status(200).json({ msg: 'Term updated', updatedTerm });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Delete Attribute to the DB
    // @route   DELETE /api/dashboard/products/attributes
    // @access  Private
    case 'DELETE':
      try {
        const { termID } = req.body;
        const deletedTerm = await Term.findByIdAndDelete(termID);
        // console.log(deletedTerm);
        res.status(200).json({ msg: 'Term deleted', deletedTerm });
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
