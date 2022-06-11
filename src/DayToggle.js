import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { getCrewById, getScheduledCrew, getShootingDays, addShootingDay, updateShootingDay } from "./APICalls";
import { OnCallCrew } from "./OnCallCrew";
import { ProjectBudgetTicker } from "./ProjectBudgetTicker";

export const DayToggle = ({dayExpenditure, setDayExpenditure, displayedDay, setDisplayedDay, crewSchedule, userId, name, role, dayRate, id, deleteCrewSchedule, crewList}) => {

    const [day, setDay] = useState(1)
    const [date, setDate] = useState(new Date().toISOString().slice(0,10))
    const [shootingDays, setShootingDays] = useState([])

    const addNewShootingDay = () => {
        const userObject = {
            dayNumber: day + 1,
            date: "",
            userId: parseInt(userId)
        }
        addShootingDay(userObject)
        .then(() => getShootingDays(userId))
        .then(setShootingDays)
    }



    const nextFunc = () => {
        if (!shootingDays.find(shootingDay => shootingDay.dayNumber === day + 1)) {
            addNewShootingDay()
        } else {
            setDay(day + 1)
        }
    }

    const prevFunc = () => {
        if (day > 1) { setDay(day - 1) }
    }


    useEffect(
        () => {
            getShootingDays(userId)
            .then(data => {setShootingDays(data)})
        }, [day]
    )

    useEffect(
        () => {
            getShootingDays(userId)
            .then(data => {setShootingDays(data)})
        }, []
    )

    useEffect(
        () => {
            const currentShootingDay = shootingDays.find(shootingDay => shootingDay.dayNumber - 1 === day )
            if (currentShootingDay) {
            setDisplayedDay(currentShootingDay)}
        }, [day, shootingDays]
    )

        const onCallCrew = crewSchedule.filter(scheduleObject => {
            return scheduleObject.shootingDayId === displayedDay.id
        }).map(scheduleObject => {
            return crewList.find(crew => crew.id === scheduleObject.crewId)
        })

    const crewMemberToOnCallCrew = ({ name, role, dayRate, id }) => {
        const relevantCrewSchedule = crewSchedule.find(schedule => {
            return schedule.crewId === id && schedule.shootingDayId === displayedDay.id
        })
        return (
            relevantCrewSchedule?
          <OnCallCrew name={name} role={role} dayRate={dayRate} crewScheduleId={relevantCrewSchedule.id} deleteCrewSchedule={deleteCrewSchedule}/> : <></>
        )
      }

      const changeDate = (e) => {
            setDate(e.target.value)
      }

      const putDate = () => {
          const updatedShootingDay = {...displayedDay, date: date}
          updateShootingDay(updatedShootingDay)
          .then(() => getShootingDays(userId))
          .then(setShootingDays)
      }

    return (
        <>
            <ProjectBudgetTicker dayExpenditure={dayExpenditure}/> 
            <Grid item container>
                <button onClick={prevFunc} id="previous"> Previous Day </button>
                <Grid item>
                    <p>Look At Day:</p>
                    <h2>{day}</h2>
                    <p>on the date:</p>
                    <p>{displayedDay.date}</p>
                </Grid>
                <input type="date" value={date} onChange={changeDate}></input>
                <Button onClick={putDate}>Update Date</Button>
                <button onClick={nextFunc} id="next"> Next Day</button>
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