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
  const user = useSelector( state => state.user );
  const projectList = useSelector(state => state.projects.projectList);

  const agree = (e) => {
    (() => {
      dispatch(deleteProject(projectFocusIndex));
      fetch('/api/project/delete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_id: user.profile.id,
          project_id: projectList[projectFocusIndex].project_id,
          project_name: projectList[projectFocusIndex].project_name,
        })
      })
        .then(res => console.log(res));
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
          {"CONFIRM"}
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