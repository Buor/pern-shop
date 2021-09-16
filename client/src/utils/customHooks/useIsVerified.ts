import {useEffect, useState} from "react";
import { AuthAPI } from '../../serverApi/auth/authApi'

type TVerified = "true" | "false" | "pending"

function useIsVerified() {
    const [isVerified,setIsVerified] = useState<TVerified>("pending");
    useEffect(() => {
        AuthAPI.getIsVerified().then(res => {
            if (res) setIsVerified("true");
            else {
                setIsVerified("false")
            }
        })
    },[])
    return isVerified;
}

export default useIsVerified