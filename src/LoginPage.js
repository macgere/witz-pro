import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {

    const [userId, setUserId] = useState(0)
    const [linkAddress, setLinkAddress] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
 
    useEffect(
        () => {
            if (userId === 1) {
                setLinkAddress('/home')
            }
            if (userId > 1) {
                setErrorMessage('Sorry, There is No User With These Credentials')
            } else {
                setErrorMessage('')
            }
        }, [userId]
    )


    return (
        <>
            <h1>Witz Pro - Unit Production Management Suite</h1>
            <h3>Username:</h3>
            <input type="text"></input>
            <h3>User ID:</h3>
            <input type="number" onChange={(e) => setUserId(e.target.valueAsNumber)}></input>
            <Link to={linkAddress}>Enter</Link>
            <br></br>
            <h3>{errorMessage}</h3>
            <Link to='/register'>Not Yet a User? Click Here You Idiot</Link>
        </>
    )
}

export default LoginPage