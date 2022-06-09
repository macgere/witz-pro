import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { getCrewById, getScheduledCrew, getShootingDay, addShootingDay } from "./APICalls";
import { OnCallCrew } from "./OnCallCrew";

export const DayToggle = ({displayedDay, setDisplayedDay, crewSchedule}) => {

    const [day, setDay] = useState(1)
    const [onCallCrew, setOnCallCrew] = useState([])
    const [date, setDate] = useState(Date)
    const [shootingDays, setShootingDays] = useState([])
      

    const nextFunc = () => {
        setDay(day + 1)
        if (displayedDay === null) {
            addShootingDay(day)
        }
    }

    const prevFunc = () => {
        if (day > 1) { setDay(day - 1) }
    }

    // useEffect(
    //     () => {
    //         getScheduledCrew(day).then((data) => {setCrewSchedule(data)})
    //     },
    //     [day]
    // )

    useEffect(
        () => {
            Promise.all(crewSchedule.map(({crewId}) => {
                return getCrewById(crewId)
            })).then(setOnCallCrew)
        }, 
        [crewSchedule]
    )

    useEffect(
        () => {
            getShootingDay(day)
            .then(data => {setShootingDays(data)})
        }, [day]
    )

    useEffect(
        () => {
            if (shootingDays[0]) {
            setDisplayedDay(shootingDays[0])}
        }, [shootingDays]
    )

    const crewMemberToOnCallCrew = ({ name, role, dayRate }) => {
        return (
          <OnCallCrew name={name} role={role} dayRate={dayRate} />
        )
      }

    return (
        <>
            <Grid item container>
                <button onClick={prevFunc} id="previous"> Previous </button>
                <p>Look At Day:</p>
                <h2>{displayedDay.id}</h2>
                <input type="date" onChange={e => setDate(e.target.valueAsNumber)}></input>
                <button onClick={nextFunc} id="next"> Next </button>
            </Grid>
            <Grid item container xs={{ height: '75%', width: '100%' }}>
                <Paper variant="outlined">
                    <h3>On Call Crew:</h3>
                    <div>{onCallCrew.map(crewMemberToOnCallCrew)}</div>
                </Paper>
            </Grid>
        </>
    )
}