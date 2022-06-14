const APIurl = "http://localhost:3000"

const dataToPostOptions = (data) => ({
    "method": "POST",
    "body": JSON.stringify(data),
    "headers": {"Content-Type": "application/json"}
})

const dataToPutOptions = (data) => ({
  "method": "PUT",
  "body": JSON.stringify(data),
  "headers": {"Content-Type": "application/json"}
})

export const updateProjectBudget = (budgetUpdate) => {
    return fetch(`${APIurl}/budgets/${budgetUpdate.id}`, dataToPostOptions(budgetUpdate))
    .then(response => response.json())
}

export const getBudgetsByUserId = (userId) => {
  return fetch(`${APIurl}/budgets/${userId}`)
  .then(response => response.json())
}

export const updateShootingDay = (updatedShootingDay) => {
    return fetch(`${APIurl}/shootingDay/${updatedShootingDay.id}`, dataToPutOptions(updatedShootingDay))
    .then(response => response.json())
}

export const getCrewMembers = () => {
    return fetch(`${APIurl}/crew`)
    .then(response => response.json())
  }

export const getUsers = () => {
  return fetch(`${APIurl}/users`)
  .then(response => response.json())
}

export const addCrewMember = (crewMember) => {
    return fetch(`${APIurl}/crew`, dataToPostOptions(crewMember))
    .then(response => response.json())
}

export const getScheduledCrew = () => {
    return fetch(`${APIurl}/crewSchedule`)
    .then(response => response.json())
  }

export const addScheduledCrew = (newCrewSchedule) => {
  return fetch(`${APIurl}/crewSchedule/`, dataToPostOptions(newCrewSchedule))
  .then(response => response.json())
}

export const addShootingDay = (day) => {
    return fetch(`${APIurl}/shootingDay/`, dataToPostOptions(day))
    .then(response => response.json())
}

export const getShootingDays = (userId) => {
  return fetch(`${APIurl}/shootingDay?userId=${userId}`)
  .then(response => response.json())
}

export const deleteCrewMember = (id) => {
  return fetch(`${APIurl}/crew/${id}`, 
  {"method": "DELETE"})
  .then(response => response.json())
}

export const deleteScheduledCrewMemberFromDay = (id) => {
  return fetch(`${APIurl}/crewSchedule/${id}`, 
  {"method": "DELETE"})
  .then(response => response.json())
}

export const getCrewById = (id) => {
  return fetch(`${APIurl}/crew/${id}`)
  .then(response => response.json())
}

export const getUserByEmail = (email) => {
  return fetch(`${APIurl}/users?email=${email}`)
  .then(response => response.json())
}

export const addUser = (name) => {
    return fetch(`${APIurl}/users`, dataToPostOptions(name))
    .then(response => response.json())
}