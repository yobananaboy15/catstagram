import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uploadPost } from "../api/index";
import { storage } from "../firebase/index";
import { ImageCropper } from "./ImageCropper";
import useStyles from "./styles";
import { Area } from "react-easy-crop/types";
import { v4 as uuidv4 } from "uuid";

export const FormDialog = () => {
  const classes = useStyles();

  interface formData {
    description?: string;
    tags?: string;
    imageURL: string;
  }

  interface ImageValue {
    width: number;
    height: number;
  }

  const [formData, setFormData] = useState<{} | formData>({});
  const [imageStr, setImageStr] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  // const [imageFile, setImageFile] = useState<null | Blob>(null);
  const [open, setOpen] = useState(false);

  //Uppdatera state?
  //On change, takes the new img file and converts it to base64 and checks if it's big enough
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const base64image = await readFile(e.currentTarget.files[0]);

      if (typeof base64image === "string") {
        const { width, height } = await getUploadedFileDimensions(base64image);
        if (width > 599 && height > 599) {
          console.log("bilden är tillräckligt stor");
          setImageStr(base64image);
        } else {
          //Skicka felmeddelande
          console.log("Bilden är för liten");
        }
      }
    }
  };

  //Takes the user uploaded file and converts it to base64
  const readFile = (file: File) => {
    return new Promise<String | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  //Returns promise that resolves with the px height and width of user selected img. Den här funktionen kan använda sig av create image.
  const getUploadedFileDimensions = (imgStr: string) => {
    return new Promise<ImageValue>((resolve) => {
      let img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = imgStr;
    });
  };

  const createImage = (url: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", () => reject(Error));
      image.src = url;
    });
  };

  const getCroppedImage = async (imgStr: string, crop: Area) => {
    const image = await createImage(imgStr);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    ctx?.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  //Functions for handling the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageStr("");
  };

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({ ...formData, [id]: value });
  };

  //Sends picture to firebase on submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (true) {
      const imageData = await getCroppedImage(imageStr, croppedAreaPixels);
      if (imageData !== null) {
        storage
          .ref("images")
          .child(uuidv4())
          .put(imageData)
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            //Här kommer posten tillbaka, uppdatera context.
            uploadPost({ ...formData, imgURL: url });
            handleClose();
          });
      }
    }
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload picture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            onChange={changeFormData}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tags"
            label="tags"
            type="text"
            fullWidth
            onChange={changeFormData}
          />
          <label htmlFor="file">Select file</label>
          <input type="file" id="file" onChange={uploadImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Upload
          </Button>
        </DialogActions>
        <div className={classes.cropperContainer}>
          {imageStr && (
            <ImageCropper
              imageStr={imageStr}
              setCroppedAreaPixels={setCroppedAreaPixels}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};
