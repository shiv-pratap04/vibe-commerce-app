import React from 'react'
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const Navbar = () => {
    const {cart} = useSelector((state) => state);

  return (
        <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto'>
            <NavLink to="/">
                <div className='ml-5'>
                    <img src="../logo.png" className='h-14'/>
                </div>
            </ NavLink>

            <div  className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
                <NavLink to="/">
                    <p>Home</p>
                </NavLink>

                <NavLink to="/cart">
                    <div className='relative'>
                        <MdShoppingCart className='text-2xl'/>
                        {
                            (cart ? cart.length : 0) > 0 &&
                            <span  className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 
                            flex justify-center items-center animate-bounce rounded-full'>
                                {cart.length}
                            </span>
                        }
                        
                    </div>
                </NavLink>
            </div>
            
        </nav>
  )
}

export default Navbar