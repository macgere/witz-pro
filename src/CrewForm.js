import React from "react";
import { Grid, Paper, TextField, Button} from "@mui/material";
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
            <Grid item container xs={2}>
                <h2>Add A New Contractor to your Rolodex:</h2>
                <Paper>Name:</Paper>
                <TextField variant="outlined" onChange={(e) => setName(e.target.value)}></TextField>
                <Paper>Role:</Paper>
                <TextField variant="outlined" onChange={(e) => setRole(e.target.value)}></TextField>
                <Paper>DayRate:</Paper>
                <TextField variant="outlined" type="number" onChange={(e) => setDayRate(e.target.value)}></TextField>
                <Button onClick={addCrewObject}>Submit</Button>
            </Grid>
    )
}