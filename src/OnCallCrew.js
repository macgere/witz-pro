import React from "react"
import { Grid, Paper } from "@mui/material"

export const OnCallCrew = ({name, role, dayRate}) => {
    return (
        <>
            <Grid item>
                <Paper>{name}, {role}, ${dayRate} per day</Paper>
            </Grid>
        </>
    )
}