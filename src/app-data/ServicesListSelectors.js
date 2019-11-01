import {createSelector} from "reselect";

const getServices = (state) => {
    return state.serviceListPage.services;
}

export const getAllServices = createSelector(getServices, (services) => services); // Так не будет запускаться mapStateToProps если не изменился state.serviceListPage.services;

export const getSelectedService = (state) => {
    return state.serviceListPage.selectedService;
}

/*export const getCheckedAll = (state) => {
    return state.serviceListPage.checkedAll;
}*/

export const getTotalCount = (state) => {
    return state.serviceListPage.totalCount;
}

export const getPageSize = (state) => {
    return state.serviceListPage.pageSize;
}

export const getPage = (state) => {
    return state.serviceListPage.page;
}

export const getIsFetching = (state) => {
    return state.serviceListPage.isFetching;
}
