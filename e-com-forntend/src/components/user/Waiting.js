import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authenticate } from "../../utils/auth";
import { userInfo } from "../../utils/auth";


const Waiting = () => {
    const { token } = useParams();
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        authenticate(token, () => {
            setRedirect(true);
        })
    })


    if (redirect) {
        if (userInfo().role === "user") {
            return navigate("/dashboard");
        } else {
            return navigate("/admindashboard");
        }
    }


    return (
        <div><h1>...Loading....</h1></div>
    )
}
export default Waiting;