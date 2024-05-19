import axios from "axios";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {

    let [email, setEmail] = useState("");

    let onSubmit = async (e) => {
        e.preventDefault();

        let data = {
            email: email,
        };
        try {
            let result = await axios({
                url: "http://localhost:8000/api/auth/forgot-password",
                method: "POST",
                data: data,
            });
            setEmail("");
            toast.success(
                "Mail has been sent to your email. Please reset your password by clicking the link on your mail"
            );

        } catch (error) {
            toast.error(error.response.data.message)

        }
    };

    return (
        <div>
            <ToastContainer />
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
                    <h1> Forgot User Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="email">Email: </label>
                            <input
                                className='form-control'
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                id="email"
                            ></input>
                        </div>
                        <br />
                        <button className='btn btn-success' type="submit">Forgot Password</button>
                    </form>
                </div>
            </div >
        </div>
    );
};

export default ForgotPassword;