import { Fragment } from "react";
import SimpleModal from "../Dekstop/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import AddCategoryForm from "./Form/AddCategoryForm";
import AddIcon from "@mui/icons-material/Add";
import StatusButton from "../Dekstop/StatusButton/StatusButton";
import CategoryTable from "./CategoryTable/CategoryTable";
import "../Category/AddCategory.styles.scss";
import { uiActions } from "../../store/ui-slice";
import { Box, Typography } from "@mui/material";

const AddCategory = () => {
  const dispatch = useDispatch();
  const fetchCategoryData = useSelector(
    (state) => state.category.fetchCategoryData
  );
  const showModel = useSelector((state) => state.ui.addModelState);
  const handleAddChange = () => {
    dispatch(uiActions.setAddModelState(true));
  };
  const closeModelHandler = () => {
    dispatch(uiActions.setAddModelState(false));
  };

  return (
    <Fragment>
      {showModel && (
        <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
          <AddCategoryForm action="add" />
        </SimpleModal>
      )}
      <StatusButton
        isLoading={fetchCategoryData}
        icon={<AddIcon />}
        onClick={handleAddChange}
      >
        {fetchCategoryData.status ? fetchCategoryData.activity : "Add Category"}
      </StatusButton>

      <Typography
        align="center"
        sx={{
          letterSpacing: "1px",
          alignSelf: "center",
          position: "fixed",
          fontSize: "1.6rem",
          marginTop: "0.5rem",
          color: "rgb(80,80,80)",
          width: "14rem",
          textTransform: "uppercase",
          borderBottom: "1px solid rgb(80,80,80)",
        }}
      >
        Categories
      </Typography>
      <div className="itemTableContanier">
        <CategoryTable />
      </div>
    </Fragment>
  );
};

export default AddCategory;
