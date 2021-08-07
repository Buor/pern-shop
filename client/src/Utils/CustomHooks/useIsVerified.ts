import {useEffect, useState} from "react";
import {getIsVerified} from "../../DAL/auth/authApi";

type TVerified = "true" | "false" | "pending"

export default function() {
    const [isVerified,setIsVerified] = useState<TVerified>("pending");
    useEffect(() => {
        getIsVerified().then(res => {
            if (res) setIsVerified("true");
            else {
                setIsVerified("false")
                console.log("Error! Access denied!");
            }
        })
    },[])
    return isVerified;
}