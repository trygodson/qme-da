import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "./../shared/context/useAuthContext";

const RouteGuard = ({ who = ["user"], ...props }) => {
  const { user } = useAuthState();
  const { token } = props;

  return Boolean(user?.token) ? (
    <Route path={props.path} component={props.component} />
  ) : (
    <Redirect to={"/"} />
  );
};

function Loading(props) {
  return (
    <main className="section vh-100">
      <section className="container">
        <div className="row align-items-center justify-content-center vh-100">
          <div className="column is-fullwidth is-offset-1">
            <div className="text-center">
              {props.children ? (
                props.children
              ) : (
                <>
                  <h2 className="is-size-4">Loading. . .</h2>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export { RouteGuard, Loading };