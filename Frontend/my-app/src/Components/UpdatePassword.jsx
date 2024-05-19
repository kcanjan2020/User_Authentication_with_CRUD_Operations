import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let navigate = useNavigate()
    let token = localStorage.getItem("token")
    let onSubmit = async (e) => {
        e.preventDefault()

        let data = {
            newPassword: newPassword,
            oldPassword: oldPassword,

        }
        try {
            let result = await axios({
                url: `http://localhost:8000/api/auth/update-password`,
                method: "PATCH",
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem("token")
            toast.success("Password updated Successfully")
            navigate(`/admin/login`)

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    }
    return (
        <div>
            <ToastContainer />
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
                    <h1> Change User Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="oldPassword"> Old Password: </label>
                            <input
                                className='form-control'
                                type="password"
                                value={oldPassword} //abc
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                }}
                                id="oldPassword"
                            ></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="newPassword"> New Password: </label>
                            <input
                                className='form-control'
                                type="password"
                                value={newPassword} //abc
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                                id="newPassword"
                            ></input>
                        </div>
                        <br />
                        <button className='btn btn-success' type="submit">Update Password</button>
                    </form>
                </div>
            </div >

        </div>
    );

}

export default UpdatePassword