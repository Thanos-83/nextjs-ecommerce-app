import mongoose from 'mongoose';

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: false,
  },
});

const Tags = mongoose.models.Tags || mongoose.model('Tags', tagsSchema);

export default Tags;
