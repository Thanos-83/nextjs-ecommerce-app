// import cloudinary from 'cloudinary/lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

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
        cloudinary.uploader
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
      break;
    case 'GET':
      try {
        const { nextCursor, activeFolder } = req.query;
        // console.log('Next Cursor: ', nextCursor);
        // console.log('Active Folder: ', activeFolder);
        const result = await cloudinary.search
          .expression(`folder=${activeFolder} AND resource_type:image`)
          .next_cursor(nextCursor)
          .max_results(40)
          .execute();
        // console.log('server result: ', result);
        res.status(200).json({
          msg: 'Disply All Images',
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ errorMsg: 'OOPS! Something went wrong!' });
  }
}
