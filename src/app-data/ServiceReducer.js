import { ServiceAPI } from "../Api/api";


const SET_SERVICE = 'service/SET_SERVICE';
const SET_EXECUTIONS = 'service/SET_EXECUTIONS';
const SET_MEASUREMENTS = 'service/SET_MEASUREMENTS';
const SET_FETCHING = 'service/SET_FETCHING';
const SET_SERVICE_EDITMODE = 'service/SET_SERVICE_EDITMODE';
const SET_MEASUREMENTS_EDITMODE = 'service/SET_MEASUREMENTS_EDITMODE';

const initialState = {
    service: {},
    executions: [],
    measurementsLog: [],
    isFetching: false,
    serviceEditMode: false,
    measurementsEditMode: false,
}

const ServiceReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case SET_SERVICE:
            return {
                ...state,
                service: {
                    ...action.data.service,
                    lastDate: action.data.service.lastDate ? action.data.service.lastDate.split('T')[0] : null,
                    nextDate: action.data.service.nextDate ? action.data.service.nextDate.split('T')[0] : null,
                }
            }

        case SET_EXECUTIONS:
            return {
                ...state,
                executions: action.data.executions.map(ex => ({...ex, date: ex.date.split('T')[0]}))
            }

        case SET_MEASUREMENTS:
            return {
                ...state,
                measurementsLog: action.data.measurementsLog.map(m => ({...m, date: m.date.split('T')[0]})) //, ['P-' + m.point]: m.value
            }

        case SET_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }

        case SET_SERVICE_EDITMODE:
            return {
                ...state, serviceEditMode: action.editMode
            }

        case SET_MEASUREMENTS_EDITMODE:
            return {
                ...state, measurementsEditMode: action.editMode
            }

        default: return state;
    }
}

export default ServiceReducer;

/* ---Actions--- */
export const setService = data => ({ type: SET_SERVICE, data })
export const setExecutions = data => ({ type: SET_EXECUTIONS, data })
export const setMeasurements = data => ({ type: SET_MEASUREMENTS, data })
export const toggleFetching = isFetching => ({ type: SET_FETCHING, isFetching })
export const toggleServiceEditMode = editMode => ({ type: SET_SERVICE_EDITMODE, editMode })
export const toggleMeasurementsEditMode = editMode => ({ type: SET_MEASUREMENTS_EDITMODE, editMode })

export const getServiceData = id => {
    return async dispatch => {
        dispatch(toggleFetching(true));
        await ServiceAPI.getServise(id).then(response => {
            if (response.status === 200) {
                dispatch(setService(response.data))
                dispatch(setExecutions(response.data))
                dispatch(setMeasurements(response.data))
            } else {
                console.warn(`${response.status} - ${response.statusText}`)
            }
        })
        dispatch(toggleFetching(false));
    }
}