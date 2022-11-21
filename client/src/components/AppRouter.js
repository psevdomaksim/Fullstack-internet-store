import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route, Redirect } from "react-router";
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Switch>
      {user.isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
