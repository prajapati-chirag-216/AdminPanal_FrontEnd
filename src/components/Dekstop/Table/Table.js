import * as React from "react";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTodaysOrders } from "../../../utils/api";

const columns = [
  { id: "products", label: "products", minWidth: 80 },
  {
    id: "Bill",
    label: "Bill",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "TransactionId",
    label: "TransactionId",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "deliveryStatus",
    label: "deliveryStatus",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Customer",
    label: "Customer",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Address",
    label: "Address",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "createdAt",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const OrdersTable = () => {
  const matches = useMediaQuery("(max-width:700px)");
  const [todayOrderObj, setTodayOrderObj] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const run = async () => {
      const data = await getTodaysOrders();

      setTodayOrderObj(data);
    };

    run();

    console.log(todayOrderObj);
  }, []);

  console.log(todayOrderObj);

  useEffect(() => {
    setRows(
      todayOrderObj
        ? todayOrderObj.map((order) => ({
            _id: order._id,
            products: order.orderedItems
              .map((item) => item.name + "- x" + item.quntity)
              .join(" , "),
            Bill: order.totalPrice,
            TransactionId: order._id,
            deliveryStatus: order.deliveryStatus,
            Customer: order.shippingAddress.userName,
            Email: order.contactInformation.email,
            Phone: order.contactInformation.phoneNumber,
            Address: order.shippingAddress.address,
            createdAt: new Date(order.createdAt).toLocaleString(),
          }))
        : []
    );
  }, [todayOrderObj]);

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
        boxShadow: "2px 2px 8px gray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "2rem auto",
      }}
    >
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: !matches ? "1.8rem" : "1.5rem",
          letterSpacing: "1px",
          width: "fit-content",
          alignSelf: "center",
          padding: "1rem 0 0.2rem 0",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
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
                  sx={{
                    minWidth: column.minWidth,
                    fontSize: "1.17rem",
                    textTransform: "capitalize",
                    padding: "1.5rem 1rem",
                    letterSpacing: "0.5px",
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

export default OrdersTable;
