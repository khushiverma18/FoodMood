import React, { useContext, useEffect,useState } from 'react'
import  './verify.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Storecontext } from '../../context/storecontext'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success") === "true";  // Convert to boolean
    const orderId = searchParams.get("orderId");
    const { url } = useContext(Storecontext);
    const navigate = useNavigate();

    // State for showing messages
    const [message, setMessage] = useState("Verifying Payment...");
    const [loading, setLoading] = useState(true);

    const verifyPayment = async () => {
        try {
            if (!orderId) {
                setMessage("⚠️ Invalid Order ID. Redirecting...");
                setTimeout(() => navigate("/"), 3000);
                return;
            }

            const response = await axios.post(url + "/api/order/verify", { success, orderId });

            if (response.data.success) {
                setMessage("🎉 Order Placed Successfully!");
                toast.success("🎉 Your order has been placed!", { autoClose: 2000 });
                setTimeout(() => navigate("/myorders"), 3000);
            } else {
                setMessage("❌ Payment Verification Failed!");
                toast.error("❌ Payment verification failed!", { autoClose: 2000 });
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (error) {
            setMessage("⚠️ Something went wrong! Please try again.");
            toast.error("⚠️ Something went wrong!", { autoClose: 2000 });
            setTimeout(() => navigate("/"), 3000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            {loading ? <div className="spinner"></div> : <h2>{message}</h2>}
        </div>
    );
};

export default Verify;