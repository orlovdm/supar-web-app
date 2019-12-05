import { ServiceAPI } from "../Api/api";


const SET_SERVICE = 'service/SET_SERVICE';
const SET_EXECUTIONS = 'service/SET_EXECUTIONS';
const SET_MEASUREMENTS = 'service/SET_MEASUREMENTS';
const SET_FETCHING = 'service/SET_FETCHING';
const SET_EDITMODE = 'service/SET_EDITMODE';

const initialState = {
    // service: { machine: {}, module: {}, element: {}, files: [], measurements: [{}] },
    // executions: [{ measurements: [{}] }],
    service: {},
    executions: [],
    measurementsLog: [],
    isFetching: false,
    editMode: false
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
                    // machine: { ...action.data.service.machine },
                    // module: { ...action.data.service.module },
                    // element: { ...action.data.service.element },
                    // measurements: [...action.data.service.measurements]
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
                measurementsLog: action.data.measurementsLog.map(m => ({...m, date: m.date.split('T')[0], ['P-' + m.point]: m.value})) //, ['P-' + m.point]: m.value
            }

        case SET_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }

        case SET_EDITMODE:
            return {
                ...state, editMode: action.editMode
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
export const toggleEditMode = editMode => ({ type: SET_EDITMODE, editMode })

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