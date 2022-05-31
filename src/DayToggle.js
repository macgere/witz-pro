import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";

export const DayToggle = () => {

    const [day, setDay] = useState(1)

    const nextFunc = () => {
        setDay(day + 1)
    }

    const prevFunc = () => {
        if (day > 1) { setDay(day - 1) }
    }


    return (
        <>
        <Grid item container>
            <button onClick={prevFunc} id="previous"> Previous </button>
            <p>Look At Day:</p>
            <h2>{day}</h2>
            <button onClick={nextFunc} id="next"> Next </button>
        </Grid>
        <Grid item container xs={{ height: '75%' , width: '100%' }}>
                <Paper variant="outlined">
                    <h3>On Call Crew:</h3>
                </Paper>
            </Grid>
        </>
    )
}