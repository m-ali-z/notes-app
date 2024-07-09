"use client";
import { getSession, useSession, SessionProvider } from "next-auth/react";

const withSession = (Component) => {
  return function WrappedComponent(props) {
    return (
      <SessionProvider session={props.session}>
        <Component {...props} />
      </SessionProvider>
    );
  };
};

export default withSession;
