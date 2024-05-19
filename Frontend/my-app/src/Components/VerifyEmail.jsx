import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    let [query] = useSearchParams();
    let token = query.get("token");
    let navigate = useNavigate();
    let verify = async () => {
        try {
            let result = await axios({
                url: "http://localhost:8000/api/auth/verify-email",
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(result.data.message)
            navigate(`/admin/login`);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        verify();
    }, []);
    return <div>VerifyEmail</div>;
};

export default VerifyEmail;
