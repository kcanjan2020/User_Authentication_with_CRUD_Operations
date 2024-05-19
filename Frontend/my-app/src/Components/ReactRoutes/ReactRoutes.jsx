import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import ForgotPassword from '../ForgotPassword';
import Login from '../Login';
import Logout from '../Logout';
import MyProfile from '../MyProfile';
import ReadAllUser from '../ReadAllUser';
import ReadSpecificUser from '../ReadSpecificUser';
import Register from '../Register';
import ResetPassword from '../ResetPassword';
import UpdatePassword from '../UpdatePassword';
import UpdateProfile from '../UpdateProfile';
import UpdateSpecificUser from '../UpdateSpecificUser';
import VerifyEmail from '../VerifyEmail';
import NavbarComponent from '../Navbar';
const ReactRoutes = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            {/* <MyLinks></MyLinks> */}
                            <NavbarComponent></NavbarComponent>
                            <Outlet></Outlet>
                            {/* <div>This is Footer</div> */}
                        </div>
                    }
                >
                    <Route index element={<Register></Register>}></Route>
                    <Route
                        path="verify-email"
                        element={<VerifyEmail></VerifyEmail>}
                    ></Route>
                    <Route path="reset-password" element={<ResetPassword></ResetPassword>}></Route>

                    <Route
                        path="admin"
                        element={
                            <div>
                                <Outlet></Outlet>
                            </div>
                        }
                    >
                        <Route index element={<div>admin dashboard</div>}></Route>
                        <Route path="register" element={<Register></Register>}></Route>
                        <Route path="login" element={<Login></Login>}></Route>
                        <Route path="profile" element={<MyProfile></MyProfile>}></Route>
                        <Route path="logout" element={<Logout></Logout>}></Route>
                        <Route path="update-profile" element={<UpdateProfile></UpdateProfile>}></Route>
                        <Route path="update-password" element={<UpdatePassword></UpdatePassword>}></Route>
                        <Route path="forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
                        <Route path="read-alluser" element={<ReadAllUser></ReadAllUser>}></Route>
                        <Route path=":id" element={<ReadSpecificUser></ReadSpecificUser>}></Route>
                        <Route path="update"
                            element={
                                <div>
                                    <Outlet></Outlet>
                                </div>}>
                            <Route path=":id" element={<UpdateSpecificUser></UpdateSpecificUser>}></Route>

                        </Route>
                    </Route>
                    <Route path="*" element={<div>404 page</div>}></Route>
                </Route>

            </Routes>
        </div>
    )
}

export default ReactRoutes