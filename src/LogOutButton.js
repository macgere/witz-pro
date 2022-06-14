import React from "react";
import { useNavigate } from "react-router-dom";



export const LogOutButton = ({setCurrentlyLoggedInUser}) => {

    let navigate = useNavigate()

    let logOut = () => {
        setCurrentlyLoggedInUser(0)
        navigate('/')
    }

    return (
        <div className="logOutBtn">
        <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default LogOutButton