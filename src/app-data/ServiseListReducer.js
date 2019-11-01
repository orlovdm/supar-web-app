import {ServicesListAPI} from "../Api/api";

/*const EXEC = 'EXEC';
const CHECK = 'CHECK';
const CHECK_ALL = 'CHECK_ALL';*/
const SET_SERVICES = 'SET_SERVICES';
const SET_SELECTED_SERVICE = 'SET_SELECTED_SERVICE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';


let initialState = {
    services: [],
    selectedService: null,
    page: 1,
    totalCount: 0,
    pageSize: 10,
/*    checkedAll: false,*/
    isFetching: false
}

const ServiceListReducer = (state = initialState, action) => {
    switch (action.type) {
        /*case CHECK:                     //TODO: Action not used
            return {
                ...state,
                services: state.services.map(s => {
                    if (s.id === action.serviceId) {
                        return {...s, checked: !s.checked}
                    }
                    return s;
                })
            };

        case CHECK_ALL:                 //TODO: Action not used
            return {
                ...state,
                checkedAll: !state.checkedAll,
                services: state.services.map(s => {
                    return {...s, checked: !state.checkedAll}
                })
            };*/

        /*case EXEC:
            debugger
            console.log(action.services)
            return {
                ...state,
            }*/

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
            };

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

        default: {
            return state;
        }
    }
}

/* ---Actions--- */
/*export const exec = (services) => ({type: EXEC, services});
export const check = (serviceId) => ({type: CHECK, serviceId});
export const checkAll = () => ({type: CHECK_ALL});*/
export const setServices = (services) => ({type: SET_SERVICES, services});
export const setSelectedService = (service) => ({type: SET_SELECTED_SERVICE, service});
export const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, totalCount: count});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const toggleFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});

/* ---Thunks--- */
export const getServices = (page, itemsCount) => {
    return async (dispatch) => {
        dispatch(toggleFetching(true));
        let data = await ServicesListAPI.getScheduledServices(page, itemsCount);
        dispatch(setServices(data.items));
        dispatch(setTotalCount(data.count));
        dispatch(toggleFetching(false));
    }
}

export const execService = (service) => {
    return async (dispatch) => {
        await ServicesListAPI.execService(service.id, '', '').then(response => {
            if (response.status === 204) {
                dispatch(getServices(1, 10));
            }
        })
    }
}

export default ServiceListReducer;