import React, { useState } from 'react'

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