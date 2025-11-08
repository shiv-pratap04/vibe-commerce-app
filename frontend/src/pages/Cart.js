import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'; // Corrected import
import CartItem from '../components/CartItem';
import { checkoutCart } from '../redux/slices/CartSlice'; 

// A new component for the Checkout Modal
const CheckoutModal = ({ total, onCheckout, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCheckout({ name, email });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-lg font-bold mb-4">
                        Total: ${total.toFixed(2)}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="text-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const Cart = () => {
    const { cart } = useSelector((state) => state.cart); // Ensure you select 'state.cart'
    const [totalAmount, setTotalAmount] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Calculate total based on price and quantity
        setTotalAmount(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
    }, [cart]);

    const handleCheckout = (formData) => {
        console.log("Checkout form data:", formData);
        // Dispatch the checkout action
        dispatch(checkoutCart({ cartItems: cart, totalAmount }));
        setShowCheckout(false);
        // Receipt modal could be shown here based on thunk status
    };

    return (
        <div>
            {showCheckout && (
                <CheckoutModal
                    total={totalAmount}
                    onCheckout={handleCheckout}
                    onClose={() => setShowCheckout(false)}
                />
            )}

            {
                cart.length > 0 ?
                (<div className='flex flex-col lg:flex-row'>
                    <div>
                        {
                            cart.map((item, index) => {
                                // Use item.productId or item._id for the key
                                return <CartItem key={item._id || index} item={item} />
                            })
                        }
                    </div>

                    <div className='p-10 flex flex-col justify-between h-[30rem] lg:w-[30rem] gap-3 
                                        shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]
                                        lg:fixed lg:right-[4rem] top-[10rem] sm:w-full  '>
                        <div>
                            <div className='uppercase text-green-600 font-bold text-xl'>Your Cart</div>
                            <div className='uppercase text-green-600 font-extrabold text-[2.8rem]'>Summary</div>
                            <p className='font-bold text-gray-800'>
                                <span>Total items: {cart.length}</span>
                            </p>
                        </div>

                        <div>
                            <p className='text-gray-700 font-semibold'>Total Amount :
                            <span className='text-black font-bold'>${totalAmount.toFixed(2)}</span>  </p>
                            <button 
                                onClick={() => setShowCheckout(true)} // Open modal
                                className='w-full border border-zinc-200 bg-green-600 text-white 
                                p-5 rounded-md hover:bg-green-700 transition duration-700 hover:text-white text-xl mt-2 cart'>
                                    Checkout Now
                            </button>
                        </div>
                    </div>
                </div>
                ) : 
                (
                    <div className='flex flex-col justify-center items-center h-[30rem] relative gap-5 '>
                        <h1 className='font-bold'>Cart <span className="text-red-600">Empty</span></h1>
                        <Link to={"/"}>
                            <button className='border border-zinc-200 bg-green-700 text-white p-5 rounded-md hover:bg-green-600 transition duration-700 hover:text-white'>
                                Shop Now
                            </button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Cart;