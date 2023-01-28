import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SesionContext } from '../contexts/SesionContext';
import Create_or_Edit_PeopleSaved from '../pages/app/Create_or_Edit_PeopleSaved';
import Create_or_Edit_Power from '../pages/app/Create_or_Edit_Power';
import Create_or_Edit_Superhero from '../pages/app/Create_or_Edit_Superhero';
import Home from '../pages/app/Home';
import Not_Found_Page from '../pages/app/Not_Found_Page';
import People_Saved from '../pages/app/People_Saved';
import Powers from '../pages/app/Powers';
import Superheros from '../pages/app/Superheros';
import Login from '../pages/auth/Login';
import Register_or_Edit_User from '../pages/auth/Register_or_Edit_User';

export default function Main_routes() {
  const {logueado} = useContext(SesionContext);
  return (
    <Routes>
      <Route path='/' element={logueado ? <Home /> : <Navigate to="login" /> } />
      <Route path={logueado ? "edit_user" : "register"} element={ <Register_or_Edit_User /> } />
      <Route path='login' element={!logueado ? <Login /> : <Navigate to="/" /> } />
      <Route path='superheros' element={ <Superheros /> } />
      <Route path='create_sh' element={ <Create_or_Edit_Superhero /> } />
      <Route path='powers' element={ <Powers /> } />
      <Route path='create_pw' element={ <Create_or_Edit_Power /> } />
      <Route path='people_saved' element={ <People_Saved /> } />
      <Route path='create_ps' element={ <Create_or_Edit_PeopleSaved /> } />
      <Route path='*' element={ <Not_Found_Page /> } />
    </Routes>
  )
}
