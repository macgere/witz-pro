import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";


export const CrewRepo = ({name, role, dayRate, onCall}) => {

    const [onCallStatus, setOnCallStatus] = useState(onCall)

    const scheduleCrewMember = () => {
        if (onCallStatus === false) { setOnCallStatus(true)}
    }

    return (
            <Grid item xs={2}>
                <Paper>
                <p>{name}</p>
                <p>{role}</p>
                <p>{dayRate}</p>
                <button onClick={scheduleCrewMember}>Schedule Me</button>
                </Paper>
            </Grid>
    )
}