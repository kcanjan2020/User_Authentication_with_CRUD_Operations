import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const ReadAllUser = () => {
    let navigate = useNavigate()

    let [users, setUsers] = useState([])
    let getAllUser = async () => {
        try {
            let result = await axios({
                url: `http://localhost:8000/api/auth/read-alluser`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            })
            setUsers(result.data.data)
        } catch (error) {
            console.log(error.response.data.message)

        }
    }
    useEffect(() => {
        getAllUser()
    }, [])

    let handleNavigate = (id) => {
        return (e) => {
            navigate(`/admin/${id}`)
        }
    }

    let handleEdit = (id) => {
        return (e) => {
            navigate(`/admin/update/${id}`)
        }
    }

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
                        getAllUser();
                        toast.success(result.data.message);
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
        <>
            <ToastContainer />
            <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
                <h1> List of Users</h1>
                <div className='w-90 rounded bg-white border shadow p-4'>
                    <table className='table table-striped'>
                        <thead align='center'>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Email Verified</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{data._id}</td>
                                            <td>{data.fullName}</td>
                                            <td>{data.email}</td>
                                            <td>{data.gender}</td>
                                            <td>{new Date(data.dob).toLocaleDateString()}</td>
                                            <td>{data.role}</td>
                                            <td>{String(data.isVerifiedEmail)}</td>
                                            <td>
                                                <button className='btn btn-sm btn-info me-2' onClick={handleNavigate(data._id)}>View</button>


                                                <button className='btn btn-sm btn-primary me-2' onClick={handleEdit(data._id)} >Edit</button>


                                                <button className='btn btn-sm btn-danger' onClick={handleDelete(data._id)}>Delete</button>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ReadAllUser