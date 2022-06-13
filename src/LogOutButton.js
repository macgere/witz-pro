import { Button } from "@mui/material";
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
        <Button onClick={logOut}>Log Out</Button>
        </div>
    )
}

export default LogOutButton