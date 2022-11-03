import React, { useState, createContext, useEffect } from "react";


type Authuser = {
  id: number;
  email: String;
};

type UserState = boolean;


type UserContextType = {
  user: Authuser;
  setUser: React.Dispatch<React.SetStateAction<Authuser>>;
  isLoggedIn: UserState;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<UserState>>
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {

  const [user, setUser] = useState<Authuser>({
    id: 0,
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState<UserState>(false)

  useEffect(() => {
    
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
