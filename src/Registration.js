import React from "react";
import { addUser } from "./APICalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    let navigate = useNavigate()
    const addNewUser = () => {
        const userObject = {
            name: name,
            email: email
        }
        addUser(userObject).then(()=>{navigate('/')})
    }

    return (
        <>
        <h2>Name:</h2>
        <input type="text" onChange={e => setName(e.target.value)}/>
        <br></br>
        <h2>Email:</h2>
        <input type="email" onChange={e => setEmail(e.target.value)}/>
        <h2>Do You Consent To Having Your Data Sold to the FBI?</h2>
        <input type="checkbox" />
        <button onClick={addNewUser}>Register User</button>
        </>
    )
}