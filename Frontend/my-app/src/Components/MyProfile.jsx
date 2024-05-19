import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const MyProfile = () => {
    let navigate = useNavigate()
    let [myProfile, setMyProfile] = useState({});
    let token = localStorage.getItem(`token`);
    let getMyProfile = async () => {
        try {
            let result = await axios({
                url: `http://localhost:8000/api/auth/profile`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMyProfile(result.data.data);

        } catch (error) {

        }

    };
    useEffect(() => {
        getMyProfile();
    }, []);

    let handleDelete = (id) => {
        return (e) => {
            MySwal.fire({
                title: "Confirmation",
                text: "Are you sure you want Delete?",
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                icon: "warning"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        let result = await axios({
                            url: `http://localhost:8000/api/auth/users/${id}`,
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        toast.success(result.data.message);
                        navigate("/admin/login")
                    } catch (error) {
                        toast.error(error.response.data.message);
                    }
                } else if (result.isDismissed) {
                    console.log("cancel button is clicked");
                }
            });
        };
    };

    return (
        <div>
            <ToastContainer />
            {token ? <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
                <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                    <h3 style={{ textAlign: "center" }}> Profile Details</h3>
                    <div className="mb-2">
                        <strong> ID: {myProfile._id}</strong>
                    </div>
                    <div className="mb-2">
                        <strong> Full Name: {myProfile.fullName}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Email: {myProfile.email}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Gender: {myProfile.gender}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Date of Birth: {new Date(myProfile.dob).toLocaleDateString()}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Role: {myProfile.role}</strong>
                    </div>
                    <div className="mb-3">
                        <strong> Email Verified: {String(myProfile.isVerifiedEmail)}</strong>
                    </div>

                    <button className="btn btn-success me-2" onClick={() => {
                        navigate("/admin/update-profile")
                    }} > Update</button>

                    <button className='btn btn-sm btn-danger me-2' onClick={handleDelete(myProfile._id)}>Delete</button>

                </div>
            </div> : navigate("/admin/login")}

        </div>

    );
};

export default MyProfile;