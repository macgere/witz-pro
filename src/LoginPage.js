import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByEmail } from "./APICalls";

export const LoginPage = ({setCurrentlyLoggedInUser}) => {

    const [userEmail, setUserEmail] = useState(0)
    const [linkAddress, setLinkAddress] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
 
    useEffect(
        () => {
            getUserByEmail(userEmail).then((data) => {
                    if (data.length > 0) {
                        setCurrentlyLoggedInUser(userEmail)
                        setLinkAddress('/home')

                    } else {
                        setErrorMessage('Sorry, There is No User With These Credentials')
                    }
                }
            )
        }, [userEmail]
    )

    return (
        <>
            <h1>Witz Pro - Unit Production Management Suite</h1>
            <h3>Username:</h3>
            <input type="text"></input>
            <h3>User Email:</h3>
            <input type="text" onBlur={(e) => setUserEmail(e.target.value)}></input>
            <Link to={linkAddress}>Enter</Link>
            <br></br>
            <h3>{errorMessage}</h3>
            <Link to='/register'>Not Yet a User? Click Here You Idiot</Link>
        </>
    )
}

export default LoginPage