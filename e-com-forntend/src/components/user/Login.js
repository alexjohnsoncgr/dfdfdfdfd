import Layout from "../Layout";
import { useEffect, useState } from "react";
import { login } from "../../api/apiAuth";
import { showError, showLoading } from "../../utils/messages";
import { Link, useNavigate } from 'react-router-dom';
import { authenticate, isAuthnticated, userInfo } from "../../utils/auth";
import { API } from "../../utils/config";

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        errMsg: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
        success: false
    });

    const navigate = useNavigate();

    const { email, password, errMsg, loading, error, redirect, disabled, success } = values;

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            disabled: true,
            loading: true
        });
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        errMsg: '',
                        error: false,
                        loading: false,
                        disabled: false,
                        redirect: true,
                        success: true
                    })
                })

            }).catch(error => {
                setValues({
                    email: '',
                    password: '',
                    errMsg: error.response.data,
                    error: true,
                    loading: false,
                    disabled: false,
                    redirect: false,
                    success: false
                })
            })

    }

    const naviGate = () => {
        if (redirect) {
            if (userInfo().role === "user") {
                return navigate("/dashboard");
            } else {
                return navigate("/admindashboard");
            }
        }
    }


    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} onChange={handleChange} required />
            </div>
            <div className="row justify-content-center mt-2">
                <button type="submit" className="btn btn-outline-primary  col-sm-6" onClick={handleSubmit} disabled={disabled} style={{ justifyContent: "center" }}>Login</button>
            </div>

        </form>
    );
    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert alert-primary">
                    Succefully login
                </div>
            )
        }
    }

    const google = () => {
        window.open(`${API}/auth/google`, "_self");
    }
    const facebook = () => {
        window.open(`${API}/auth/facebook`, "_self");
    }
    return (
        <Layout title="Login" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showLoading(loading)}
            {showError(error, errMsg)}
            {naviGate()}
            <h3>Login Here</h3>
            <hr />
            {signInForm()}
            <hr />
            <h5 style={{ textAlign: "center" }}>OR</h5>
            <div className="row justify-content-center">
                <button className="btn btn-outline-primary col-sm-4" onClick={google}>
                    <img src="google_logo.png" alt="icon" width="20px" height="20px" />&nbsp;&nbsp;
                    Google
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-outline-primary col-sm-4" onClick={facebook}>
                    <img src="facebook_logo.png" alt="icon" width="20px" height="20px" />&nbsp;&nbsp;
                    Facebook
                </button>
            </div>

        </Layout>
    )
}
export default Login;