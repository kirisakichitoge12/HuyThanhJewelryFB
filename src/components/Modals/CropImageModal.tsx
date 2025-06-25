import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from './Modal';
import { FaCheck } from 'react-icons/fa6';
import useCropImageModal from '../../hooks/modals/useCropImageModal';

const ASPECT_RATIOS = [
  { label: '1:1', value: 1 },
  { label: '2:3', value: 2 / 3 },
  { label: '5:4', value: 5 / 4 },
];

interface ImageCropModalProps {
  onCropComplete?: (croppedImageUrl: string) => void;
}

function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Invalid dataURL');
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const ImageCropModal: React.FC<ImageCropModalProps> = () => {
  const { isOpen, onClose, image, onSaveCropImage } = useCropImageModal();
  const [imgSrc, setImgSrc] = useState<string>('');
  const cropperRef = useRef<ReactCropperElement>(null);
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result?.toString() || '');
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleRatioChange = useCallback((ratio: string) => {
    setSelectedRatio(ratio);
    const aspectValue = ASPECT_RATIOS.find((ar) => ar.label === ratio)?.value || 1;
    cropperRef.current?.cropper.setAspectRatio(aspectValue);
  }, []);

  const handleReset = useCallback(() => {
    cropperRef.current?.cropper.reset();
  }, []);

  const getCroppedImage = useCallback(async () => {
    if (!cropperRef.current) return;
    setIsProcessing(true);

    try {
      const cropper = cropperRef.current.cropper;
      const canvas = cropper.getCroppedCanvas({
        fillColor: '#fff',
      });
      if (!canvas) throw new Error('Could not get canvas');

      const croppedImageUrl = canvas.toDataURL('image/webp', 0.8);
      const croppedImageFile = dataURLtoFile(croppedImageUrl, 'cropped_image.webp');

      onSaveCropImage(croppedImageFile);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onSaveCropImage, onClose]);

  const aspectRatioButtons = useMemo(() => (
    ASPECT_RATIOS.map(({ label }) => (
      <button
        key={label}
        onClick={() => handleRatioChange(label)}
        className={`px-4 py-2 rounded-lg border ${
          selectedRatio === label
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        {label}
      </button>
    ))
  ), [handleRatioChange, selectedRatio]);

  if (!isOpen) return null;

  return (
    <Modal title="Crop Image" isOpen={isOpen} size="max-w-lg" onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4">
          <div className="max-h-[80vh] w-full overflow-hidden mb-4">
            {imgSrc && (
              <Cropper
                src={imgSrc}
                dragMode="crop"
                zoomable={true}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                viewMode={1}
                background={false}
                autoCropArea={1}
                guides={true}
                style={{ width: '100%', height: 400 }}
                ref={cropperRef}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {aspectRatioButtons}
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {/* <FaRotateLeft size={20} /> */}
            {/* Reset */}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={getCroppedImage}
              disabled={isProcessing || !imgSrc}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isProcessing || !imgSrc
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <FaCheck size={20} />
              {isProcessing ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropModal;