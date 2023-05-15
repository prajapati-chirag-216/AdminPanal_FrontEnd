import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const columns = [
  { id: "products", label: "Products", minWidth: 100 },
  { id: "images", label: "Images", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderAdress",
    label: "OrderAdress",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderAt",
    label: "OrderAt",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(products, images, status, orderAdress, orderAt) {
  return { products, images, status, orderAdress, orderAt };
}

const rows = [
  createData(
    "India",
    "IN",
    1324171354,
    3287263,
    new Date().toLocaleDateString()
  ),
  createData(
    "China",
    "CN",
    1403500365,
    9596961,
    new Date().toLocaleDateString()
  ),
  createData("Italy", "IT", 60483973, 301340, new Date().toLocaleDateString()),
  createData(
    "United States",
    "US",
    327167434,
    9833520,
    new Date().toLocaleDateString()
  ),
];

const OrdersTable = () => {
  const matches = useMediaQuery("(max-width:700px)");

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
        marginTop: "3rem",
        borderRight: "5px",
        boxShadow: "2px 2px 8px gray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "3rem auto",
      }}
    >
      <Typography align="center" variant={matches ? "h6" : "h4"} padding={2}>
        Today's Orders
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: "1.5rem" }}
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
                        <TableCell key={column.id} align={column.align}>
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

export default OrdersTable;
