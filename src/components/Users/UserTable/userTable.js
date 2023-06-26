import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getUsers } from "../../../utils/api";

const columns = [
  { id: "UserId", label: "UserId", minWidth: 80 },
  {
    id: "Email",
    label: "Email",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Joining Date",
    label: "Joining Date",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const UserTable = () => {
  const [userObj, setuserObj] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const run = async () => {
      const data = await getUsers();
      setuserObj(data);
    };

    run();
  }, []);

  useEffect(() => {
    setRows(
      userObj
        ? userObj.map((user) => ({
            UserId: user._id,
            Email: user.email,
            Phone: user.phoneNo,
            "Joining Date": new Date(user.createdAt).toLocaleString(),
          }))
        : []
    );
  }, [userObj]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRight: "5px",
        boxShadow: "0px 0px 8px rgb(200,200,200)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "2rem auto",
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "1.2rem",
                    textTransform: "capitalize",
                    padding: "1.5rem 1rem",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ fontSize: "1rem" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
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
  );
};

export default UserTable;
