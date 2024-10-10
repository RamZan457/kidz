import './SuccessPayment.css';
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FailedPayment = () => {
    const navigate = useNavigate();
    return (
        <div className="payment_row">
            <div className="payment_col">
                <div className="payment_message-box payment_success payment_failed">
                    <FaTimesCircle className='icon' />
                    <h2>Your payment failed</h2>
                    <p>Try again later.</p>
                    <button className='button' onClick={() => navigate("/cart")}><span>Return</span> </button>
                </div>
            </div>
        </div>
    );
};

export default FailedPayment;
