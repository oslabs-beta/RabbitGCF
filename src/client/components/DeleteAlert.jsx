import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, focusProject } from '../slicers/projectsSlice';

export default function DeleteAlert({ projectFocusIndex, deleteAlertOpen, setDeleteAlertOpen }) {
  const dispatch = useDispatch();
  const projectList = useSelector(state => state.projects.projectList);

  const agree = (e) => {
    // console.log('agree to delete', projectIndex, projectList);
    // let newProjectList = projectList.slice();
    // console.log('before splice', newProjectList);
    // newProjectList = newProjectList.splice(projectIndex, 1);
    // console.log('spliced', newProjectList);
    // setProjectList(newProjectList);
    (() => {
      console.log('delete index',projectFocusIndex);
      dispatch(deleteProject(projectFocusIndex));
      dispatch(focusProject(null));
    })()

    setDeleteAlertOpen(false);
  }

  const disagree = () => {
    setDeleteAlertOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={deleteAlertOpen}
        onClose={disagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"WARNING"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Disagree</Button>
          <Button onClick={agree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}