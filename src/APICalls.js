const APIurl = "http://localhost:8088"

const dataToPostOptions = (data) => ({
    "method": "POST",
    "body": JSON.stringify(data),
    "headers": {"Content-Type": "application/json"}
})

export const getCrewMembers = () => {
    return fetch(`${APIurl}/crew`)
    .then(response => response.json())
  }

export const addCrewMember = (crewMember) => {
    return fetch(`${APIurl}/crew`, dataToPostOptions(crewMember))
    .then(response => response.json())
}

export const getScheduledCrew = (dayId) => {
    return fetch(`${APIurl}/crewSchedule?shootingDayId=${dayId}`)
    .then(response => response.json())
  }

export const addScheduledCrew = (id) => {
  return fetch(`${APIurl}/crewSchedule?crewId=${id}`, dataToPostOptions(id))
  .then(response => response.json())
}

export const addShootingDay = (day) => {
    return fetch(`${APIurl}/shootingDay/${day}`, dataToPostOptions(day))
    .then(response => response.json())
}

export const getShootingDay = (userId) => {
  return fetch(`${APIurl}/shootingDay?userId=${userId}`)
  .then(response => response.json())
}

export const deleteCrewMember = (id) => {
  return fetch(`${APIurl}/crew/${id}`, 
  {"method": "DELETE"})
  .then(response => response.json())
}

export const getCrewById = (id) => {
  return fetch(`${APIurl}/crew/${id}`)
  .then(response => response.json())
}

export const addUser = (name) => {
    return fetch(`${APIurl}/users`, dataToPostOptions(name))
    .then(response => response.json())
}