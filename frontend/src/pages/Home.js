// ... imports
// Import fetchCart thunk if you want to sync cart on home page
import { fetchCart } from '../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Product from '../components/Product';

const Home = () => {
    // Change API_URL to your backend
    const API_URL = "http://localhost:5000/api/products";
    const [loading,setLoading] = useState(false);
    const [posts,setPosts] = useState([]);
    const dispatch = useDispatch();

    async function fetchProductData(){
        setLoading(true);
        try{
            const result = await fetch(API_URL);
            const data = await result.json();
            setPosts(data);
        }
        catch(error){
            console.log("Sorry data not found");
            setPosts([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProductData();
        // Optional: re-sync cart state when visiting home
        dispatch(fetchCart()); 
    },[]);

  return (
    // ... rest of your JSX is fine
    // ... but update your product key
     <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
        {
            posts.map((post) => (
                // Use post.id (which is the product ID)
                <Product key = {post.id} post={post}/>
            ))
        }
    </div>
    // ...
  )
}

export default Home;