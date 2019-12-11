import ServicesList from "./ServicesList";
import React from "react";
import { connect } from "react-redux";
import {
    execService,
    getServices,
    setCurrentPage,
    setSelectedService,
    setMachines,
    setServiceMan
} from "../../app-data/ServiseListReducer";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {
    getAllServices,
    getIsFetching,
    getPage,
    getPageSize, 
    getSelectedService, 
    getTotalCount,
    getMachines,
    getServiceMan
} from "../../app-data/ServicesListSelectors";
import { withRouter } from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        services: getAllServices(state),
        selectedService: getSelectedService(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        page: getPage(state),
        isFetching: getIsFetching(state),
        machines: getMachines(state),
        serviceMan: getServiceMan(state)
    }
}

class ServicesListContainer extends React.Component {

    refreshPage() {
        // console.log('###', this.props.location);
        let page = new URLSearchParams(this.props.location.search).get('page');
        let machines = new URLSearchParams(this.props.location.search).get('machines');
        let serviceMan = new URLSearchParams(this.props.location.search).get('serviceMan');
        page && this.props.setCurrentPage(page);
        machines && this.props.setMachines(machines);
        serviceMan && this.props.setServiceMan(serviceMan);
        this.props.getServices(page, this.props.pageSize, machines, serviceMan);
    }

    componentDidMount() {
        this.refreshPage();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     let page = new URLSearchParams(this.props.location.search).get('page');
    //     let machines = new URLSearchParams(this.props.location.search).get('machines');
    //     let serviceMan = new URLSearchParams(this.props.location.search).get('serviceMan');

    //     if (page !== prevProps.page || machines !== prevProps.machines || serviceMan !== prevProps.serviceMan) {
    //         this.refreshPage();
    //     }
    // }

    onPageChanged = (pageNumber) => {
        if (pageNumber > 0 && pageNumber !== this.props.page) {
            this.props.setCurrentPage(pageNumber);
            this.props.getServices(pageNumber, this.props.pageSize, this.props.machines, this.props.serviceMan);
            let query = new URLSearchParams();
            query.append('page', pageNumber);
            this.props.machines && query.append('machines', this.props.machines);
            this.props.serviceMan && query.append('serviceMan', this.props.serviceMan);
            this.props.history.push('?' + query.toString());
        }
    }

    onExecButtonClick = values => {
        const dataForSend = {
            id: this.props.selectedService.id,
            ...values
        }
        this.props.execService(dataForSend);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> :
                    <ServicesList {...this.props} onPageChanged={this.onPageChanged} onExecButtonClick={this.onExecButtonClick} />}
            </>
        );
    }
}

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, { setCurrentPage, setMachines, setServiceMan, getServices, setSelectedService, execService })
)(ServicesListContainer)