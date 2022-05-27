const APIurl = "http://localhost:3000"

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