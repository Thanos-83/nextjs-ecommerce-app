import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../dashboard_components/DashboardLayout';
import DashboardBreadcrumb from '../../../../dashboard_components/DashboardBreadcrumb';
import MediaSingleImage from '../../../../dashboard_components/media library/MediaSingleImage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import { Button, Dialog, Divider, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeselectIcon from '@mui/icons-material/Deselect';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import ImageIcon from '@mui/icons-material/Image';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Checkbox from '@mui/material/Checkbox';
import { Delete } from '@mui/icons-material';

function MediaLibrary({ data }) {
  const route = useRouter();
  const [images, setImages] = useState(data.images);
  const [nextCursor, setNextCursor] = useState(data.nextCursorDefault);
  const [activeFolder, setActiveFolder] = useState('next_demo_ecommerce/*');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState([]);
  const [totalImages, setTotalImages] = useState(data.totalImages);
  const [showAllButton, setShowAllButton] = useState(false);

  const handleCheckbox = (id) => {
    // alert(id);
    // alert(e.target.setIsImageSelected);
    // setIsImageSelected(e.target.setIsImageSelected);
    if (isImageSelected.includes(id)) {
      const newSelectedImages = isImageSelected.filter(
        (imageId) => imageId !== id
      );
      // console.log(newSelectedImages);
      setIsImageSelected(newSelectedImages);
      return;
    }
    setIsImageSelected([...isImageSelected, id]);
  };

  const clearSelect = () => {
    setIsImageSelected([]);
  };

  const handleSelectAll = () => {
    const imageIDs = images.map((img) => {
      return img.imageAssetId;
    });

    setIsImageSelected(imageIDs);
  };

  const handleDeleteImage = (assetID) => {
    alert(assetID);
  };

  const handleDeleteSelectedImages = () => {
    console.log(isImageSelected);
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(nextCursor);
    // console.log(activeFolder);
    axios
      .get('/api/cloudinary', {
        params: { nextCursor: nextCursor, activeFolder: activeFolder },
      })
      .then((res) => {
        console.log(res);
        const newImages = res.data.data.resources?.map((resource) => {
          return {
            imageUrl: resource.secure_url,
            imageAssetId: resource.asset_id,
            format: resource.format,
            uploadedAt: resource.uploaded_at,
            filename: resource.filename,
            imageFolder: resource.folder,
            size: resource.bytes,
          };
        });
        setImages([...images, ...newImages]);

        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleShowAll = () => {};

  const handleUploadImage = () => {
    alert('clicked');
  };

  // console.log('Images: ', images);
  // console.log('Next Cursor: ', nextCursor);
  // console.log('Active Folder: ', activeFolder);
  // console.log('Image Folders: ', data.folders);
  return (
    <DashboardLayout>
      <DashboardBreadcrumb path={route.pathname} />
      <div className='media_headerContainer mb-8'>
        <div className='media_headerTop'>
          <h1 className='media_title '>Media Library</h1>
          <Button variant='contained' onClick={() => handleUploadImage()}>
            <CloudUploadIcon className='mr-3' /> Upload
          </Button>
        </div>
        <div className='media_header'>
          <div className='media_headerLeft'>
            <p className='text-gray-600 font-semibold'>
              Images ({totalImages})
            </p>
            {showAllButton && (
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleShowAll()}>
                Show All
              </Button>
            )}
            {isImageSelected.length > 0 && (
              <Button
                type='button'
                variant='outlined'
                onClick={handleDeleteSelectedImages}>
                {isImageSelected.length} Selected
                <Tooltip describeChild arrow title='Delete Selected Images'>
                  <Delete className='flex ml-2' />
                </Tooltip>
              </Button>
            )}
          </div>
          <div className='media_headerRight'>
            <p>
              <button type='button' onClick={clearSelect}>
                <Tooltip describeChild arrow title='Deselect All Images'>
                  <DeselectIcon />
                </Tooltip>
              </button>
            </p>
            <p>
              <button type='button' onClick={handleSelectAll}>
                <Tooltip describeChild arrow title='Select All Images'>
                  <SelectAllIcon />
                </Tooltip>
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className='images_container mb-12'>
        {images.length === 0 ? (
          <h1>No Images...</h1>
        ) : (
          images.map((img) => (
            <MediaSingleImage
              key={img.imageAssetId}
              imageData={img}
              isImageSelected={isImageSelected}
              handleCheckbox={handleCheckbox}
              handleDeleteImage={handleDeleteImage}
            />
          ))
        )}
      </div>
      <div className='loadMore_btn flex justify-center'>
        {images.length > 0 && (
          <>
            <p>
              {images.length} available out of {totalImages} products
            </p>
            <LoadingButton
              variant='outlined'
              disabled={totalImages === images.length}
              loading={isLoading}
              loadingPosition='end'
              endIcon={<FileDownloadIcon />}
              onClick={handleLoadMore}>
              {totalImages === images.length
                ? 'No More Images'
                : 'Load More Images'}
            </LoadingButton>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MediaLibrary;

export async function getServerSideProps() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure: true,
  });

  const result = await cloudinary.search
    .expression('folder : next_demo_ecommerce/* AND resource_type:image')
    .max_results(10)
    .execute();

  // const { folders } = await cloudinary.api.root_folders();
  const { folders } = await cloudinary.api.sub_folders('next_demo_ecommerce/');

  console.log('Folders: ', folders);
  console.log('Results: ', result.total_count);
  const images = result.resources.map((image) => {
    return {
      imageUrl: image.secure_url,
      imageAssetId: image.asset_id,
      format: image.format,
      uploadedAt: image.uploaded_at,
      filename: image.filename,
      imageFolder: image.folder,
      size: image.bytes,
    };
  });

  return {
    props: {
      data: {
        images: images,
        nextCursorDefault: result.next_cursor ? result.next_cursor : null,
        totalImages: result.total_count,
        folders: folders,
      },
    },
  };
}
