import React from 'react'
import {MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';
// Import your new thunk
import { removeProductFromCart } from '../redux/slices/CartSlice';

const CartItem = ({item}) => { // 'item' is now a CartItem from your DB
  const dispatch = useDispatch();

  const removeFromCart = () => {
    // 'item.productId' is the original ID of the product
    dispatch(removeProductFromCart(item.productId)); 
  }
  return (
    <div>
        <div className='flex h-[15rem] gap-5 mb-0 mt-6 '>
          <div className='h-[190px] w-[190px]'>
            <img className=' h-full w-full' src={item.image}/>
          </div>
          <div className='flex flex-col h-[190px] w-[250px] gap-4'>
            <h1 className='text-gray-700 font-bold text-lg text-left truncate... w-70'>{item.title}</h1>
            <div>
            {/* The item from DB doesn't have description, you can remove this or add it to your CartItem model */}
            {/* <h1 className='text-gray-700 font-medium text-[13px] '>{item.description.split(" ").slice(0,8).join(" ") + "..."}</h1> */}
            </div>
            
            <div className='flex justify-center items-center justify-between'>
              <p className='text-green-600 font-bold text-xl'>${item.price}</p>
              {/* Note: You can also display item.quantity here if you want */}
              <div className='flex justify-center items-center bg-red-200 rounded-full h-[2rem] w-[2rem] cursor-pointer hover:scale-150 hover:transition duration-400' onClick={removeFromCart}>
                <MdDelete className='text-red-800 hover:animate-bounce' />
              </div>
            </div>
          </div>
        </div>
      <div className='border border-gray-400 w-full '></div>
    </div>
  )
}

export default CartItem;