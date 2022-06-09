import './App.css';
import { CrewForm } from './CrewForm'
import React, { useEffect, useState } from 'react';
import { CrewRepo } from './CrewRepo';
import { Grid } from '@mui/material';
import { getCrewMembers, addCrewMember, deleteCrewMember, addScheduledCrew, getScheduledCrew } from './APICalls';
import { DayToggle } from './DayToggle';


export const MainView = () => {
    const [crewList, setCrewList] = useState([])
    const [userId, setUserId] = useState(0)
    const [displayedDay, setDisplayedDay] = useState({}) 
    const [crewSchedule, setCrewSchedule] = useState([])
    
    const addScheduledCrewMember = (newCrewSchedule) => {
        addScheduledCrew(newCrewSchedule).then(() => {
           return getScheduledCrew(displayedDay.id)}).then(setCrewSchedule)
    }


    const getCrew = () => {
        getCrewMembers().then(setCrewList)
    }
    const addCrew = (crewMember) => {
        addCrewMember(crewMember).then(getCrew)
    }

    const deleteCrew = (id) => {
        deleteCrewMember(id).then(getCrew)
    }

    const crewMemberToCrewRepo = ({ name, role, dayRate, onCall, id, userId }) => {
        return (
            <CrewRepo name={name} role={role} dayRate={dayRate} onCall={onCall} id={id} userId={userId} deleteCrew={deleteCrew} displayedDay={displayedDay} addScheduledCrewMember={addScheduledCrewMember}/>
        )
    }

    useEffect(
        getCrew, []
    )

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Grid container spacing={1} row>
                        <CrewForm addCrew={addCrew} />
                        {crewList.map(crewMemberToCrewRepo)}
                        <DayToggle displayedDay={displayedDay} setDisplayedDay={setDisplayedDay} crewSchedule={crewSchedule}/>
                    </Grid>
                </header>
            </div>
        </>
    )
}