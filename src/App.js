import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from "./features/userSlice"

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //!check if logged in or not with onAuthStateChanged, and clean it after(the listener)
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else{
        //logged eout
        dispatch(logout())
      }
    })

    return unsubscribe;
  }, [dispatch])
    
  return (
    <div className="app">

          {!user ? (
            <BrowserRouter>
              <Routes>
                <Route path="/" element = {<LoginScreen />} />
                <Route path="/profile" element = {<ProfileScreen />} />
                <Route path="/login" element = {<LoginScreen />} />,
              </Routes>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element = {<HomeScreen />} />,
                <Route path="/login" element = {<HomeScreen />} />,
                <Route path="/profile" element = {<ProfileScreen />} />
              </Routes>
            </BrowserRouter>
          )}

    </div>
  );
}

export default App;
