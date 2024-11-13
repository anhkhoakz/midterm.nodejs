import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Upload } from '@phosphor-icons/react/dist/ssr/Upload';

interface UploadImagesProps {
  isMultiple: boolean;
  setImgs: (images: File[]) => void;
  isDisabled: boolean;
}

const UploadImages: React.FC<UploadImagesProps> = ({ isMultiple = false, setImgs, isDisabled }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages = isMultiple ? [...selectedImages, ...fileArray].slice(0, 3) : fileArray.slice(0, 1);
      setSelectedImages(newImages);
      setImgs(newImages);
    }
  };

  return (
    <div>
      <Button variant="contained" component="label" startIcon={<Upload />}>
        Upload images
        <input
          type="file"
          hidden
          accept="image/*"
          multiple={isMultiple}
          onChange={handleImageChange}
          disabled={isDisabled}
        />
      </Button>
      <ImageList cols={3}>
        {selectedImages.map((image, index) => {
          const imageUrl = URL.createObjectURL(image);
          return (
            <ImageListItem key={index} style={{ paddingBottom: '133.33%' }}>
              <img
                srcSet={imageUrl}
                src={imageUrl}
                alt={`uploaded ${index}`}
                loading="lazy"
                style={{ width: '50%', height: '50%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};

export default UploadImages;
