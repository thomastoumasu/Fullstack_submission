import axios from 'axios'
// const baseURL = 'api/persons' // for part 3 uncomment for production code
// const baseURL = 'http://localhost:3001/api/persons' // for part 3
const baseURL = 'http://localhost:3001/persons'

const getAll = () => { // return all objects from database
    return axios
      .get(baseURL)
      .then(response => response.data)
}

const addOne = (newObject)  => { // add one object to database and return it
  console.log(`posting new object to ${baseURL}`)
  return axios
    .post(`${baseURL}`, newObject)
    .then(response => {
      console.log('response from server, added was ', response.data) // should be the added object
      return response.data
    })
}

const deleteOne = (id) => { // delete one object from database and return it
  console.log(`deleting object at ${baseURL}/${id}`)
  return axios
    .delete(`${baseURL}/${id}`)
    .then(response => {
      console.log('response from server, deleted was ', response.data) // should be the deleted object
      return response.data
    })
}

const updateOne = (objectToUpdate) => { // update one object in database and return it
  console.log(`updating object at ${baseURL}/${objectToUpdate.id}`)
  return axios
    .put(`${baseURL}/${objectToUpdate.id}`, objectToUpdate)
    .then(response => {
      console.log('response from server, updated was ', response.data) // should be the updated object
      return response.data
    })
}

export default { getAll, addOne, deleteOne, updateOne }