import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {uploadPost} from "../api/index";

export const FormDialog = () => {
  
  interface formData {
    description?: string,
    tags?: string,
    imageURL: string
  }

  const [formData, setFormData] = useState<{} | formData>({})
  const [image, setImage] = useState<null | {file: File}>(null)
  console.log(image)

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null)
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if( e.currentTarget.files !== null){
        setImage({file: e.currentTarget.files[0]})
      }
  }

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} =  e.currentTarget
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      //Skapa new FormData
      uploadPost(formData)
      handleClose();
      //Hämta den nya posten och lägg till den i posterna i app.jsxs state.

  }


  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
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
          <input type="file" id="file" onChange={uploadImage}/>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleSubmit} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
