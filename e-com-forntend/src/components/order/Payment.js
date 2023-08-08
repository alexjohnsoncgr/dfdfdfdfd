import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initPayment } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth'
import { saveCoupon } from '../../api/apiCoupon';

const Payment = () => {
    const [sessionSuccess, setSessionSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const { finalAmount } = useParams();
    const [message, setMessage] = useState("");

    const initiatePayment = () => {
        initPayment(userInfo().token)
            .then(response => {
                if (response.data.status === "SUCCESS") {
                    setSessionSuccess(true);
                    setRedirectUrl(response.data.GatewayPageURL);
                    setFailed(false);
                }
            })
            .catch(error => {
                setFailed(true);
                setSessionSuccess(false);
            })
    }

    useEffect(() => {
        const data = {
            finalAmount: finalAmount,
        }
        saveCoupon(userInfo().token, data)
            .then(response => {
                setMessage(response.data)
                initiatePayment();
            })
            .catch(error => console.log("saveCoupon", error))

        // initPayment(userInfo().token)
        //     .then(response => {
        //         if (response.data.status === "SUCCESS") {
        //             setSessionSuccess(true);
        //             setRedirectUrl(response.data.GatewayPageURL);
        //             setFailed(false);
        //         }
        //     })
        //     .catch(error => {
        //         setFailed(true);
        //         setSessionSuccess(false);
        //     })
    }, [])
    return (
        <div>
            {sessionSuccess ? window.location = redirectUrl : <p>Payment Loading....</p>}
            {failed ? (<>
                <p>Failed to start payment session..</p>
                <Link to="/cart">Go to Cart</Link>
            </>) : ""}

        </div>
    )
}

export default Payment;