import axios from "axios";

const BACKAND_DOMAIN = "http://localhost:8000";

export async function loginAdmin(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/login`,
      {
        ...userData,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function logoutAdmin() {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Logout." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function forgotPassword(userData) {
  try {
    const response = await axios.post(`${BACKAND_DOMAIN}/forgotPassword`, {
      ...userData,
    });
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Somthing went wrong." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function resetPassword(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/resetPassword/${userData.id}`,
      {
        password: userData.password,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to reset password." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function addDisplayImage(displayData) {
  try {
    const imageLink = await uploadToCloud(displayData.image);
    const response = await axios.post(
      `${BACKAND_DOMAIN}/admin/addDisplayImage`,
      { ...displayData, image: imageLink },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function fetchDisplayImage() {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/admin/fetchDisplayImage`,
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function deleteDisplayImage(id) {
  try {
    const response = await axios.delete(
      `${BACKAND_DOMAIN}/admin/deleteDisplayImage/${id}`,
      // {},
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// ADDED---------------------------------------------------

export const getProducts = async () => {
  const productdata = await fetch(`${BACKAND_DOMAIN}/getproduct`);

  const data = await productdata.json();
  return data;
};

const uploadToCloud = async (image) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "AddImage");
  formData.append("cloud_name", "dzpuekeql");

  const result = await fetch(
    "https://api.cloudinary.com/v1_1/dzpuekeql/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await result.json();

  return data.secure_url;
};

export const addProduct = async (productObj) => {
  const response = productObj.image.map(async (image) => {
    return await uploadToCloud(image);
  });

  const result = await Promise.all(response);

  productObj.image = result;

  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/addproduct`,
      productObj,
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "Created") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const data = await fetch(`${BACKAND_DOMAIN}/deleteproduct/${id}`, {
      method: "DELETE",
    });

    const res = await data.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (product, id) => {
  const { image, ...newProduct } = product;

  try {
    if (image.length !== 0) {
      const response = image.map(async (image) => {
        return await uploadToCloud(image);
      });

      const result = await Promise.all(response);

      newProduct.image = result;
    }

    const { data } = await axios.patch(
      `${BACKAND_DOMAIN}/updateproduct/${id}`,
      newProduct
    );

    return data;
  } catch (err) {
    throw err;
  }
};

export async function addCategory(catData) {
  const imageLink = await uploadToCloud(catData.image);

  catData.image = imageLink;

  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/addCategory`,
      {
        ...catData,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export const updateCategories = async (categoryObj, id) => {
  const { image, ...newCategoryObj } = categoryObj;

  if ("image" in categoryObj) {
    const imageLink = await uploadToCloud(image);

    newCategoryObj.image = imageLink;
  }

  try {
    const { data } = await axios.patch(
      `${BACKAND_DOMAIN}/updatecategory/${id}`,
      newCategoryObj
    );
    return data;
  } catch (err) {}
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BACKAND_DOMAIN}/fetchCategories`, {
      withCredentials: true,
    });
    const data = response.data;

    return data;
  } catch (err) {
    throw err;
  }
};
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${BACKAND_DOMAIN}/deleteCategory/${id}`,
      { withCredentials: true }
    );
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};


export const fetchOrders = async() =>{


     try{
        const response = await axios.get(`${BACKAND_DOMAIN}/getAllOrders`)

        const data = await response.data

         return data
     }catch(err){
        throw err
     }
}

export const updateOrder = async(updateObj, updateId) =>{

     try{
         const response = await axios.patch(`${BACKAND_DOMAIN}/updateOrderStatus/${updateId}`,updateObj);

         const data = await response.data;

         console.log(data,'iuhu')

         return data
     }catch(err){
      throw err
   }
}


export const getOrderById = async(id) =>{

     try{
       const response = await axios.get(`${BACKAND_DOMAIN}/getOrderById/${id}`);

       const data = await response.data

       return data
     }catch(err){
      throw err
   }
}


export const deleteOrder = async(id) =>{

     try{
       const response = await axios.delete(`${BACKAND_DOMAIN}/deleteOrder/${id}`);

       const data = await response.data

       return data
     }catch(err){
      throw err
   }
}


export const getTodaysOrders = async() =>{

      try{
          const response = await axios.get(`${BACKAND_DOMAIN}/getTodaysOrders`);

          const data = await response.data

          return data
      }catch(err){
         throw err;
      }
}


export const getUsers = async() =>{

     try{
        const response = await axios.get(`${BACKAND_DOMAIN}/getAllUsers`);

        
        const data = await response.data
        
        console.log(data)
        return data
     }catch(err){
      throw err;
   }
}


export const fetchProductReviews =  async(productId) => {
     
     try{
        
        const response = await axios.get(`${BACKAND_DOMAIN}/getproductReviews/${productId}`)

         const data = await response.data
         return data
     }catch(err){
       throw err
     }
}
export const PostReview = async(ReviewData,id) =>{

     try{
         const response = axios.post(`${BACKAND_DOMAIN}/productreview/${id}`,ReviewData);

         const data = await response.data

         console.log(data)
         return data
     }catch(err){
        throw err
     }
}

export const DeleteReview = async(id) =>{
   
     try{
         
        const response = axios.delete(`${BACKAND_DOMAIN}/deletereview/${id}`);

        const data = await response.data

        return data
     }catch(err){
        throw err
     }
}