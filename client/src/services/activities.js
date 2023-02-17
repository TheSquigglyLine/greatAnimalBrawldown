import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/activities' 

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
  console.log(request.response)
  return request.then(response => response.data)
}

export default { postAnimalChoice, getAnimalChoices }