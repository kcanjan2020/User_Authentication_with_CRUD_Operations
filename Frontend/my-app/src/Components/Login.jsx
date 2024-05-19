import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/logIn.css"
import { NavLink } from 'react-router-dom'
const Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState(false);
    let navigate = useNavigate();
    let onSubmit = async (e) => {
        e.preventDefault();

        let data = {
            email: email,
            password: password,
        };
        try {
            let result = await axios({
                url: "http://localhost:8000/api/auth/login",
                method: "POST",
                data: data,
            });
            toast.success("User Login Successfully");
            localStorage.setItem("token", result.data.token)
            navigate("/admin/profile")
        } catch (error) {
            toast.error(error.response.data.message)

        }
    };
    return (
        <div className="login_container">
            <ToastContainer />
            <div className="login_form_container">
                <div className="right">
                    <form className="form_container " onSubmit={onSubmit}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder=" Enter Your Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            id="email"
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={password} //abc
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id="password"
                            className="input"
                        />
                        <button type="submit" className="green_btn">
                            Sing In
                        </button>
                        <NavLink to="/admin/forgot-password">
                            <button type="button" className="forgot_btn">
                                Forgot Password
                            </button>
                        </NavLink>
                    </form>
                </div>
                <div className="left">
                    <h1>New Here ?</h1>
                    <NavLink to="/admin/register">
                        <button type="button" className="white_btn">
                            Sing Up
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;

