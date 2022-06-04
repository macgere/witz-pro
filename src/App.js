import './App.css';
import { CrewForm } from './CrewForm'
import React, { useEffect, useState } from 'react';
import { CrewRepo } from './CrewRepo';
import { Grid } from '@mui/material';
import { getCrewMembers, addCrewMember, deleteCrewMember } from './APICalls';
import { DayToggle } from './DayToggle';


function App() {
  const [crewList, setCrewList] = useState([])
  const [userId, setUserId] = useState(0)

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
      <CrewRepo name={name} role={role} dayRate={dayRate} onCall={onCall} id={id} userId={userId} deleteCrew={deleteCrew} />
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
            <DayToggle /> 
          </Grid>
        </header>
      </div>
    </>
  );
}

export default App;
