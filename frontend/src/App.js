import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart"; 
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "./redux/slices/CartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the cart from the DB when the app loads
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
        <div className="bg-slate-900">
            <Navbar/>
        </div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    </div>
  );
}

export default App;