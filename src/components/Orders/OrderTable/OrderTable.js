import * as React from "react";
import { useState, useEffect, memo, Fragment } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../Dekstop/Modal/Modal";
import { Container, IconButton } from "@mui/material";
import { uiActions } from "../../../store/ui-slice";
import { orderActions } from "../../../store/order-slice";
import { fetchOrders } from "../../../utils/api";
import UpdateOrderForm from "../OrderForm/updateOrder-Form";
import { deleteOrder } from "../../../utils/api";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";

const columns = [
  { id: "products", label: "products", minWidth: 80 },
  {
    id: "Bill",
    label: "Bill",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "TransactionId",
    label: "TransactionId",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "deliveryStatus",
    label: "deliveryStatus",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Customer",
    label: "Customer",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
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
    id: "Address",
    label: "Address",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "createdAt",
    minWidth: 80,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "updatedAt",
    label: "updatedAt",
    minWidth: 80,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 80,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Update",
    label: "Update",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const OrderTable = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state.order.orders);

  // if(orderData.length !== 0){
  //     console.log(orderData[1].orderedItems[0])
  // }

  const fetchOrderData = useSelector((state) => state.order.fetchOrderData);
  const showModel = useSelector((state) => state.ui.updateModelState);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
       orderData.length !== 0 ?orderData.map((order) =>
       {
        console.log(order,'ou')
      return( ({
        
        _id: order._id,
        products: order.orderedItems
          .map((item) => item.productId.name + "- x" + item.quntity)
          .join(" , "),
        Bill: order.totalPrice + "$",
        TransactionId: order._id,
        deliveryStatus: order.deliveryStatus,
        Customer: order.shippingAddress.userName,
        Email: order.contactInformation.email,
        Phone: order.contactInformation.phoneNumber,
        Address: order.shippingAddress.address,
        createdAt: new Date(order.createdAt).toLocaleString(),
        updatedAt: new Date(order.updatedAt).toLocaleString(),
      }))
    }
      ):null
    );
  }, [orderData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const Data = await fetchOrders();
        dispatch(orderActions.setOrders(Data));
      } catch (err) {
        console.error(err);
      }
    };
    try {
      if (!fetchOrderData.status || fetchOrderData.activity === "Fetching..") {
        fetch()
          .then((res) =>
            dispatch(
              orderActions.setFetchOrderData({
                status: false,
                activity: "None",
              })
            )
          )
          .catch((err) => err);
      }
    } catch (err) {
      throw err;
    }
  }, [fetchOrderData]);

  const handleDeleteChange = async (id) => {
    if (!id) return;
    dispatch(
      orderActions.setFetchOrderData({
        status: true,
        activity: "Deleting..",
      })
    );
    try {
      await deleteOrder(id);
      dispatch(
        orderActions.setFetchOrderData({
          status: false,
          activity: "Deleting..",
        })
      );
    } catch (err) {
      dispatch(
        orderActions.setFetchOrderData({
          status: false,
          activity: "Deleting..",
        })
      );
      throw err;
    }
  };

  const handleUpdateChange = (id) => {
    dispatch(orderActions.setUpdateOrderId(id));
    dispatch(uiActions.setUpdateModelState(true));
  };

  const closeModelHandler = () => {
    dispatch(uiActions.setUpdateModelState(false));
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Text_Color = {
    deliveryStatus: {
      Pending: "red",
      Shipped: "gray",
      "Out For Delivery": "green",
    },

    TransactionId: "blue",
  };

  const font_weight = {
    deliveryStatus: "600",
  };

  if (!rows)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <LoadingSpinner />
      </Container>
    );
  return (
    <Fragment>
      {showModel && (
        <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
          <UpdateOrderForm action="update" />
        </SimpleModal>
      )}
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: "1%",
          boxShadow: "0px 0px 8px rgb(200,200,200)",
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
                    sx={{
                      minWidth: column.minWidth,
                      fontSize: "1.1rem",
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "Delete") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                onClick={handleDeleteChange.bind(null, row._id)}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          );
                        } else if (column.id === "Update") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                onClick={handleUpdateChange.bind(null, row._id)}
                              >
                                <BorderColorIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            sx={{
                              color:
                                column.id === "deliveryStatus"
                                  ? Text_Color[column.id][value]
                                  : Text_Color[column.id],
                              fontSize: "1rem",
                            }}
                            key={column.id}
                            align={column.align}
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
    </Fragment>
  );
};

export default memo(OrderTable);
