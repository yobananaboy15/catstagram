import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export const ImageCropper = (image: string) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <div>
      <Cropper
        image={image}
        crop={crop}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
      />
    </div>
  );
};
