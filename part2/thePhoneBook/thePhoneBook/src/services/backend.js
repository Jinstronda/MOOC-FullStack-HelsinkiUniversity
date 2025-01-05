import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request =  axios.get(baseUrl) // Cria o objeto promise
    return request.then(response => response.data) // Retorna apenas a parte que precismamos que são os dados

}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    console.log("New object being sent:", newObject);
    console.log("Backend response:", request);
    return request.then(response=>response.data)
}

const update = (id, updatedObject) => {
    console.log("backend id received", id)
    const request = axios.put(`${baseUrl}/${id}`, updatedObject);
    return request.then((response) => response.data);
  };
  
  

const remove = (id) => {
    console.log(id)
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
  };


export default { // Retorna um objeto com todas essas funções
    getAll,
    create,
    update,
    remove
}
