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

export const FormDialog = () => {
  interface formData {
    description?: string;
    tags?: string;
    imageURL: string;
  }

  interface ImageValue {
    width: number;
    height: number;
  }

  //Tar filen och omvandlar till base64
  const readFile = (file: File) => {
    return new Promise<String | null | ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const [formData, setFormData] = useState<{} | formData>({});
  const [image, setImage] = useState<null | File>(null);

  const [open, setOpen] = useState<boolean>(false);

  const getUploadedFileDimensions = (imgStr: string) => {
    let img = new Image();
    img.src = imgStr;

    const width = img.naturalWidth;
    const height = img.naturalHeight;
    return { width, height };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const base64image = await readFile(e.currentTarget.files[0]);
      if (typeof base64image === "string") {
        getUploadedFileDimensions(base64image);
      }
    }
  };

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({ ...formData, [id]: value });
  };

  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

  //   if (image !== null) {
  //     const imageData = await getUploadedFileDimensions(image);
  //     if (imageData.width > 599 && imageData.height > 599) {
  //       const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //       uploadTask.on(
  //         "state_changed",
  //         snapshot => { },
  //         error => {
  //           console.log(error)
  //         },
  //         () => {
  //           storage
  //             .ref('images')
  //             .child(image.name)
  //             .getDownloadURL()
  //             .then(url => {
  //               console.log(url)
  //               uploadPost({ ...formData, imgURL: url })
  //               handleClose();
  //             })
  //         }
  //       )
  //     } else {
  //       console.log('Image too small')
  //     }

  //   }
  // }

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
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
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
      </Dialog>
    </div>
  );
};
