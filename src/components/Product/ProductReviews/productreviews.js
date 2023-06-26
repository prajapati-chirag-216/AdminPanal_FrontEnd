import { Await, useLoaderData } from "react-router-dom";
import { fetchProductReviews } from "../../../utils/api";
import { Fragment, Suspense, useEffect, useState } from "react";

import ReviewTable from "./ReviewTable/reviewTable";
import './productreview.style.scss'
import { Typography } from "@mui/material";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../Dekstop/Modal/Modal";
import StatusButton from "../../Dekstop/StatusButton/StatusButton";
import AddReviewForm from "../Form/AddReviewForm";
import AddIcon from "@mui/icons-material/Add";




const ProductReviews = () =>{


const [loaderData,setLoaderData] = useState(useLoaderData())
const[productName,setProductName] = useState(useSelector((state) => state.ui.productName))
const dispatch = useDispatch()

const showModel = useSelector((state) => state.ui.addModelState);
const ReviewChange = useSelector((state) => state.ui.ReviewChange)

console.log(productName)

useEffect(()=>{

    setLoaderData(loader())

},[ReviewChange])

const handleCreateChange = () => {
   
    dispatch(uiActions.setAddModelState(true));
  };

const closeModelHandler = () =>{
      
    dispatch(uiActions.setAddModelState(false));
     
}

  
     return(
    <Fragment>
         <div className="reviewPageContainer">

         {showModel && (
        <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
          <AddReviewForm />
        </SimpleModal>
      )}

<StatusButton
        isLoading={false}
        icon={<AddIcon />}
        onClick={handleCreateChange}
      >
        Add Review
 </StatusButton>

{productName !== '' &&<Typography
        align="center"
        sx={{
          letterSpacing: "1px",
          alignSelf: "center",
          fontSize: "1.6rem",
          marginTop: "0.5rem",
          color: "rgb(80,80,80)",
          width: 'auto',
          textTransform: "uppercase",
          borderBottom: "1px solid rgb(80,80,80)",
        }}
      >
        {`REVIEWS ON ${productName}`}
      </Typography>
}
      </div>
         
          <Suspense>
              <Await resolve={loaderData}>
                {
                    (reviews) => {

                       
                         return (
                          reviews.length !== 0?
                             <div className="reviewTableContainer">
                                 <ReviewTable reviews={reviews}/>
                             </div>:<Typography sx={{position:'absolute',alignSelf:'center',top:'30rem',letterSpacing:'3px',color:'rgb(80,80,80)'}}variant='h3' >{`No Reviews  On ${productName} Yet !`}</Typography>
                         )
                    }
                }
                    
              </Await>
          </Suspense>
              

          </Fragment>

       
     )
}

export default ProductReviews


export async function loader(){

    let response;

     let url = window.location.href;
console.log(url)
     let urlArray = url.split('/');

     const productId = urlArray[urlArray.length-1];



     try{

         
         response = await fetchProductReviews(productId)
         console.log(response,'oo')
         return response
     }catch(err){

          console.log(err)
     }

      
}

