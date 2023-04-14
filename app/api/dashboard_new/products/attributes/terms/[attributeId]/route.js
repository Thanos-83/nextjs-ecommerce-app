import { NextResponse } from 'next/server';
import connectdb from '../../../../../../../database/connectDB';
import Term from '../../../../../../../models/terms';
import Attribute from '../../../../../../../models/attributes';

// @desc    Fetch terms from single Attribute
// @route   GET /api/dashboard/products/terms/[attributeId]
// @access  Private
export async function GET(req) {
  connectdb();

  const attributeId = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    // const terms = await Term.find({});
    const attribute = await Attribute.findById(attributeId).populate('terms');
    // console.log('Attribute Terms: ', attribute);
    if (attribute.terms.length === 0) {
      throw new Error('There are NO Terms');
    }
    return NextResponse.json({ terms: attribute.terms });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Add Attribute Term
// @route   POST /api/dashboard/products/attributes/terms/[attributeId]
// @access  Private
export async function POST(req) {
  connectdb();
  const attributeId = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    const { name, slug, description } = await req.json();

    const singleAttribute = await Attribute.findById(attributeId).populate({
      path: 'terms',
    });

    const termNotUnique = singleAttribute.terms.find(
      (term) => term.name === name
    );

    if (termNotUnique) {
      throw new Error('Term Exists!');
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

    return NextResponse.json({ msg: 'response', term: termCreated });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Update Attribute Term
// @route   PUT /api/dashboard/products/attributes/terms/[attributeId]
// @access  Private
export async function PUT(req) {
  connectdb();
  const attributeId = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    const { name, slug, description, termID } = await req.json();
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

    return NextResponse.json({ msg: 'Term updated', updatedTerm });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Delete term from the DB
// @route   DELETE /api/dashboard/products/attributes/terms/[attributeId]
// @access  Private
export async function DELETE(req) {
  connectdb();

  try {
    const { termID } = req.body;
    const deletedTerm = await Term.findByIdAndDelete(termID);
    // console.log(deletedTerm);
    return NextResponse.json({ msg: 'Term deleted', deletedTerm });
  } catch (error) {
    return NextResponse.json({
      msg: 'Error deleting user',
      errorMsg: error.message,
    });
  }
}
