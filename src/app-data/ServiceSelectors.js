import {createSelector} from "reselect";

const getService = state => state.servicePage.service;
export const getServiceSelector = createSelector(getService, service => service);

const getExecutions = state => state.servicePage.executions;
export const getExecutionsSelector = createSelector(getExecutions, executions => executions);

const getMeasurementsLog = state => state.servicePage.measurementsLog;
export const getMeasurementsLogSelector = createSelector(getMeasurementsLog, measurementsLog => measurementsLog);

export const getIsFetchingSelector = state => state.servicePage.isFetching;
export const getEditModeSelector = state => state.servicePage.editMode;