import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getServiceSelector, getExecutionsSelector, getIsFetchingSelector, getEditModeSelector, getMeasurementsLogSelector } from "./../../app-data/ServiceSelectors";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "./../../HOC/withAuthRedirect";
import { getServiceData } from "./../../app-data/ServiceReducer"
import Service from "./Service";
import Preloader from "../common/Preloader/Preloader";

let mapStateToProps = state => {
    return {
        service: getServiceSelector(state),
        executions: getExecutionsSelector(state),
        measurementsLog: getMeasurementsLogSelector(state),
        isFetching: getIsFetchingSelector(state),
        editMode: getEditModeSelector(state)
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

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : <Service {...this.props} />}
            </>
        )
    }
}

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, { getServiceData })
)(ServiceContainer)