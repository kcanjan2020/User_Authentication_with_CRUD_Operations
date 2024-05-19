import React from 'react'
import { NavLink } from 'react-router-dom'

const MyLinks = () => {
    return (
        <div>
            <NavLink
                to="http://localhost:3000/admin/register"
                style={{ marginRight: "20px" }}
            >
                Register
            </NavLink>


            <NavLink
                to="http://localhost:3000/admin/login"
            >
                Login
            </NavLink>


            <NavLink
                to="http://localhost:3000/admin/profile"
                style={{ marginRight: "20px" }}
            >
                My Profile
            </NavLink>


            <NavLink
                to="http://localhost:3000/admin/update-password"
                style={{ marginRight: "20px" }}
            >
                Update Password
            </NavLink>


            <NavLink
                to="http://localhost:3000/admin/read-alluser"
                style={{ marginRight: "20px" }}
            >
                Read All User
            </NavLink>


            <NavLink
                to="http://localhost:3000/admin/logout"
                style={{ marginRight: "20px" }}
            >
                Logout
            </NavLink>

        </div>
    )
}
export default MyLinks