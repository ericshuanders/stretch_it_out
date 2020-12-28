import React, { useEffect, createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetArea, setTargetArea] = useState(null);
  const [stretchNames, setStretchNames] = useState([]);
  const [selectedStretch, setSelectedStretch] = useState({});
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get(`/api/users/me`, {
          withCredentials: true
        })
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, user]);

  const number = currentUser?.dailyStretches.completed;
  const [count, setCount] = useState(number || null);

  return (
    <AppContext.Provider
      value={{
        modalShow,
        setModalShow,
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        targetArea,
        setTargetArea,
        stretchNames,
        setStretchNames,
        count,
        setCount,
        selectedStretch,
        setSelectedStretch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
