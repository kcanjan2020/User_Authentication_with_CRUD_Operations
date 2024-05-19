import axios from "axios";
import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/signUp.css"

const Register = () => {
    let [fullName, setFullName] = useState("");
    let [email, setEmail] = useState("");
    let [dob, setDob] = useState("");
    let [gender, setGender] = useState("");
    //   let [role, setRole] = useState("");
    let [password, setPassword] = useState("");

    let onSubmit = async (e) => {
        e.preventDefault();

        let data = {
            fullName: fullName,
            email: email,
            password: password,
            //   role: role,
            dob: dob,
            gender: gender,
        };
        try {
            data = { ...data, role: "admin" };
            // console.log(data);
            let result = await axios({
                url: "http://localhost:8000/api/auth/signup",
                method: "POST",
                data: data,
            });
            console.log(result.data.message);
            toast.success(
                "Mail has been sent to your email. Please verify your account by clicking the link on your mail"
            );
            setFullName("");
            setEmail("");
            setPassword("");
            setDob("");
            setGender("");

        } catch (error) {
            toast.error(error.response.data.message)

        }

    };


    let genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    return (
        <div className=".signup_container">
            <ToastContainer />
            <div className="signup_form_container">
                <div className="left">
                    <h1>Welcome Back</h1>
                    <NavLink to="/admin/login">
                        <button type="button" className="white_btn">
                            Sing in
                        </button>
                    </NavLink>
                </div>
                <div className="right">
                    <form className="form_container" onSubmit={onSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                            id="fullName"
                            className="input"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            id="email"
                            className="input" placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password} //abc
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id="password"
                            className="input"
                            placeholder="Password"
                        />
                        <input
                            type="date"
                            value={dob} //abc
                            onChange={(e) => {
                                setDob(e.target.value);
                            }}
                            id="dob"
                            className="input"
                            placeholder="DOB"
                        />
                        <div style={{ marginRight: "20px" }}>
                            <label style={{ marginRight: "20px" }}>Gender :</label>
                            {genders.map((item, i) => {
                                return (
                                    <>
                                        <label htmlFor={item.value}>{item.label}</label>
                                        <input
                                            type="radio"
                                            value={item.value}
                                            id={item.value}
                                            checked={gender === item.value}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                            }}
                                        ></input>
                                    </>
                                );
                            })}
                        </div>
                        <button type="submit" className="green_btn">
                            Sing Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default Register;