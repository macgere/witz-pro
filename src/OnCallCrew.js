import React from "react"
import { Grid, Paper } from "@mui/material"
import { deleteScheduledCrewMemberFromDay } from "./APICalls"

export const OnCallCrew = ({name, role, dayRate, id, crewScheduleId, deleteCrewSchedule}) => {
    return (
        <>
            <Grid item>
                <Paper>
                    {name}, {role}, ${dayRate} per day
                    <button onClick={() => (deleteCrewSchedule(crewScheduleId))}>Remove</button>
                </Paper>
            </Grid>
        </>
    )
}