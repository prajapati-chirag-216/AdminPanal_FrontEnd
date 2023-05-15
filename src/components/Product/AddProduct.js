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

      <div className="itemTableContanier">
        <Itemtable />
      </div>
    </Fragment>
  );
};

export default AddProduct;