import React, { useEffect, createContext, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // const usePersistedState = (key) => {
  //   const [state, setState] = useState(
  //     () => JSON.parse(sessionStorage.getItem(key)) || null
  //   );
  //   useEffect(() => {
  //     sessionStorage.setItem(key, JSON.stringify(state));
  //   }, [key, state]);
  //   return [state, setState];
  // };
  // const [currentUser, setCurrentUser] = usePersistedState('user');
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetArea, setTargetArea] = useState(null);
  const [stretchNames, setStretchNames] = useState([]);
  const [selectedStretch, setSelectedStretch] = useState({});
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    console.log('this is the user in context', currentUser);
  }, [currentUser]);

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

  //move the logic of addStretch to set the AppContext.
  //Pass the setCount and count from Appcontext to Profile

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
