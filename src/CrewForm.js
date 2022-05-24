import React from "react";
import { Grid, Paper, TextField, Button} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/material";

export const CrewForm = () => {
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [dayRate, setDayRate] = useState(0)

    return (
        <>
        <Grid container spacing={2} columnSpacing={1}>
            <Grid item xs={12} md={6}>
                <Paper>Add a New Crew Member:</Paper>
                <Paper>Name:</Paper>
                <TextField variant="outlined"></TextField>
                <Paper>Role:</Paper>
                <TextField variant="outlined"></TextField>
                <Paper>DayRate:</Paper>
                <TextField variant="outlined" type="number"></TextField>
                <Button>Submit</Button>
            </Grid>
        </Grid>
        </>
    )
}