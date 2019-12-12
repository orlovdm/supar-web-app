import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
    getServiceSelector,
    getExecutionsSelector,
    getIsFetchingSelector,
    getServiceEditModeSelector,
    getMeasurementsLogSelector,
    getMeasurementsEditModeSelector
} from "./../../app-data/ServiceSelectors";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "./../../HOC/withAuthRedirect";
import { 
    getServiceData, 
    toggleServiceEditMode, 
    toggleMeasurementsEditMode 
} from "./../../app-data/ServiceReducer"
import Service from "./Service";
import Preloader from "../common/Preloader/Preloader";

let mapStateToProps = state => {
    return {
        service: getServiceSelector(state),
        executions: getExecutionsSelector(state),
        measurementsLog: getMeasurementsLogSelector(state),
        isFetching: getIsFetchingSelector(state),
        serviceEditMode: getServiceEditModeSelector(state),
        measurementsEditMode: getMeasurementsEditModeSelector(state),
        isAdmin: state.auth.isAdmin,
    }
}

class ServiceContainer extends React.Component {

    getServicePage() {
        let id = this.props.match.params.id;
        this.props.getServiceData(id);
    }

    componentDidMount() {
        this.getServicePage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getServicePage();
        }
    }

    handleEditServiceButtonClick = () => { this.props.toggleServiceEditMode(true) };

    render() {
        return (
            <>
                {
                    (this.props.isFetching || !this.props.service.id)
                        ? <Preloader />
                        : <Service {...this.props} onServiceEditButtonClick={this.handleEditServiceButtonClick} />
                }
            </>
        )
    }
}

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, { getServiceData, toggleServiceEditMode, toggleMeasurementsEditMode })
)(ServiceContainer)