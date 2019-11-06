import ServicesList from "./ServicesList";
import React from "react";
import { connect } from "react-redux";
import {
    execService,
    getServices,
    setCurrentPage, setSelectedService,
} from "../../app-data/ServiseListReducer";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {
    getAllServices,
    /*    getCheckedAll,*/
    getIsFetching,
    getPage,
    getPageSize, getSelectedService, getTotalCount,
} from "../../app-data/ServicesListSelectors";
import {withRouter} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        services: getAllServices(state),
        selectedService: getSelectedService(state),
        /*        checkedAll: getCheckedAll(state),*/
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        page: getPage(state),
        isFetching: getIsFetching(state)
    }
}

class ServicesListContainer extends React.Component {

    componentDidMount() {
        
        debugger;
        let page = new URLSearchParams(this.props.location.search).get('page');
        if (page) {
            this.props.setCurrentPage(page);
        }
        this.props.getServices(this.props.page, this.props.pageSize);
        //TODO: Пересмотреть 59 и 80 урок!!!
    }

    onPageChanged = (pageNumber) => {
        if (pageNumber !== this.props.page) {
            this.props.setCurrentPage(pageNumber);
            this.props.getServices(pageNumber, this.props.pageSize);
            //window.history.pushState('page' + pageNumber, '', '?page=' + pageNumber);
            this.props.history.push('?page=' + pageNumber);
        }
    }

    onExecButtonClick = () => {
        this.props.execService(this.props.selectedService);
        //this.props.getServices(this.props.page, this.props.pageSize);
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
    connect(mapStateToProps, { setCurrentPage, getServices, setSelectedService, execService })
)(ServicesListContainer)