import React, {useEffect, useState} from 'react'
import {getIsVerified} from "../../DAL/auth/authApi"

const UserPage: React.FC = () => {

    const isVerified = useState(false);

    if (!isVerified) return <div>"Error! You don't have permission to this page!"</div>;

    return (
        <div>
            User page
        </div>
    )
}

export default UserPage;