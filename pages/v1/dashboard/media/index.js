import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../dashboard_components/DashboardLayout';
import Image from 'next/image';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import { Button } from '@mui/material';

function MediaLibrary({ data }) {
  const [images, setImages] = useState(data.images);
  const [nextCursor, setNextCursor] = useState(data.nextCursorDefault);
  const [disableLodeMore, setDisableLodeMore] = useState(false);
  const [activeFolder, setActiveFolder] = useState('samples/*');
  const handleLoadMore = (e) => {
    e.preventDefault();
    axios
      .get('/api/cloudinary', {
        params: { nextCursor: nextCursor, activeFolder },
      })
      .then((res) => {
        console.log(res);
        const newImages = res.data.data.resources?.map((resource) => {
          return {
            imageUrl: resource.secure_url,
            imageAssetId: resource.asset_id,
          };
        });
        setImages([...images, ...newImages]);
        // setImages((preImgs) => {
        //   return [...preImgs, ...newImages];
        // });
        console.log('Response In Load More: ', res.data.data.next_cursor);
        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        } else setDisableLodeMore(true);
      })
      .catch((error) => console.log(error));
  };

  const handleOnFolderClickAll = (event, folderPath) => {
    // console.log('Active Path: ', folderPath);
    setActiveFolder(folderPath);
    // setNextCursor(undefined);
    setImages([]);
    axios
      .get('/api/cloudinary', {
        params: { nextCursor: nextCursor, activeFolder: folderPath },
      })
      .then((res) => {
        console.log(res);
        const newImages = res.data.data.resources?.map((resource) => {
          return {
            imageUrl: resource.secure_url,
            imageAssetId: resource.asset_id,
          };
        });
        // setImages([...images, ...newImages]);
        setImages((preImgs) => {
          return [...preImgs, ...newImages];
        });
        console.log('Response On Click Folder: ', res.data.data.next_cursor);
        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        } else setDisableLodeMore(true);
      })
      .catch((error) => console.log(error));
  };

  const handleOnFolderClick = (event, folderPath) => {
    // const folderPath = event.target.dataset.folderPath;
    console.log('Active Path: ', folderPath);
    setActiveFolder(folderPath);
    // setDisableLodeMore(true);
    setNextCursor(undefined);
    setImages([]);

    axios
      .get('/api/cloudinary', {
        params: { nextCursor: nextCursor, activeFolder: folderPath },
      })
      .then((res) => {
        console.log(res);
        const newImages = res.data.data.resources?.map((resource) => {
          return {
            imageUrl: resource.secure_url,
            imageAssetId: resource.asset_id,
          };
        });
        // setImages([...images, ...newImages]);
        setImages((preImgs) => {
          return [...preImgs, ...newImages];
        });
        console.log('Response On Click Folder: ', res.data.data.next_cursor);
        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        } else setDisableLodeMore(true);
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   axios
  //     .get('/api/cloudinary', {
  //       params: { nextCursor: nextCursor, activeFolder },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       const newImages = res.data.data.resources?.map((resource) => {
  //         return {
  //           imageUrl: resource.secure_url,
  //           imageAssetId: resource.asset_id,
  //         };
  //       });
  //       setImages([...images, ...newImages]);
  //       // setImages((preImgs) => {
  //       //   return [...preImgs, ...newImages];
  //       // });
  //       console.log('Response On Click Folder: ', res.data.data.next_cursor);
  //       // if (res.data.data.next_cursor) {
  //       setNextCursor(res.data.data.next_cursor);
  //       // } else setDisableLodeMore(true);
  //     })
  //     .catch((error) => console.log(error));
  // }, [activeFolder]);

  console.log('Images: ', images);
  console.log('Next Cursor: ', nextCursor);
  // console.log('Image Folders: ', data.folders);
  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-xl font-semibold '>Media Library</h1>
      </div>
      <ul className='image_folders space-x-8 mb-4 flex items-center'>
        <li>
          <button
            onClick={(e) => handleOnFolderClickAll(e, 'samples/*')}
            data-folder-path='samples/*'>
            All Images
          </button>
        </li>
        {data.folders.map((folder) => (
          <li key={folder.path}>
            <button
              onClick={(e) => handleOnFolderClick(e, folder.path)}
              data-folder-path={folder.path}>
              {folder.name}
            </button>
          </li>
        ))}
      </ul>
      <div className='images_container mb-12'>
        {images.length === 0 ? (
          <h1>No Images...</h1>
        ) : (
          images.map((img) => (
            <div key={img.imageAssetId} className='border-2 relative'>
              <Image
                // key={img.imageAssetId}
                src={img.imageUrl ? img.imageUrl : ''}
                width={1000}
                height={1000}
                alt='image gallery'
                // layout='fill'
              />
            </div>
          ))
        )}
      </div>
      <div className='loadMore_btn flex justify-center'>
        {images.length > 0 && (
          <Button
            variant='outlined'
            disabled={disableLodeMore}
            type='button'
            onClick={handleLoadMore}>
            {!disableLodeMore ? 'Load More Images' : 'No More Images'}
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MediaLibrary;

export async function getServerSideProps() {
  //   const results = await axios.get(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image`,
  //     {
  //       headers: {
  //         Authorization: `Basic ${Buffer.from(
  //           process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY +
  //             ':' +
  //             process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  //         ).toString('base64')}`,
  //       },
  //     }
  //   );
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure: true,
  });

  const results = await cloudinary.search
    .expression('folder : samples/* AND resource_type:image')
    .max_results(10)
    .execute();

  // const { folders } = await cloudinary.api.root_folders();
  const { folders } = await cloudinary.api.sub_folders('samples');
  // console.log('Folders: ', folders);

  // console.log('Results: ', results);
  const images = results.resources.map((image) => {
    return {
      imageUrl: image.secure_url,
      imageAssetId: image.asset_id,
    };
  });

  return {
    props: {
      data: {
        images: images,
        nextCursorDefault: results.next_cursor ? results.next_cursor : null,
        folders: folders,
      },
    },
  };
}
