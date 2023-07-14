import { Fragment } from "react";
import SimpleModal from "../Dekstop/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import AddProductForm from "./Form/AddProductForm";
import AddIcon from "@mui/icons-material/Add";
import { productActions } from "../../store/product-slice";
import StatusButton from "../Dekstop/StatusButton/StatusButton";
import Itemtable from "./ItemTable/Itemtable";
import "../Product/AddProduct.styles.scss";
import { uiActions } from "../../store/ui-slice";
import { Typography } from "@mui/material";

const AddProduct = () => {
  const dispatch = useDispatch();
  const fetchProductData = useSelector(
    (state) => state.product.fetchProductData
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
      <div className="productPageContainer">
        {showModel && (
          <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
            <AddProductForm action="add" />
          </SimpleModal>
        )}
        <StatusButton
          isLoading={fetchProductData}
          icon={<AddIcon />}
          onClick={handleAddChange}
        >
          {fetchProductData.status ? fetchProductData.activity : "Add Product"}
        </StatusButton>
        <Typography
          align="center"
          sx={{
            letterSpacing: "1px",
            alignSelf: "center",
            fontSize: "1.6rem",
            color: "rgb(80,80,80)",
            width: "13rem",
            textTransform: "uppercase",
            borderBottom: "1px solid rgb(80,80,80)",
            marginLeft: "5rem",
          }}
        >
          Products
        </Typography>
      </div>
      <div className="itemTableContanier">
        <Itemtable />
      </div>
    </Fragment>
  );
};

export default AddProduct;
