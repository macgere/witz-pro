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

export const getShootingDay = (id) => {
    return fetch(`${APIurl}/crewSchedule?shootingDayId=${id}`)
    .then(response => response.json())
  }

export const addShootingDay = (day) => {
    return fetch(`${APIurl}/shootingDay/${day}`, dataToPostOptions(day))
    .then(response => response.json())
}

export const getCrewById = (id) => {
  return fetch(`${APIurl}/crew/${id}`)
  .then(response => response.json())
}