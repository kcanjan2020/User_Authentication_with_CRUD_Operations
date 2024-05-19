import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const ResetPassword = () => {
    let [password, setPassword] = useState("");
    let [query] = useSearchParams();
    let token = query.get("token");
    let navigate = useNavigate();

    let onSubmit = async (e) => {
        e.preventDefault();
        let data = {
            password: password,
        };
        try {
            let result = await axios({
                url: "http://localhost:8000/api/auth/reset-password",
                method: "PATCH",
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setPassword("")
            navigate(`/admin/login`);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    };
    return <div>

        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
                <h1> Reset User Password</h1>
                <form onSubmit={onSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="password"> New Password: </label>
                        <input
                            className='form-control'
                            type="password"
                            value={password} //abc
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id="password"
                        ></input>
                    </div>
                    <br />
                    <button className='btn btn-success' type="submit">Reset Password</button>
                </form>
            </div>
        </div >
    </div>;
};

export default ResetPassword;
