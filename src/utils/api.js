import AxiosInstance from "./AxiosInstance/AxiosInstance";
import { uploadToCloud } from "./function";
export async function signupAdmin(adminData) {
  const config = {
    method: "POST",
    url: `/admin/signup`,
    data: adminData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function fetchAdminProfile() {
  try {
    const config = {
      url: `/admin/profile`,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function loginAdmin(adminData) {
  const config = {
    method: "POST",
    url: `/admin/login`,
    data: adminData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function logoutAdmin() {
  const config = {
    method: "POST",
    url: `/admin/logout`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function forgotPassword(adminData) {
  const config = {
    method: "POST",
    url: `/admin/forgotPassword`,
    data: adminData,
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function resetPassword(adminData) {
  const config = {
    method: "POST",
    url: `/admin/resetPassword/${adminData.id}`,
    data: { password: adminData.password },
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function addDisplayImage(displayData) {
  try {
    const imageLink = await uploadToCloud(displayData.image);
    const config = {
      method: "POST",
      url: `/addDisplayImage`,
      data: { ...displayData, image: imageLink },
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function fetchDisplayImage() {
  const config = {
    url: `/fetchDisplayImage`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function deleteDisplayImage(id) {
  const config = {
    method: "DELETE",
    url: `/deleteDisplayImage/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export const getProducts = async () => {
  const config = {
    url: `/getproducts`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const addProduct = async (productObj) => {
  try {
    const result = productObj.image.map(async (image) => {
      return await uploadToCloud(image);
    });
    const finalResult = await Promise.all(result);
    productObj.image = finalResult;

    const config = {
      method: "POST",
      url: `/addproduct`,
      data: productObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteproduct/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
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
    const config = {
      method: "PATCH",
      url: `/updateproduct/${id}`,
      data: newProduct,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};
export async function addCategory(catData) {
  try {
    const imageLink = await uploadToCloud(catData.image);
    catData.image = imageLink;
    const config = {
      method: "POST",
      url: `/addCategory`,
      data: catData,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
}

export const updateCategory = async (categoryObj, id) => {
  const { image, ...newCategoryObj } = categoryObj;

  try {
    if ("image" in categoryObj) {
      const imageLink = await uploadToCloud(image);
      newCategoryObj.image = imageLink;
    }
    const config = {
      method: "PATCH",
      url: `/updatecategory/${id}`,
      data: newCategoryObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchCategories = async () => {
  const config = {
    url: `/fetchCategories`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteCategory = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteCategory/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};
export const fetchOrders = async () => {
  const config = {
    url: `/getAllOrders`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};
export const updateOrder = async (updateObj, updateId) => {
  try {
    const config = {
      method: "PATCH",
      url: `/updateOrderStatus/${updateId}`,
      data: updateObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrderById = async (id) => {
  const config = {
    url: `/getOrder/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const deleteOrder = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteOrder/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getTodaysOrders = async () => {
  const config = {
    url: `/getTodaysOrders`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getUsers = async () => {
  const config = {
    url: `/getAllUsers`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getAccessToken = async () => {
  try {
    const config = {
      url: "/admin/getAccessToken",
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAdmins = async () => {
  const config = {
    url: `/getAllAdmins`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export async function addAdmin(adminData) {
  const config = {
    method: "POST",
    url: `/admin/addAdmin`,
    data: adminData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export const deleteAdmin = async (id) => {
  const config = {
    method: "DELETE",
    url: `/deleteAdmin/${id}`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const updateAdmin = async (newObj, id) => {
  try {
    const config = {
      method: "PATCH",
      url: `/updateAdmin/${id}`,
      data: newObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchProductReviews = async (productId) => {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/getproductReviews/${productId}`
    );

    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
};
export const PostReview = async (ReviewData, id) => {
  try {
    const response = axios.post(
      `${BACKAND_DOMAIN}/productreview/${id}`,
      ReviewData
    );

    const data = await response.data;

    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export const DeleteReview = async (id) => {
  try {
    const response = axios.delete(`${BACKAND_DOMAIN}/deletereview/${id}`);

    const data = await response.data;

    return data;
  } catch (err) {
    throw err;
  }
};
