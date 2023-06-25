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
import AddCategoryForm from "../Form/AddCategoryForm";
import { deleteCategory, fetchCategories } from "../../../utils/api";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { uiActions } from "../../../store/ui-slice";
import { categoryActions } from "../../../store/category-slice";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "icon",
    label: "icon",
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

const CategoryTable = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category.categories);
  const fetchCategoryData = useSelector(
    (state) => state.category.fetchCategoryData
  );
  const showModel = useSelector((state) => state.ui.updateModelState);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      categoryData?.map((category) => ({
        _id: category._id,
        name: category.name,
        icon: (
          <img
            width="50px"
            height="50px"
            style={{ objectFit: "cover" }}
            src={category.image}
          />
        ),
        createdAt: new Date(category.createdAt).toLocaleString(),
        updatedAt: new Date(category.updatedAt).toLocaleString(),
      }))
    );
  }, [categoryData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const Data = await fetchCategories();
        dispatch(categoryActions.setCategories(Data));
      } catch (err) {
        console.error(err);
      }
    };
    try {
      if (
        !fetchCategoryData.status ||
        fetchCategoryData.activity === "Fetching.."
      ) {
        fetch()
          .then((res) =>
            dispatch(
              categoryActions.setFetchCategoryData({
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
  }, [fetchCategoryData]);

  const handleDeleteChange = async (id) => {
    if (!id) return;
    dispatch(
      categoryActions.setFetchCategoryData({
        status: true,
        activity: "Deleting..",
      })
    );
    try {
      await deleteCategory(id);
      dispatch(
        categoryActions.setFetchCategoryData({
          status: false,
          activity: "Deleting..",
        })
      );
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateChange = (id) => {
    console.log(id, "jeh");
    dispatch(categoryActions.setUpdateCategoryId(id));
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
          <AddCategoryForm action="update" />
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
                      fontSize: "1.16rem",
                      textTransform: "capitalize",
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
                            style={{
                              color: Text_Color[column.id] || "rgb(80,80,80)",
                            }}
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
    </Fragment>
  );
};

export default memo(CategoryTable);
