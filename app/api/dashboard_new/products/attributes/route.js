import { NextResponse } from 'next/server';
import connectdb from '../../../../../database/connectDB';
import Attributes from '../../../../../models/attributes';
import Terms from '../../../../../models/terms';

// @desc    Fetch All attributes from the DB
// @route   GET /api/dashboard/products/attributes
// @access  Private
export async function GET() {
  connectdb();

  try {
    const attributes = await Attributes.find().populate({
      path: 'terms',
      select: 'slug',
      model: Terms,
    });

    if (attributes.length === 0) {
      throw new Error('There are NO Attributess');
    }
    return NextResponse.json({ attributes });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}
// @desc    Add Attributes to the DB
// @route   POST /api/dashboard/products/attributes
// @access  Private
export async function POST(req) {
  connectdb();

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
    return NextResponse.json({ msg: 'response', attribute: attributeCreated });
  } catch (error) {
    console.log('iam here...');
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Update Attributes
// @route   PUT /api/dashboard/products/attributes
// @access  Private
export async function PUT(req) {
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

    return NextResponse.json({ msg: 'Attribute updated', updatedAttribute });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Delete Attribute from the DB
// @route   DELETE /api/dashboard/products/attributes
// @access  Private
export async function DELETE(req) {
  try {
    // console.log(req.body.attributeID);
    const attributeToDelete = await Attributes.findByIdAndDelete(
      req.body.attributeID
    );
    // console.log(attributeToDelete);

    return NextResponse.json({ msg: 'Attribute deleted', attributeToDelete });
  } catch (error) {
    return NextResponseus(401).json({
      msg: 'Error deleting user',
      errorMsg: error.message,
    });
  }
}
