import React from 'react';
import { Checkbox, Divider, Tooltip } from '@mui/material';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageIcon from '@mui/icons-material/Image';
import FolderIcon from '@mui/icons-material/Folder';

const label = { inputProps: { 'aria-label': 'single image checkbox' } };

function MediaSingleImage({
  imageData,
  isImageSelected,
  handleCheckbox,
  handleDeleteImage,
}) {
  const handleGetByFolder = (folder) => {
    alert('folder link clecked...');
  };

  return (
    <div key={imageData.imageAssetId} className='singleImage_container'>
      <div className='singleImage_image'>
        <Image
          src={imageData.imageUrl ? imageData.imageUrl : ''}
          width={400}
          height={400}
          alt={imageData.filename}
          // layout='fill'
        />
      </div>
      <div className='singleImage_infoContainer'>
        <div className='singleImage_folder'>
          <span>
            <FolderIcon />
          </span>
          <p>
            <button
              type='button'
              onClick={() => handleGetByFolder(imageData.imageFolder)}>
              {imageData.imageFolder?.split('/').slice(-1)}
            </button>
          </p>
        </div>

        <Divider />
        <div className='singleImage_info'>
          <div className='singleImage_size'>
            <span>
              {(imageData.size / 1000).toFixed(2)} <span>kB</span>
            </span>
            <Divider orientation='vertical' />
            <p>
              <ImageIcon /> {imageData.format}
            </p>
          </div>
          <div className='singleImage_actions'>
            <button
              type='button'
              onClick={() => handleDeleteImage(imageData.imageAssetId)}>
              <Tooltip describeChild arrow title='delete'>
                <DeleteForeverIcon />
              </Tooltip>
            </button>
            <a href={imageData.imageUrl} target='_blank' rel='noreferrer'>
              <Tooltip describeChild arrow title='open image'>
                <OpenInNewIcon />
              </Tooltip>
            </a>
            <div className='singleImage_checkbox'>
              <Checkbox
                {...label}
                checked={isImageSelected.includes(imageData.imageAssetId)}
                color='success'
                onChange={() => handleCheckbox(imageData.imageAssetId)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaSingleImage;
