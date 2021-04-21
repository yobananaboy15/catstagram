import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

type ImageCropperProps = {
  imageStr: string;
  setCroppedAreaPixels: React.Dispatch<React.SetStateAction<Area>>;
};

export const ImageCropper = ({
  imageStr,
  setCroppedAreaPixels,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

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
