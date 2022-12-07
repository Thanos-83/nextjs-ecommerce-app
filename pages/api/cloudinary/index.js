import cloudinary from 'cloudinary/lib/cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function cloudinaryActions(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { public_id } = req.body;
        console.log(public_id);
        cloudinary.v2.uploader
          .destroy(public_id)
          .then((resp) => res.status(200).json({ msg: 'Image deleted', resp }))
          .catch((err) =>
            res.status(400).json({
              msg: 'Something went wrong, please try again later',
              error: err,
            })
          );
      } catch (error) {
        res.status(400).json({ error });
      }
  }
}
