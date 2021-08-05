import {useEffect, useState} from "react";
import {getIsVerified} from "../../DAL/auth/authApi";

export default function() {
    const [isVerified,setIsVerified] = useState(false);
    useEffect(() => {
        getIsVerified().then(res => {
            if (res) setIsVerified(true);
            else console.log("Error! Access denied!");
        })
    },[])

    return isVerified;
}