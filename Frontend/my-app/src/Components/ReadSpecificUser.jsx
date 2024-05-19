import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const ReadSpecificUser = () => {
    let navigate = useNavigate()
    let [user, setUser] = useState({});
    let token = localStorage.getItem(`token`);
    let params = useParams()
    let id = params.id
    let getUser = async () => {
        try {
            let result = await axios({
                url: `http://localhost:8000/api/auth/users/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(result.data.data);

        } catch (error) {

        }

    };
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <ToastContainer />
            {token ? <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
                <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                    <h3> Details of User</h3>
                    <div className="mb-2">
                        <strong> ID: {user._id}</strong>
                    </div>
                    <div className="mb-2">
                        <strong> Full Name: {user.fullName}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Email: {user.email}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Gender: {user.gender}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Date of Birth: {new Date(user.dob).toLocaleDateString()}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Role: {user.role}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Email Verified: {String(user.isVerifiedEmail)}</strong>
                    </div>

                    <button className="btn btn-success" onClick={() => {
                        navigate(`/admin/update/${user._id}`)
                    }}> Edit</button>

                    <button className="btn btn-primary ms-3" onClick={() => {
                        navigate("/admin/read-alluser")
                    }}>Back</button>


                </div>
            </div> : navigate("/admin/login")}

        </div>

    );
};

export default ReadSpecificUser;