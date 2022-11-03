import { type } from "@testing-library/user-event/dist/type";
import React, { useState, createContext } from "react";

type Authuser = {
  id: number;
  email: String;
};

type UserState = boolean;


type UserContextType = {
  user: Authuser;
  setUser: React.Dispatch<React.SetStateAction<Authuser>>;
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType );

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<Authuser>({
    id: 0,
    email: 'not logged in',
  });
  const [userState, setUserState] = useState<UserState>(false);
  return (
    <UserContext.Provider value={{ user, setUser, userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
