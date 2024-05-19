import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    let [fullName, setFullName] = useState("")
    let [dob, setDob] = useState("")
    let [gender, setGender] = useState("")
    let [role, setRole] = useState("")
    let navigate = useNavigate()

    let token = localStorage.getItem("token")
    let genderOption = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
        {
            label: "Other",
            value: "other"
        },
    ]

    let onSubmit = async (e) => {
        e.preventDefault()

        let data = {
            fullName: fullName,
            dob: dob,
            gender: gender

        }
        try {
            let result = await axios({
                url: `http://localhost:8000/api/auth/profile`,
                method: "PUT",
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate(`/admin/profile`)

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

    let getProfile = async () => {
        let result = await axios({
            url: `http://localhost:8000/api/auth/profile`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let data = result.data.data
        setFullName(data.fullName)
        setDob(data.dob)
        setGender(data.gender)
    }


    useEffect(() => {
        getProfile()
    }, [])
    return (
        <div>
            <ToastContainer />
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
                    <h1> Update Profile Details</h1>
                    <form onSubmit={onSubmit}>
                        <div className='mb-2'>
                            <label htmlFor='fullName'> Full Name:</label>
                            <input className='form-control' type='text' value={fullName} onChange={(e) => { setFullName(e.target.value) }} id='fullName'></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='dob'>DOB :</label>
                            <input className='form-control' type='date' value={dob} onChange={(e) => { setDob(e.target.value) }} id='dob'></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="gender"> Gender :</label>
                            <br></br>
                            {
                                genderOption.map((item, i) => {
                                    return (
                                        <span key={i}>
                                            <label htmlFor={item.value}>{item.label}</label>
                                            <input
                                                id={item.value}
                                                type='radio'
                                                value={item.value}
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                }}
                                                checked={gender === item.value}
                                            ></input>
                                        </span>
                                    )
                                })
                            }

                        </div>
                        <br />
                        <button className='btn btn-success' type="submit">Update</button>

                        <button className="btn btn-primary ms-3" onClick={() => {
                            navigate("/admin/profile")
                        }}>Back</button>
                    </form>
                </div>
            </div >
        </div >
    );

}

export default UpdateProfile