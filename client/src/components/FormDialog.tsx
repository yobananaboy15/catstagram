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
import { stringify } from "node:querystring";
import { Point } from "react-easy-crop/types";

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
  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imgCoordinates, setImgCoordinates] = useState<Point>({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

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

  //Takes the file and converts it to base64
  const readFile = (file: File) => {
    console.log(file);
    //Kolla om det här är en bild. Om inte, skicka tillbaka false
    return new Promise<String | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  //Returns promise that resolves with the px height and width of user selected img
  const getUploadedFileDimensions = (imgStr: string) => {
    return new Promise<ImageValue>((resolve) => {
      let img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = imgStr;
    });
  };

  //Sätt cropper x-y state här skapa skicka ner till imagecropper.
  //När man trycker på submit, trigga funktionen här som skapar bilden
  //

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
    // if (imageStr) {
    //   const uploadTask = storage.ref(`images/${imageFile.name}`).put(imageFile);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {},
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       storage
    //         .ref("images")
    //         .child(imageFile.name)
    //         .getDownloadURL()
    //         .then((url) => {
    //           console.log(url);
    //           uploadPost({ ...formData, imgURL: url });
    //           handleClose();
    //         });
    //     }
    //   );
    // }
  };

  //Om det finns en bild, rendera cropper
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
              cropCoordinates={imgCoordinates}
              onCropChange={setImgCoordinates}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
};
