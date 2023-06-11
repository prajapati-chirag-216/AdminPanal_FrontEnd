import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import OrderTable from "./OrderTable/OrderTable"
import { orderActions } from '../../store/order-slice';
import { getOrderById } from '../../utils/api';
import { useDispatch,useSelector } from 'react-redux';
import { fetchOrders } from '../../utils/api';
import { Close } from '@mui/icons-material';
import './order.styles.scss'


const Orders = () =>{

    const[orderId,setOrderId] = useState('')
    const dispatch = useDispatch();
    const[isSearchMode,setisSearchMode] = useState('')
    

    const fetchOrderData = useSelector(
        (state) => state.order.fetchOrderData
      )

    const handleSearchOrder = async() =>{

          setisSearchMode(true)
                   
        const fetch = async () => {
            try {
              const Data = await getOrderById(orderId);
              dispatch(orderActions.setOrders(Data));
            } catch (err) {
              console.error(err);
            }
          };
          try {
            if (
              !fetchOrderData.status ||
              fetchOrderData.activity === "Fetching.."
            ) {
              fetch()
                .then((res) =>
                  dispatch(
                    orderActions.setFetchOrderData({
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
           
    }

    const handleCloseFilter = async() =>{

      

        const fetch = async () => {
            try {
              const Data = await fetchOrders();
              dispatch(orderActions.setOrders(Data));
            } catch (err) {
              console.error(err);
            }
          };
          try {
            if (
              !fetchOrderData.status ||
              fetchOrderData.activity === "Fetching.."
            ) {
              fetch()
                .then((res) =>
                  dispatch(
                    orderActions.setFetchOrderData({
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


          setisSearchMode(false)
        //   setOrderId('')
    }


    return (

<div className='orderPageContainer'>

     <div className='orderPageHeaderContainer'>

        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
       >
  
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Order by Transaction-Id"
        inputProps={{ 'aria-label': 'search order by Transaction-Id' }}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <IconButton onClick={handleSearchOrder} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    {isSearchMode && <Close style={{cursor:'pointer',transform:'scale(1.5)'}} onClick={handleCloseFilter}/>}
    </div>
        <div>
             <OrderTable/>
        </div>

        </div>
    )
}


export default Orders