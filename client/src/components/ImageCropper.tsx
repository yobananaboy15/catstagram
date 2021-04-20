import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point } from "react-easy-crop/types";

type ImageCropperProps = {
  imageStr: string;
  cropCoordinates: Point;
  onCropChange: React.Dispatch<React.SetStateAction<Point>>;
};

export const ImageCropper = ({
  imageStr,
  cropCoordinates,
  onCropChange,
}: ImageCropperProps) => {
  return (
    <Cropper
      image={imageStr}
      crop={cropCoordinates}
      aspect={1}
      onCropChange={onCropChange}
      style={{ cropAreaStyle: { color: "red" } }}
    />
  );
};
