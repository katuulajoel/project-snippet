/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { childRoutes } from "./configs/Routes.conf";
import BootLogo from "./components/core/BootLogo";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "./actions/AuthActions";

const App = (props) => {
  const dispatch = useDispatch();
  const { user, isVerifying } = useSelector(({ Auth }) => Auth);

  useEffect(() => {
    if (!isVerifying && user.id) dispatch(verify());
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
        {/* <Route
          path="*"
          render={(props) => <ShowcaseLayout {...rootProps} {...props} />}
        /> */}
      </Switch>
    </Suspense>
  );
};

export default App;
