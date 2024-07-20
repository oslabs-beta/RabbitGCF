import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "function", label: "Function", minWidth: 170 },
  { id: "metrics", label: "Metrics", minWidth: 100 },
  { id: "forcast", label: "Forcast", minWidth: 100 },
];

let rows = [];

export default function FunctionTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMetricClick = (e) => {
    props.setFunctionName(e.target.value);
    navigate("/metrics");
  };

  const handleForcastClick = (e) => {
    props.setFunctionName(e.target.value);
    navigate("/forcast");
  };

  const projectId = "refined-engine-424416-p7";

  const getFunctionList = async () => {
    try {
      const response = await fetch(
        `/api/metrics/funcs/${projectId}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
      rows = data;
      setLoaded(true);
    } catch (error) {
      console.log("Error in getFunctionList: ", error);
    }
  };

  useEffect(() => {
    getFunctionList();
  }, []);

  return (
    <div>
      {loaded ? (
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                        <TableCell>{row}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            value={row}
                            onClick={handleMetricClick}
                          >
                            {row} Metrics
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            value={row}
                            onClick={handleForcastClick}
                          >
                            {row} Forcast
                          </Button>
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"95%"}
          height={400}
          style={{ margin: "auto" }}
        />
      )}
    </div>
  );
}
