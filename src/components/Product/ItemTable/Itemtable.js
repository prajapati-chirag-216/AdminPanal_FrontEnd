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
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../Dekstop/Modal/Modal";
import AddProductForm from "../Form/AddProductForm";
import { deleteProduct, getProducts } from "../../../utils/api";
import { Container, IconButton } from "@mui/material";
import { productActions } from "../../../store/product-slice";
import { uiActions } from "../../../store/ui-slice";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";

const columns = [
  { id: "name", label: "Name", minWidth: 80 },
  { id: "description", label: "description", minWidth: 250, maxWidth: 300 },
  {
    id: "icon",
    label: "icon",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "category",
    label: "category",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "status",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "price",
    minWidth: 80,
    align: "left",
    format: (value) => value.toFixed(2),
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
    id:'Reviews',
    label: "Reviews",
    minWidth:80,
    align:'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 80,
    align: "left",
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

const ItemTable = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);

  const fetchProductData = useSelector(
    (state) => state.product.fetchProductData
  );
  const showModel = useSelector((state) => state.ui.updateModelState);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      productData?.map((product) => ({
        name: product.name,
        description: product.description.split(".")[0] + "..",
        icon: (
          <img
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
            src={product.image[0]}
            alt="loading.."
          />
        ),
        category: product.category.name,
        status: product.status,
        price: product.price,
        createdAt: new Date(product.createdAt).toLocaleString(),
        updatedAt: new Date(product.updatedAt).toLocaleString(),
        _id: product._id,
      }))
    );
  }, [productData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProducts();
        dispatch(productActions.setProducts(data));
      } catch (err) {
        console.error(err);
      }
    };
    try {
      if (
        !fetchProductData.status ||
        fetchProductData.activity === "Fetching.."
      ) {
        fetch()
          .then((res) =>
            dispatch(
              productActions.setFetchProductData({
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
  }, [fetchProductData]);

  const handleReviewsChange = async(id,name) =>{
    if (!id) return;
    
    console.log(name,'ef')
      dispatch(uiActions.setProductName(name))
      window.open(`/admin/reviews/${id}`)
       
  }

  const handleDeleteChange = async (id) => {
    if (!id) return;
    dispatch(
      productActions.setFetchProductData({
        status: true,
        activity: "Deleting..",
      })
    );
    try {
      await deleteProduct(id);
      dispatch(
        productActions.setFetchProductData({
          status: false,
          activity: "Deleting..",
        })
      );
    } catch (err) {
      dispatch(
        productActions.setFetchProductData({
          status: false,
          activity: "Deleting..",
        })
      );
      throw err;
    }
  };

  const handleUpdateChange = (id) => {
    dispatch(productActions.setUpdateProductId(id));
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
    status: "green",
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
          <AddProductForm action="update" />
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
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "1.1rem",
                      letterSpacing: "0.5px",
                      paddingTop: "1.5rem",
                      paddingBottom: "1.5rem",
                      textTransform: "capitalize",
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
                        }else if (column.id === "Reviews") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                onClick={handleReviewsChange.bind(null, row._id,row.name)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            style={{
                              color: Text_Color[column.id] || "rgb(80,80,80)",
                              maxWidth: "15rem",
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

export default memo(ItemTable);
