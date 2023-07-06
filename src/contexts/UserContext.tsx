"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React, { useMemo } from "react";

type GoogleUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type UserContextType = {
  user: GoogleUser | null;
  logIn: () => void;
  logOut: () => void;
};

const defaultUserValues = {
  user: null,
  logIn: function () {
    signIn("google");
  },
  logOut: function () {
    signOut();
  },
};

export const UserContext = React.createContext<UserContextType>(defaultUserValues);

export const UserContextProvider: DefaultComponent = ({ children }) => {
  const { data } = useSession();

  const user = useMemo<GoogleUser | null>(() => (data?.user ? data.user : null), [data]);

  return (
    <UserContext.Provider value={{ ...defaultUserValues, user }}>{children}</UserContext.Provider>
  );
};
