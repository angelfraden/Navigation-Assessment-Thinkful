const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

async function index() {
  try {
    const response = await axios.get(`${BASE_URL}/constellations`);
    console.log(response.data); // Logs the list of constellations
    return response.data; 
  } catch (error) {
    console.error("return failed", error.message);
    throw error; // Make sure to throw the error to handle it properly elsewhere if needed
  }
}

function create(body) {
  return axios
  .post(`${BASE_URL}/constellations`, body)
  .then(({data}) => {
    console.log(data)
    return data; 
  })
  .catch(({message}) => {
    console.error(message);
  });
}

function show(id) {
return axios
.get(`${BASE_URL}/constellations/${id}`)
.then (({data}) => {
  console.log(data)
  return data;
})
.catch(({message}) => {
  console.error(message);
});
}  

function update(id, body) {
  return axios
  .put(`${BASE_URL}/constellations/${id}`, body)
  .then(({data}) => {
    console.log(data);
  })  
  .catch(({message}) => {
    console.error(message);
  })
}

function destroy(id) {
  return axios
  .delete(`${BASE_URL}/constellations/${id}`)
  .then(({data}) => {
console.log(data) ;
  })
  .catch(({message}) => {
    console.error(message);
  })
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
