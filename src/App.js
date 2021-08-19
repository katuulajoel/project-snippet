/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/* -------------------------- Internel Dependencies ------------------------- */
import { childRoutes } from "./configs/Routes.conf";
import BootLogo from "./components/BootLogo";
import { verify } from "./actions/AuthActions";

const App = (props) => {
  const dispatch = useDispatch();
  const { user, isMakingRequest } = useSelector(({ Auth }) => Auth);
  const history = useHistory();

  useEffect(() => {
    if (user?.id) {
      history.push("/dashboard");
    } else {
      dispatch(verify());
    }
  }, []);

  useEffect(() => {
    if (!isMakingRequest.verify) {
      if (user?.id) {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    }
  }, [isMakingRequest.verify]);

  const rootProps = props;
  return (
    <Suspense fallback={<BootLogo />}>
      <Switch>
        {childRoutes.map((route, i) => {
          return route.redirect ? (
            <Redirect key={i} to={route.redirect} />
          ) : (
            <Route
              exact={route.exact}
              key={i}
              render={(props) => (
                <route.component
                  name={route.name}
                  childRoutes={route.childRoutes}
                  {...rootProps}
                  {...props}
                />
              )}
              path={route.path}
            />
          );
        })}
        <Redirect from="/signin" to="/login" />
        <Redirect exact from="/signup" to="/login" />
      </Switch>
    </Suspense>
  );
};

export default App;
