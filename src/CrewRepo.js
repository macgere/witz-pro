import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { addScheduledCrew } from "./APICalls";



export const CrewRepo = ({dayExpenditure, setDayExpenditure, id, name, role, dayRate, onCall, deleteCrew, userId, displayedDay, addScheduledCrewMember}) => {

    const [onCallStatus, setOnCallStatus] = useState(onCall)

    const scheduleCrewMember = () => {
        if (onCallStatus === false) { 
            setOnCallStatus(true)
            setDayExpenditure(dayExpenditure + parseInt(dayRate))
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
            <Grid item xs={2}>
                <Paper>
                <p>{name}</p>
                <p>{role}</p>
                <p>{dayRate}</p>
                <button onClick={scheduleCrewMember}>Schedule Me</button>
                <button onClick={() => {deleteCrew(id)}}>X</button>
                </Paper>
            </Grid>
    )
}