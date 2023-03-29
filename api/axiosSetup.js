import axios from "axios";


export const axiosClient = axios.create({
    baseURL: 'https://api-smarthome.onrender.com/'
    // baseURL: 'http://10.0.2.2:3000/'
});

export const axiosAdafruit =axios.create({
    baseURL: 'https://io.adafruit.com/api/v2/leductai/feeds/',
})
