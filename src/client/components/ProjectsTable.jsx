import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "./DeleteAlert.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setProjectList } from "../slicers/projectsSlice.js";
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


const columns = [
  { id: "projectName", label: "Project", minWidth: 100 },
  { id: "projectId", label: "ID", minWidth: 100 },
  // { id: "connectionStatus", label: "Status", minWidth: 100 },
  { id: "settings", minWidth: 100 }
];

const projectId = "refined-engine-424416-p7";

export default function ProjectsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const user = useSelector( state => state.user);
  const projectList = useSelector((state) => state.projects.projectList);

  useEffect(() => {
    fetch('/api/project/listing', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: user.profile.id,
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setProjectList(res));
      });
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };  

  const editProject = (e) => {
    navigate("/projects/setup", { state: { project: projectList[e.target.value], projectListIndex: e.target.value }});
  }

  const deleteProject = (e) => {
    setDeleteIndex(e.target.value);
    setDeleteAlertOpen(true);
  }

  return (
    <div>
        <Paper sx={{ width: "95%", overflow: "hidden" }}>
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
              {projectList && <TableBody>
                {projectList
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((project, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={project}>
                        <TableCell>{project.project_name}</TableCell>
                        <TableCell>{project.project_id}</TableCell>
                        <TableCell>
                          <Box>
                            <Button sx={{marginRight: 2}}
                              variant="outlined"
                              value={index}
                              onClick={editProject}
                            >
                            Edit
                            </Button>
                            <Button 
                              // startIcon={<DeleteOutlineIcon/>} 
                              value={index}
                              onClick={deleteProject}
                            >Delete</Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>}
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
        {(deleteAlertOpen && deleteIndex !== null) && <DeleteAlert projectFocusIndex={deleteIndex} deleteAlertOpen={deleteAlertOpen} setDeleteAlertOpen={setDeleteAlertOpen}/>}
    </div>
  );
}
