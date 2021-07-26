/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import { childRoutes } from "./configs/Routes.conf";
import BootLogo from "./components/BootLogo";
import { verify } from "./actions/AuthActions";

const App = (props) => {
  const dispatch = useDispatch();
  const { user, isVerifying } = useSelector(({ Auth }) => Auth);

  useEffect(() => {
    console.log(isVerifying, user);
    if (!isVerifying && !user.id) dispatch(verify());
  }, []);

  const rootProps = props;
  return (
    <Suspense fallback={<BootLogo />}>
      <Switch>
        {childRoutes.map((route, i) => {
          return (
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
