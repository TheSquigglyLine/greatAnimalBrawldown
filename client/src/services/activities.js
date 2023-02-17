import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/activities' 

const getAllActivities = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getNewActivity = () => {
  const request = axios.get(`${baseUrl}/new`)
  return request.then(response => response.data)
}

const addActivity = activity => {
  const request = axios.post(baseUrl, activity)
  
  return request.then(response => {
    console.log('this got sent back from the backend', response)
    return response.data
  })
}

const deleteAllActivities = () => {
  const request = axios.get(`${baseUrl}/delete`)
  return request.then(response => response.data)
}

const postAnimalChoice = (animal1, animal2, choice) => {
  const data = { animal1: animal1, animal2: animal2, choice: choice }
  const request = axios.post(`${baseUrl}/animal-choice`, data)
  return request.then(response => {
    console.log('this got sent back from the backend', response)
    return response.data
  })
}

const getAnimalChoices = () => {
  const request = axios.get(`${baseUrl}/new-animals`)
  return request.then(response => console.log(response.data))
}

export default { getAllActivities, getNewActivity, addActivity, deleteAllActivities, postAnimalChoice, getAnimalChoices }