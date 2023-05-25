import axios from 'axios'

export default axios.create({
    baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
    timeout: 20000,
    headers: {
        "Content-Type": 'application/json'
    }
})