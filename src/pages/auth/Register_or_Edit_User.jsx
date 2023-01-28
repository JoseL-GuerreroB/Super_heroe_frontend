import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SesionContext } from '../../contexts/SesionContext';
import './style_form.css';

export default function Register_or_Edit_User() {
  const navegar = useNavigate();
  const { register, editUser, editUserPassword, logueado, setLogueado, dataToEdit, error } = useContext(SesionContext);
  const [activateError, setActivateError] = useState(undefined);
  const objectForm = !logueado ? {
    name: "",
    email: "",
    password: ""
  } : dataToEdit;
  const [form, setForm] = useState(objectForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logueado){
      const res = await register(form);
      if (res === true) {
        setActivateError(false);
        setLogueado(true);
        navegar("/");
      } else setActivateError(true);
    } else {
      const data = {
        name: form.name,
        email: form.email
      }
      console.log(data);
      const res = await editUser(data);
      if (res === true) {
        setActivateError(false);
        navegar("/");
      } else setActivateError(true);
    }
  }

  const handleSubmitPassword = async (e) => {
    const data = {
      password: form.password
    }
    const res = await editUserPassword(data);
    if (res === true) navegar("/");
  }

  return (
    <div className='content_form'>
      {
        logueado && <div style={{ width: "100%" }}>
        <button className='btn btn-secondary' style={{ marginLeft: "40px" }} onClick={()=> navegar("/")}>Regresar</button>
      </div>
      }
      <form className='form' onSubmit={handleSubmit}>
        <h1 className="text-center">{logueado ? "Editar usuario" : "Registrate aquí"}</h1>
        <br />
        { activateError && <div>
          {
            typeof error.message === "string" ? 
              <small className='text-center text-danger'>{error.message}</small> :
            error['message'].map((errorMessage, index) =>{
              return <small key={index} className='text-center text-danger'>{errorMessage}</small>
            })
          }
        </div>
        }
        <div className="form-group">
          <label htmlFor="input_name">Nombre</label>
          <input type="text" className="form-control" id="input_name" placeholder="Escribe tu nombre" name="name" onChange={handleChange} value={form.name} />
        </div><br />
        <div className="form-group">
          <label htmlFor="input_email">Correo</label>
          <input type="email" className="form-control" id="input_email" placeholder="Escribe tu correo" name="email" onChange={handleChange} value={form.email} />
        </div><br />
        {!logueado && <>
        <div className="form-group">
          <label htmlFor="input_password">Contraseña</label>
          <input type="password" className="form-control" id="input_password" placeholder="Escribe tu contraseña" name="password" onChange={handleChange} value={form.password} />
        </div><br />
        </>}
        <button type="submit" className="btn btn-primary">{logueado ? "Editar" : "Registrar"}</button>
      </form>
      <br />
      {!logueado && <p className='text-light'>¿Ya tienes una cuenta? <Link to={'/login'}>¡Inicia sesion aquí!</Link></p>}
      {logueado && <form className='form' onSubmit={handleSubmitPassword}>
        <h1 className="text-center">Editar Contraseña</h1>
        <br />
        {activateError && <div>
          {
            typeof error.message === "string" ?
              <small className='text-center text-danger'>{error.message}</small> :
              error['message'].map((errorMessage, index) => {
                return <small key={index} className='text-center text-danger'>{errorMessage}</small>
              })
          }
        </div>
        }
        <div className="form-group">
          <label htmlFor="input_password">Contraseña</label>
          <input type="password" className="form-control" id="input_password" placeholder="Escribe tu contraseña" name="password" onChange={handleChange} value={form.password} />
        </div><br />
        <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
      </form>}
    </div>
  )
}
