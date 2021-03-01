import configData from "./../config.json";
import { fetchWrapper } from './fetchWrapper.js';

const baseUrl = configData.SERVER_URL;

export const httpService = {
    getTrainingPlanByUniqueId,
    createTrainingPlan,
    getUserById,
    addPlanToUser,
    addWeekToPlan,
    updatePlan,
    validateUser
};

function getTrainingPlanByUniqueId(id) {
    return fetchWrapper.get(`${baseUrl}plan/${id}`);
}

function getUserById(id) {
    return fetchWrapper.get(`${baseUrl}user/${id}`);
}

function createTrainingPlan() {
    return fetchWrapper.postNoBody(`${baseUrl}plan`);
}

function addPlanToUser(id) {
    return fetchWrapper.putNoBody(`${baseUrl}user/${id}/addPlan`);
}

function addWeekToPlan(id) {
    return fetchWrapper.putNoBody(`${baseUrl}plan/${id}/addWeek`);
}

function updatePlan(id, params) {
    return fetchWrapper.put(`${baseUrl}plan/${id}`, params);
}

function validateUser(token) {
    return fetchWrapper.postNoStringify(`${baseUrl}user/validate`, token);
}