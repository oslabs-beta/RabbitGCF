import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "./DeleteAlert.jsx";
import { useSelector, useDispatch } from "react-redux";
import { focusProject } from "../slicers/projectsSlice.js";
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Button, 
  Skeleton, 
  IconButton } from "@mui/material"
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const columns = [
  { id: "projectName", label: "Project", minWidth: 170 },
  { id: "projectId", label: "ID", minWidth: 100 },
  { id: "settings", minWidth: 100 }
];

const projectId = "refined-engine-424416-p7";

export default function ProjectsTable({ /**projectList, setProjectList,*/ selectedProject, setSelectedProject }) {
  const dispatch = useDispatch();
  const projectFocusIndex = useSelector((state) => state.projects.projectFocusIndex)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  // let projectFocusIndex = null;

  const navigate = useNavigate();
  const projectList = useSelector((state) => state.projects.projectList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };  

  const editProject = (e) => {
    console.log('edit project clicked');
    console.log('edit button value', e.target.value);
    setSelectedProject(e.target.value);
    navigate("/projects/setup");
  }

  const deleteProject = (e) => {
    console.log('delete project clicked', e.target.value);
    (() => {
      dispatch(focusProject(e.target.value))
    })();
    // projectFocusIndex = e.target.value;
    // console.log('projetFocusIndex==>', projectFocusIndex)
    // setSelectedProject(e.target.value);
    setDeleteAlertOpen(true);
  }

  console.log(projectList);
  return (
    <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projectList
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((project, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={project}>
                        <TableCell>{project.projectName}</TableCell>
                        <TableCell>{project.projectId}</TableCell>
                        <TableCell>
                          <Box>
                            <Button sx={{marginRight: 2}}
                              variant="outlined"
                              value={index}
                              onClick={editProject}
                            >
                            Edit
                            </Button>
                            {/* <IconButton aria-label="delete" value={index} onClick={deleteProject}>
                              <DeleteOutlineIcon />
                            </IconButton> */}
                            <Button 
                              startIcon={<DeleteOutlineIcon/>} 
                              value={index}
                              onClick={deleteProject}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Object.keys(projectList).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {(deleteAlertOpen && projectFocusIndex !== null) && <DeleteAlert projectFocusIndex={projectFocusIndex} deleteAlertOpen={deleteAlertOpen} setDeleteAlertOpen={setDeleteAlertOpen}/>}
    </div>
  );
}
