import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";

import { getStatus } from "../actions";
import Routes from "../../Routes";

import "./App.scss";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function App({ status, getStatus }) {
  useEffect(() => {
    getStatus();
  }, []); // eslint-disable-line

  return (
    <div className="app">
      <Routes />
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    getStatus: () => {
      dispatch(getStatus());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
