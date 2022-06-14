import React, { useEffect, useState } from "react";




export const CrewRepo = ({ id, name, role, dayRate, onCall, deleteCrew, userId, displayedDay, addScheduledCrewMember}) => {

    const [onCallStatus, setOnCallStatus] = useState(onCall)

    const scheduleCrewMember = () => {
        if (onCallStatus === false) { 
            setOnCallStatus(true)
        }
        if (onCallStatus === true) { setOnCallStatus(false)}
    }

    useEffect(
        () => {
            if (onCallStatus === true) {
                const newCrewSchedule = {
                    crewId: id,
                    shootingDayId: displayedDay.id
                }

            addScheduledCrewMember(newCrewSchedule)
        }
        }, [onCallStatus]
    )

    return (
            <div className="crewRepoCard">
                <p>{name}</p>
                <p>{role}</p>
                <p>${dayRate}.00</p>
                <button onClick={scheduleCrewMember}>Schedule Me</button>
                <button onClick={() => { deleteCrew(id) }}>X</button>
            </div>
    )
}