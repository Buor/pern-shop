import {useEffect, useState} from "react";
import {getIsVerified} from "../../DAL/auth/authApi";

type TVerified = "true" | "false" | "pending"

function useIsVerified() {
    const [isVerified,setIsVerified] = useState<TVerified>("pending");
    useEffect(() => {
        getIsVerified().then(res => {
            if (res) setIsVerified("true");
            else {
                setIsVerified("false")
            }
        })
    },[])
    return isVerified;
}

export default useIsVerified