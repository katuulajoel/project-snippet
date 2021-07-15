import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as AuthActions from "../actions/AuthActions";
import * as ProfileActions from "../actions/ProfileActions";
import { retrieveInvite } from "../actions/UserActions";

function mapStateToProps(state) {
  return {
    Auth: state.Auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AuthActions: {
      ...bindActionCreators(AuthActions, dispatch),
      ...bindActionCreators(ProfileActions, dispatch),
    },
    retrieveInvite: bindActionCreators(retrieveInvite, dispatch),
  };
}

export default function connectToStore(component) {
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(component));
}
