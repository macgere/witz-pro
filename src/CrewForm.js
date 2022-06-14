import React from "react";
import { useState } from "react";

export const CrewForm = ({addCrew, userId}) => {
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [dayRate, setDayRate] = useState(0)
    const [onCall, setOnCall] = useState(false)

    const addCrewObject = () => {
        const crewObject = {name, role, dayRate, onCall, userId}
        addCrew(crewObject)
    }

    return (
            <div className="crewFormContainer">
                <h3>Add A New Contractor to your Rolodex:</h3>
                <p>Name:</p>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
                <p>Role:</p>
                <input type="text" onChange={(e) => setRole(e.target.value)}></input>
                <p>DayRate:</p>
                <input type="number" onChange={(e) => setDayRate(e.target.value)}></input>
                <button onClick={addCrewObject}>Submit</button>
            </div>
    )
}