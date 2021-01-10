import configData from "./../config.json";
import { fetchWrapper } from './fetchWrapper.js';

const baseUrl = configData.SERVER_URL;

export const httpService = {
    getTrainingPlanByUniqueId,
    createTrainingPlan,
    getCoachById,
    addPlanToCoach,
    addWeekToPlan,
    updatePlan,
    validateCoach
};

function getTrainingPlanByUniqueId(id) {
    return fetchWrapper.get(`${baseUrl}plan/${id}`);
}

function getCoachById(id) {
    return fetchWrapper.get(`${baseUrl}coach/${id}`);
}

function createTrainingPlan() {
    return fetchWrapper.postNoBody(`${baseUrl}plan`);
}

function addPlanToCoach(id) {
    return fetchWrapper.putNoBody(`${baseUrl}coach/${id}/addPlan`);
}

function addWeekToPlan(id) {
    return fetchWrapper.putNoBody(`${baseUrl}plan/${id}/addWeek`);
}

function updatePlan(id, params) {
    return fetchWrapper.put(`${baseUrl}plan/${id}`, params);
}

function validateCoach(token) {
    return fetchWrapper.postNoStringify(`${baseUrl}coach/validate`, token);
}