import './App.css';
import { CrewForm } from './CrewForm'
import React, { useEffect, useState } from 'react';
import { CrewRepo } from './CrewRepo';
import { Grid } from '@mui/material';
import { getCrewMembers, addCrewMember } from './APICalls';
import { DayToggle } from './DayToggle';


function App() {

  const [crewList, setCrewList] = useState([])

  const getCrew = () => {
    getCrewMembers().then(setCrewList)
  }
  const addCrew = (crewMember) => {
    addCrewMember(crewMember).then(getCrew)
  }
  const crewMemberToCrewRepo = ({ name, role, dayRate, onCall }) => {
    return (
      <CrewRepo name={name} role={role} dayRate={dayRate} onCall={onCall} />
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
