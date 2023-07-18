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
import { Container, IconButton } from "@mui/material";
import ReviewContainer from "../ReviewComponent/reviewComponet";
import { uiActions } from "../../../../store/ui-slice";
import { DeleteReview } from "../../../../utils/api";
import { productActions } from "../../../../store/product-slice";
import LoadingSpinner from "../../../Dekstop/UI/LoadingSpinner";

const columns = [
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
    align: "center",
    format: (value) => value.toFixed(2),
  }
];

const ReviewTable = (props) => {
  const dispatch = useDispatch();


  const ReviewChange = useSelector((state) => state.ui.ReviewChange)

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      props.reviews?.map((review) => ({
        Reviews:review,
        _id: review._id,
      }))
    );
  }, [props.reviews]);





  const handleDeleteChange = async (id) => {
    if (!id) return;
   
    try {
     const response =  await DeleteReview(id);
    //  dispatch(productActions.setProductReviews)
      console.log(response)
      dispatch(uiActions.setReviewChange(!ReviewChange))
      
    } catch (err) {
      throw err;
    }
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
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: "1%",
          boxShadow: "0px 0px 8px rgb(200,200,200)",
        }}
      >
        <TableContainer sx={{ maxHeight: 800 }}>
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
                                <DeleteForeverIcon sx={{transform:'scale(1.5)'}}/>
                              </IconButton>
                            </TableCell>
                          );
                        } 
                        return (
                          <TableCell
                            style={{
                            //   color: Text_Color[column.id] || "rgb(80,80,80)",
                              maxWidth: "15rem",
                              fontSize: "1rem",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : <ReviewContainer review={value}/>}
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

export default memo(ReviewTable);
