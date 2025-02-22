import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  getAuth,
} from 'firebase/auth';
import { app } from '../firebase/firebase.js';
import { getById, getReference } from '../services/firestore.service';

const authContext = createContext();
const auth = getAuth(app);
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);
  const [apiConfig, setApiConfig] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);

  const signIn = async (email, psw) => {
    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, psw);
      })
      .catch((error) => {
        throw error;
      });
  };
  const signout = () => signOut(auth);

  const getConfig = async () => {
    if (user) {
      const usrConf = await getById('usuarios', user.uid);
      const configData = usrConf.data().config;
      setConfig(usrConf.data());
      if (configData) {
        const configDoc = await getReference(configData);
        if (configDoc.exists()) {
          const connectConfig = configDoc.data();
          setApiConfig(connectConfig);
        }
      }
      setCurrentCompany(usrConf.data().companyList[0]);
    }
  };

  useEffect(() => {
    const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscirbe();
    };
  }, []);

  useEffect(() => {
    getConfig();
  }, [user]);
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <authContext.Provider
      value={{
        signIn,
        signout,
        user,
        loading,
        config,
        currentCompany,
        apiConfig,
        setCurrentCompany,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
