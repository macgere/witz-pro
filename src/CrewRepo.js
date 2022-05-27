import React from "react";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";


export const CrewRepo = ({name, role, dayRate, onCall}) => {

    return (
            <Grid item xs={2}>
                <Paper>
                <p>{name}</p>
                <p>{role}</p>
                <p>{dayRate}</p>
                <button>Schedule Me</button>
                </Paper>
            </Grid>
    )
}