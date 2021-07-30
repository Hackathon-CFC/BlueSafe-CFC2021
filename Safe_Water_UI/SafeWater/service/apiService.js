import { AuthContext } from "../App";
import React from 'react';

const ENDPOINTS = {
    register: 'users/signup',
    getToken: 'users/login',
    addSpot: 'spots/add',
    getSpot: 'spots',
    updateSpot: 'admin/updateSpotState/',
    sendOtp: 'auth/sendOtp',
    validateOtp: 'auth/validateOtp',
    addFeedback: 'spots/update',
    addComplaint: 'complaints/add',
    complaints: 'complaints'
}
const BASE_URL =  'http://169.51.206.234:31111/';

let token  = null;

const setToken  = (newToken) => {
    token = newToken;
}


const useAPI = () => {
    const { dispatch } = React.useContext(AuthContext);

    const postRequest = async(url, data, image) => {
        const headers = {};
        if(image) {
            // headers['Content-Type'] = 'multipart/form-data';
        } else{
            headers['Content-Type'] = 'application/json';
        }
        if(!token) {
            const response  = await fetch(`${BASE_URL}${ENDPOINTS.getToken}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers,
                creadentials: 'same-origin'
            })
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const result = await response.json();
            dispatch({
                type: "TOKEN",
                token: result.token
            })
            setToken(result.token);
        }
        headers['Authorization'] = 'bearer ' + token;
        const body = image ? data: JSON.stringify(data);
        const response = await  fetch(`${BASE_URL}${url}`, {
            method: "POST",
            body,
            headers,
            creadentials: 'same-origin'
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const result = await response.json();
        return result;
    }

    const putRequest = async(url, data, id) => {
        const headers = {};
        headers['Content-Type'] = 'application/json';
        if(!token) {
            const response  = await fetch(`${BASE_URL}${ENDPOINTS.getToken}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers,
                creadentials: 'same-origin'
            })
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const result = await response.json();
            dispatch({
                type: "TOKEN",
                token: result.token
            })
            setToken(result.token);
        }
        headers['Authorization'] = 'bearer ' + token;
        const response = await  fetch(`${BASE_URL}${url}${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers,
            creadentials: 'same-origin'
        })

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const result = await response.json();
        return result;
    }
 
    return { postRequest, putRequest, ENDPOINTS , BASE_URL};
}

export default useAPI;