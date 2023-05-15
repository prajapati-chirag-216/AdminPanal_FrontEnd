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
export async function addDisplayImage(image) {

 
  try {
    const imageLink = await uploadToCloud(image)


    const response = await axios.post(
      `${BACKAND_DOMAIN}/admin/addDisplayImage`,imageLink,
      
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
    const response = await axios.post(
      `${BACKAND_DOMAIN}/admin/fetchDisplayImage`,
      {},
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
    const response = await axios.post(
      `${BACKAND_DOMAIN}/admin/deleteDisplayImage/${id}`,
      {},
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

const uploadToCloud = async(image) =>{

  const formData = new FormData()

  formData.append('file',image)
  formData.append('upload_preset','AddImage')
  formData.append('cloud_name','dzpuekeql')
  
  const result = await fetch('https://api.cloudinary.com/v1_1/dzpuekeql/image/upload',{
    method:'POST',
    body:formData
   })
   const data = await result.json()
  
   return data.secure_url

}



export const addProduct = async (productObj) => {

  console.log(productObj,'kean')  
  
  const response = productObj.image.map(async(image)=>{
  
    return  await uploadToCloud(image) 
 
   })

   const result = await Promise.all(response)


  console.log(result,'confiem')

  productObj.image = result
 
  try {
  
    const response = await axios.post(
      `${BACKAND_DOMAIN}/addproduct`,   
      productObj,
      {
        withCredentials: true,
      }
    );
    console.log(response,'res ayo');
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


       const{image , ...newProduct} = product;



  try { 

    if(image.length !== 0){


      
      const response = image.map(async(image)=>{
        return  await uploadToCloud(image) 
      })
      
      const result = await Promise.all(response)

      newProduct.image = result
    }



    const { data } = await axios.patch(`${BACKAND_DOMAIN}/updateproduct/${id}`, newProduct,);

    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export async function addCategory(catData) {

  console.log(catData)

  const imageLink = await uploadToCloud(catData.image)

  catData.image = imageLink

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
    console.log(response);
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}


export const  updateCategories = async(categoryObj,id) =>{


     const{image, ...newCategoryObj} = categoryObj 

    if('image' in categoryObj ){

        const imageLink = await uploadToCloud(image);

        newCategoryObj.image = imageLink
    }


    try{

  
    const {data} = await axios.patch(`${BACKAND_DOMAIN}/updatecategory/${id}`,newCategoryObj)
      return data
    }catch(err){
      console.log('inside update category front',err)
    }

}

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