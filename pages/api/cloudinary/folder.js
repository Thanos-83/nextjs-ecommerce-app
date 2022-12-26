// import cloudinary from 'cloudinary/lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function cloudinaryGetByFolder(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { nextCursor, activeFolder } = req.query;
        console.log('Next Cursor: ', nextCursor);
        console.log('Active Folder: ', activeFolder);
        const result = await cloudinary.search
          .expression(`folder=${activeFolder} AND resource_type:image`)
          .max_results(10)
          .next_cursor(nextCursor)
          .execute();
        // console.log(result);
        res.status(200).json({
          msg: 'Correct request...',
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
