import React, { useState, useRef, Suspense } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import {
  addProduct,
  fetchCategories,
  updateCategories,
  updateProduct,
} from "../../../utils/api";
import classes from "./AddProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../store/product-slice";
import { Await, useLoaderData, Form } from "react-router-dom";
import { uiActions } from "../../../store/ui-slice";

const FINAL_BTN_ACTION = {
  addProduct: "Create Product",
  updateProduct: "Update Product",
};

const AddProductForm = ({ action }) => {
  const dispatch = useDispatch();
  const updateId = useSelector((state) => state.product.updateProductId);

  const [imageName, setImageName] = useState("");
  const matches = useMediaQuery("(max-width:700px)");
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const changeNameHandler = (event) => {
    let name = "";

    const imageArray = event.target.files;

    for (let key in imageArray) {
      if (key == "length") break;
      name = name + imageArray[key].name + " , ";
    }
    name = name.slice(0, -1);

    if (name !== "") {
      document.getElementById("file-div").style.borderColor = "black";
    }

    setImageName(name);
  };

  const handleProductAction = async (event) => {
    event.preventDefault();

    let images = [];

    for (let key in imageRef.current.files) {
      if (key == "length") break;

      images.push(imageRef.current.files[key]);
    }

    const productDetails = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: images,
      status: statusRef.current.value,
      category: categoryRef.current.value,
    };

    if (action === "add") {
      dispatch(
        productActions.setFetchProductData({
          status: true,
          activity: "Adding..",
        })
      );
      try {
        dispatch(uiActions.setAddModelState(false));
        await addProduct(productDetails);
        dispatch(
          productActions.setFetchProductData({
            status: false,
            activity: "Adding..",
          })
        );
      } catch (err) {
        throw err;
      }
    } else if (action === "update") {
      let updateObj = {};
      for (let key in productDetails) {
        if (productDetails[key]) {
          updateObj[key] = productDetails[key];
        }
      }
      dispatch(
        productActions.setFetchProductData({
          status: true,
          activity: "Updating..",
        })
      );
      try {
        dispatch(uiActions.setUpdateModelState(false));
        await updateProduct(updateObj, updateId);
        dispatch(
          productActions.setFetchProductData({
            status: false,
            activity: "Updating..",
          })
        );
      } catch (err) {
        throw err;
      }
    }
  };
  const loaderData = useLoaderData();
  return (
    <div>
      <div>
        <Typography variant={matches ? "h5" : "h4"} fontWeight="500">
          Add Product
        </Typography>
      </div>
      <form
        className={classes["product-form"]}
        onSubmit={handleProductAction}
        method="post"
      >
        <div>
          <TextField
            inputRef={nameRef}
            id="outlined-basic"
            label="Product Name"
            name="name"
            variant="outlined"
            fullWidth={true}
            autoComplete="off"
            required={action === "add"}
          />
          <TextField
            inputRef={priceRef}
            type="number"
            label="product Price"
            id="outlined-start-adornment"
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            fullWidth={true}
            style={{ height: "10px" }}
            required={action === "add"}
          />
        </div>
        <TextField
          inputRef={descriptionRef}
          id="outlined-basic"
          label="Product Description"
          name="discription"
          variant="outlined"
          multiline
          fullWidth={true}
          autoComplete="off"
          maxRows={3}
          required={action === "add"}
        />

        <div className={classes["file-input"]} id="file-div">
          <label htmlFor="inputTag" id="image-label">
            <AddPhotoAlternate
              style={{
                textAlign: "end",
                fill: "rgb(83, 83, 83)",
              }}
            />
            <Typography
              paddingLeft="0.5rem"
              fontSize="1rem"
              color="gray"
              style={{
                alignSelf: "center",
              }}
            >
              {imageName === "" ? "Add Image" : imageName}
            </Typography>
          </label>
          <input
            ref={imageRef}
            id="inputTag"
            name="image"
            type="file"
            accept="image/*"
            multiple
            onChange={changeNameHandler}
          />
        </div>
        <div>
          <TextField
            inputRef={statusRef}
            id="outlined-select-status"
            select
            name="status"
            label="status"
            defaultValue="Available"
            fullWidth={true}
          >
            {["Available", "Not-Available"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Suspense>
            <Await resolve={loaderData}>
              {(categories) => (
                <TextField
                  inputRef={categoryRef}
                  id="outlined-select-category"
                  label="Product Category"
                  name="category"
                  fullWidth={true}
                  required={action === "add"}
                  select
                  defaultValue={categories[0]._id}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Await>
          </Suspense>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            padding: matches ? "0.6rem" : "0.8rem",
            borderRadius: "4px",
            fontSize: matches ? "0.8rem" : "1rem",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          {(action === "add" && FINAL_BTN_ACTION.addProduct) ||
            FINAL_BTN_ACTION.updateProduct}
        </Button>
      </form>
    </div>
  );
};
export async function loader() {
  let result;
  try {
    result = await fetchCategories();
  } catch (err) {
    throw err;
  }
  return result.length > 0 ? result : [{ name: "No-Category", _id: "Empty" }];
}

export default AddProductForm;
