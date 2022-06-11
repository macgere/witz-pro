import './App.css';
import { CrewForm } from './CrewForm'
import React, { useEffect, useState } from 'react';
import { CrewRepo } from './CrewRepo';
import { Grid } from '@mui/material';
import { updateProjectBudget, getCrewMembers, addCrewMember, deleteCrewMember, addScheduledCrew, getScheduledCrew, deleteScheduledCrewMemberFromDay, getBudgetsByUserId } from './APICalls';
import { DayToggle } from './DayToggle';
import LogOutButton from './LogOutButton';


export const MainView = ({currentlyLoggedInUser, setCurrentlyLoggedInUser}) => {
    const [crewList, setCrewList] = useState([])
    const [displayedDay, setDisplayedDay] = useState({}) 
    const [crewSchedule, setCrewSchedule] = useState([])
    const [projExpenditure, setProjExpenditure] = useState(0)

    const totalProjExpenditure = crewSchedule.reduce((acc, curr) => {
        const crewMember = crewList.find(crew => (crew.id === curr.crewId))
        if (crewMember) return acc + parseInt(crewMember.dayRate)
        return acc
    }, 0)

    const addScheduledCrewMember = (newCrewSchedule) => {
        addScheduledCrew(newCrewSchedule).then(() => {
           return getScheduledCrew(displayedDay.id)})
           .then(setCrewSchedule)
    }

    const deleteCrewSchedule = (id) => {
        return deleteScheduledCrewMemberFromDay(id)
        .then(getCrewSchedule)
    }


    const getCrew = () => {
       return getCrewMembers().then(setCrewList)
    }
    const addCrew = (crewMember) => {
        addCrewMember(crewMember)
        .then(getCrew)
    }

    const getCrewSchedule = () => {
       return getScheduledCrew(displayedDay.id)
        .then(setCrewSchedule)
    }

    const deleteCrew = async(id) => {
        const schedulesToDelete = crewSchedule
        .filter(schedule => schedule.crewId === id)
        .map(schedule => schedule.id)
        await Promise.all(schedulesToDelete
            .map(id => deleteScheduledCrewMemberFromDay(id)))
            const scheduledCrew = await getScheduledCrew(displayedDay.id)
            setCrewSchedule(scheduledCrew)
            await deleteCrewMember(id)
            getCrew()
    }

    const crewMemberToCrewRepo = ({ name, role, dayRate, onCall, id, userId }) => {
        return (
            <CrewRepo projExpenditure={projExpenditure} setProjExpenditure={setProjExpenditure} name={name} role={role} dayRate={dayRate} onCall={onCall} id={id} userId={userId} deleteCrew={deleteCrew} displayedDay={displayedDay} addScheduledCrewMember={addScheduledCrewMember}/>
        )
    }


    useEffect(
        () => {
        getCrew()}, []
    )

    useEffect(
        () => {
        getCrewSchedule()}, [displayedDay]
    )

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Grid container spacing={1} row>
                        <CrewForm addCrew={addCrew} />
                        {crewList.map(crewMemberToCrewRepo)}
                        <DayToggle projExpenditure={totalProjExpenditure} setProjExpenditure={setProjExpenditure} displayedDay={displayedDay} userId={currentlyLoggedInUser} setDisplayedDay={setDisplayedDay} crewList={crewList} crewSchedule={crewSchedule} deleteCrewSchedule={deleteCrewSchedule}/>
                        <LogOutButton setCurrentlyLoggedInUser={setCurrentlyLoggedInUser}/> 
                    </Grid>
                </header>
            </div>
        </>
    )
}