import React, { ReactNode, useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

type AuthContextType = {
    user: {
        id: number;
        email: String;
    };
    isLoggedIn: boolean;
};

const initialContextValue = {
    user: {
        id: 0,
        email: '',
    },
    isLoggedIn: false,
};

const authContext = createContext<AuthContextType>(initialContextValue);

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialContextValue.isLoggedIn);
  const [user, setUser] = useState(initialContextValue.user);

  const login = (input: { email: string; password: string }) => {
    return axios.post("/api/login", input)
    .then((res) => {
      const id = res.data.id;
      const email = res.data.email;
      setUser({ id, email })
      setIsLoggedIn(true);
    })
  };

//   const signout = () => {
//     setLoading(true);
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//       })
//       .finally(() => setLoading(false));
//   };

  useEffect(() => {
    const checkUser = async () => await axios.get("api/login/me")
        .then((res) => {
            setUser(res.data);
            setIsLoggedIn(true);
        })
        .catch((err) => {
            setUser(initialContextValue.user);
            setIsLoggedIn(false);
        });


    checkUser();
  }, []);

  return {
    user,
    login,
    // signout
  };
}
