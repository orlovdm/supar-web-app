import React, { Component } from 'react';
import './App.css';
import '@storaensods/seeds-core/dist/css/styles.css';
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import ServicesListContainer from "./components/ServicesList/ServicesListContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { NotAuthorized, NotFound } from "./components/common/Error/NotAuthorized";
import { Footer } from '@storaensods/seeds-react';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initApp } from "./app-data/AppReducer";
import store from "./app-data/store";
import AdministrationContainer from "./components/Administration/AdministrationContainer";
import ServiceContainer from './components/Service/ServiceContainer';

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized,
    isAdmin: state.auth.isAdmin,
})

class MainApp extends Component {

    componentDidMount() {
        this.props.initApp();
    }

    render() {
        return (
            <div className='app-wrapper'>
                <div className={'header-container'}>
                    <HeaderContainer />
                    <NavigationBar isAdmin={this.props.isAdmin} />
                </div>
                {this.props.isInitialized &&
                    <div className='content-container'>
                        <Switch>
                            <Route exact path='/'
                                render={() => <Home />} />

                            <Route path='/Service/:id'
                                render={() => <ServiceContainer />} />

                            <Route path='/ServicesList'
                                render={() => <ServicesListContainer />} />

                            <Route path='/Administration'
                                render={() => <AdministrationContainer />} />

                            <Route path={'/error'}
                                render={() => <NotAuthorized />} />

                            <Route render={() => <NotFound />} />
                        </Switch>
                    </div>}
                <div className={'footer-container'}>
                    <Footer menuLinks={[
                        { title: 'Get Help', url: '#' },
                        { title: "What's new", url: '#' }
                    ]}>&copy; Stora Enso Packaging BB - {new Date().getFullYear()}</Footer>
                </div>
            </div>
        );
    }
}

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initApp }))(MainApp);

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default App;