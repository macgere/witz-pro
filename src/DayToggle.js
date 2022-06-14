import React, { useEffect, useState } from "react";
import { getShootingDays, addShootingDay, updateShootingDay } from "./APICalls";
import { OnCallCrew } from "./OnCallCrew";
import { ProjectBudgetTicker } from "./ProjectBudgetTicker";

export const DayToggle = ({dayExpenditure, projExpenditure, displayedDay, setDisplayedDay, crewSchedule, userId, name, role, dayRate, id, deleteCrewSchedule, crewList}) => {

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
            <div className="onCallCrewContainer">
                <h3>On Call Crew:</h3>
                <div>{onCallCrew.map(crewMemberToOnCallCrew)}</div>
            </div>
            <div className="dayToggleContainer">
                <button onClick={prevFunc} id="previous"> Previous Day </button>
                <div className="dayToggleMessage">
                    <p>Currently Viewing Day:</p>
                    <h3>{day}</h3>
                    <p>Scheduled for:</p>
                    <p>{displayedDay.date}</p>
                </div>
                <button onClick={putDate}>Update Date</button>
                <input type="date" value={date} onChange={changeDate}></input>
                <button onClick={nextFunc} id="next"> Next Day</button>
                <ProjectBudgetTicker projExpenditure={projExpenditure} dayExpenditure={dayExpenditure} />
            </div>

        </>
    )
}