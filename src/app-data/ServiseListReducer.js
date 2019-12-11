import { ServicesListAPI } from "../Api/api";

/*const EXEC = 'EXEC';
const CHECK = 'CHECK';
const CHECK_ALL = 'CHECK_ALL';*/
const SET_SERVICES = 'serviceList/SET_SERVICES';
const SET_SELECTED_SERVICE = 'serviceList/SET_SELECTED_SERVICE';
const SET_TOTAL_COUNT = 'serviceList/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'serviceList/SET_CURRENT_PAGE';
const TOGGLE_FETCHING = 'serviceList/TOGGLE_FETCHING';
const SET_MACHINES = 'serviceList/SET_MACHINES';
const SET_SERVICEMAN = 'serviceList/SET_SERVICEMAN';


let initialState = {
    services: [],
    selectedService: null,
    page: 1,
    totalCount: 0,
    pageSize: 10,
    /*    checkedAll: false,*/
    isFetching: false,
    machines: null,
    serviceMan: null
}

const ServiceListReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SELECTED_SERVICE:
            return {
                ...state,
                selectedService: action.service
            }

        case SET_SERVICES:
            return {
                ...state,
                services: action.services.map(s => {
                    return {
                        ...s,
                        element: s.element.name,
                        module: s.module.name,
                        machine: s.machine.name
                    }
                })
            }

        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            };

        case SET_CURRENT_PAGE:
            return {
                ...state, page: action.page
            };

        case TOGGLE_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        case SET_MACHINES:
            return {
                ...state, machines: action.machines
            }

        case SET_SERVICEMAN:
            return {
                ...state, serviceMan: action.serviceMan
            }

        default: {
            return state;
        }
    }
}

export default ServiceListReducer;

/* ---Actions--- */
export const setServices = services => ({ type: SET_SERVICES, services });
export const setSelectedService = service => ({ type: SET_SELECTED_SERVICE, service });
export const setTotalCount = count => ({ type: SET_TOTAL_COUNT, totalCount: count });
export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page });
export const toggleFetching = isFetching => ({ type: TOGGLE_FETCHING, isFetching });
export const setMachines = machines => ({ type: SET_MACHINES, machines });
export const setServiceMan = serviceMan => ({ type: SET_SERVICEMAN, serviceMan });

/* ---Thunks--- */
export const getServices = (page, itemsCount, machines, serviceMan) => {
    return async (dispatch) => {
        dispatch(toggleFetching(true));
        // debugger;
        let data = await ServicesListAPI.getScheduledServices(page, itemsCount, machines, serviceMan);
        dispatch(setServices(data.items));
        dispatch(setTotalCount(data.count));
        dispatch(toggleFetching(false));
    }
}

export const execService = (data) => {

    let _measurements = [];
    if (data.measurements) {

        let _mr = {
            MeasurementId: null,
            Point: null,
            Value: null
        }

        for (let i = 1; i < data.measurements.length; i++) {
            if (data.measurements[i]) {
                _mr.MeasurementId = i;
                for (let j = 1; j < data.measurements[i].length; j++) {
                    if (data.measurements[i][j]) {
                        _mr.Point = j;
                        _mr.Value = data.measurements[i][j];
                        _measurements.push({ ..._mr });
                    }
                }
            }
        }
        data.measurements = _measurements;
    }

    return async (dispatch) => {
        await ServicesListAPI.execService(data).then(response => {
            if (response.status === 204) {
                dispatch(getServices(1, 10));
            } else {
                console.warn('$$$ Some error: ', response)
            }
        })
    }
}