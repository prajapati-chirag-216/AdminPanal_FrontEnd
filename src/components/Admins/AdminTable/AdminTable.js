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
import AddAdminForm from "../Form/AddAdminForm";
import { deleteAdmin, getAdmins } from "../../../utils/api";
import { Container, IconButton, Typography } from "@mui/material";
import { adminActions } from "../../../store/admin-slice";
import { uiActions } from "../../../store/ui-slice";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";
import roleTypes from "../../../utils/roles/roleTypes";
const columns = [
  { id: "name", label: "Name", minWidth: 160 },
  {
    id: "email",
    label: "email",
    minWidth: 200,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "role",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "createdAt",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "updatedAt",
    label: "updatedAt",
    minWidth: 100,
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

const AdminTable = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.admin.admins);

  const fetchAdminData = useSelector((state) => state.admin.fetchAdminData);
  const showModel = useSelector((state) => state.ui.updateModelState);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      adminData?.map((admin) => ({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: new Date(admin.createdAt).toLocaleString(),
        updatedAt: new Date(admin.updatedAt).toLocaleString(),
      }))
    );
  }, [adminData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAdmins();
        dispatch(adminActions.setAdmins(data));
      } catch (err) {
        console.error(err);
      }
    };
    try {
      if (!fetchAdminData.status || fetchAdminData.activity === "Fetching..") {
        fetch()
          .then(() =>
            dispatch(
              adminActions.setFetchAdminData({
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
  }, [fetchAdminData]);

  const handleDeleteChange = async (id) => {
    if (!id) return;
    dispatch(
      adminActions.setFetchAdminData({
        status: true,
        activity: "Deleting..",
      })
    );
    try {
      await deleteAdmin(id);
      dispatch(
        adminActions.setFetchAdminData({
          status: false,
          activity: "Deleting..",
        })
      );
    } catch (err) {
      dispatch(
        adminActions.setFetchAdminData({
          status: false,
          activity: "Deleting..",
        })
      );
      throw err;
    }
  };

  const handleUpdateChange = (id) => {
    dispatch(adminActions.setUpdateAdminId(id));
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
          <AddAdminForm action="update" />
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
                              {row["role"] === roleTypes.SUPER_ADMIN ? (
                                <Typography sx={{ color: "gray" }}>
                                  Restricted
                                </Typography>
                              ) : (
                                <IconButton
                                  onClick={handleDeleteChange.bind(
                                    null,
                                    row._id
                                  )}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              )}
                            </TableCell>
                          );
                        } else if (column.id === "Update") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row["role"] === roleTypes.SUPER_ADMIN ? (
                                <Typography sx={{ color: "gray" }}>
                                  Restricted
                                </Typography>
                              ) : (
                                <IconButton
                                  onClick={handleUpdateChange.bind(
                                    null,
                                    row._id
                                  )}
                                >
                                  <BorderColorIcon />
                                </IconButton>
                              )}
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

export default memo(AdminTable);
