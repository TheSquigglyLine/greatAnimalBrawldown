import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/animals' 

const postAnimalChoice = (animal1, animal2, choice) => {
  const data = { animal1: animal1, animal2: animal2, choice: choice }
  const request = axios.post(`${baseUrl}/animal-choice`, data)
  return request.then(response => {
    return response.data
  })
}

const getAnimalChoices = () => {
  const request = axios.get(`${baseUrl}/new-animals`)
  return request.then(response => response.data)
}
const getAllAnimals = () => {
  const request = axios.get(`${baseUrl}/all-animals`)
  return request.then(response => response.data)
}

export default { postAnimalChoice, getAnimalChoices, getAllAnimals }