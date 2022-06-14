import React from "react"


export const OnCallCrew = ({name, role, dayRate, crewScheduleId, deleteCrewSchedule}) => {
    return (
        <>
                <div className="onCallCrewCard">
                    <p>{name}, {role}, ${dayRate} per day</p>
                    <button onClick={() => (deleteCrewSchedule(crewScheduleId))}>Remove</button>
                </div>
        </>
    )
}