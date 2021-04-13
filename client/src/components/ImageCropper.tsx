import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

type ImageCropperProps = {
  imageStr: string;
};

export const ImageCropper = ({ imageStr }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <Cropper
      image={imageStr}
      crop={crop}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      style={{ cropAreaStyle: { color: "red" } }}
    />
  );
};
