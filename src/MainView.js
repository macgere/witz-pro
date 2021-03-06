import './App.css';
import { CrewForm } from './CrewForm'
import React, { useEffect, useState } from 'react';
import { CrewRepo } from './CrewRepo';
import { getCrewMembers, addCrewMember, deleteCrewMember, addScheduledCrew, getScheduledCrew, deleteScheduledCrewMemberFromDay } from './APICalls';
import { DayToggle } from './DayToggle';
import LogOutButton from './LogOutButton';


export const MainView = ({currentlyLoggedInUser, setCurrentlyLoggedInUser}) => {
    const [crewList, setCrewList] = useState([])
    const [displayedDay, setDisplayedDay] = useState({}) 
    const [crewSchedule, setCrewSchedule] = useState([])
    // const [projExpenditure, setProjExpenditure] = useState(0)

    const crewScheduleToCrewMember = (crewScheduleObj) => {
        return crewList.find(crew => (crewScheduleObj.crewId === crew.id))
    }

    const crewMemberToDayRate = ({dayRate}) => {
        return parseInt(dayRate)
    }

    const numberAndNumberToSum = (a, b) => {
        return a + b
    } 

    const crewSchedulesToTotalExpense = (crewScheduleArray) => {
        return crewScheduleArray
        .map(crewScheduleToCrewMember)
        .map(crewMemberToDayRate)
        .reduce(numberAndNumberToSum, 0)
    }

    const dayExpenditure = crewSchedulesToTotalExpense(crewSchedule.filter(scheduledDay => scheduledDay.shootingDayId === displayedDay.id))
    const totalProjExpenditure = crewSchedulesToTotalExpense(crewSchedule)

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
            <CrewRepo name={name} role={role} dayRate={dayRate} onCall={onCall} id={id} userId={userId} deleteCrew={deleteCrew} displayedDay={displayedDay} addScheduledCrewMember={addScheduledCrewMember}/>
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
                    <div className='mainView'>
                        <CrewForm addCrew={addCrew} />
                        <div className='crewRepoContainer'>
                            <div className='crewRepo'>
                            <h3>Rolodex:</h3>
                                {crewList.map(crewMemberToCrewRepo)}
                            </div>
                        </div>
                        <DayToggle dayExpenditure={dayExpenditure} projExpenditure={totalProjExpenditure} displayedDay={displayedDay} userId={currentlyLoggedInUser} setDisplayedDay={setDisplayedDay} crewList={crewList} crewSchedule={crewSchedule} deleteCrewSchedule={deleteCrewSchedule} />
                        <LogOutButton setCurrentlyLoggedInUser={setCurrentlyLoggedInUser} />
                    </div>
                </header>
            </div>
        </>
    )
}