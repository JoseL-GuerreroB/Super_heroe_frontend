import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SesionContext } from '../../contexts/SesionContext';
import './Home.css';
import { useState } from 'react';
import CardUser from '../../components/CardUser';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navegar = useNavigate();
  const { setDataToEdit, logueado, setLoading, loading, sesionUser, urlBase, infoToken, deleteUser, logout } = useContext(SesionContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const allUsersFunction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${urlBase}/app/users`, {
          headers: {
            Authorization: `Bearer ${infoToken[1]}`
          }
        });
        setAllUsers(res.data);
        setLoading(false);
      } catch (error) {
        setAllUsers(error.response.data);
        setLoading(false);
      }
    }
    allUsersFunction();
  }, []);

  const handleCloseSesion = async () => {
    await logout();
  }

  const handleEditUser = async () => {
    setDataToEdit({
      name: sesionUser.name,
      email: sesionUser.email
    });
    navegar("/edit_user");
  }
  const handleDeleteUser = async () => {
    await deleteUser();
    navegar("/register");
  }

  return (
    <div id='Home'>
      <h4 className='Home_title'>Mi perfil</h4>
      {
        logueado && <main id='Home_main'>
          <h1>{sesionUser.name}</h1>
          <h2>{sesionUser.email}</h2>
          <div>
            <button className='btn btn-secondary' onClick={handleCloseSesion}>Cerrar sesion</button>
            <button className='btn btn-warning' onClick={handleEditUser}>Editar Usuario</button>
            <button className='btn btn-danger' onClick={handleDeleteUser}>Eliminar Usuario</button>
          </div>
        </main>
      }
      <h4 className='Home_title'>Otros usuarios</h4>
      {
        !loading && <div id='Users_area'>
          {
            typeof allUsers === "string" ?
            <h3>No se encontraron Otros usuarios</h3> :
            allUsers.map((user) =>
              <CardUser key={user._id} name={user.name} email={user.email}/>
            )
          }
        </div>
      }
    </div>
  )
}
