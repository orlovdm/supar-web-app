import ServicesList from "./ServicesList";
import React from "react";
import {connect} from "react-redux";
import {
    execService,
    getServices,
    setCurrentPage, setSelectedService,
} from "../../app-data/ServiseListReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {
    getAllServices,
    /*    getCheckedAll,*/
    getIsFetching,
    getPage,
    getPageSize, getSelectedService, getTotalCount,
} from "../../app-data/ServicesListSelectors";

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
        this.props.getServices(this.props.page, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        if (pageNumber !== this.props.page) {
            this.props.setCurrentPage(pageNumber);
            this.props.getServices(pageNumber, this.props.pageSize);
        }
    }

    onExecButtonClick = () => {
        this.props.execService(this.props.selectedService);
        //this.props.getServices(this.props.page, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> :
                    <ServicesList {...this.props} onPageChanged={this.onPageChanged} onExecButtonClick={this.onExecButtonClick}/>}
            </>
        );
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {/*exec, check, checkAll, */ setCurrentPage, getServices, setSelectedService, execService})
)(ServicesListContainer)