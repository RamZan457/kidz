import './SuccessPayment.css';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SuccessPayment = () => {
    const navigate = useNavigate();

    return (
        <div className="payment_row">
            <div className="payment_col">
                <div className="payment_message-box payment_success">
                    <FaCheckCircle className='icon' />
                    <h2>Your payment was successful</h2>
                    <p>
                        Thank you for your payment. We will
                        <br />
                        delever .
                    </p>
                    <button className='button' onClick={() => navigate("/")}><span>Continue</span> </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;

