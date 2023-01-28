import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SesionContext } from '../../contexts/SesionContext';
import './style_form.css';

export default function Login() {
  const navegar = useNavigate();
  const { login, setLogueado, error } = useContext(SesionContext);

  const [activateError, setActivateError] = useState(undefined);
  const objectForm = {
    email: "",
    password: ""
  };
  const [form, setForm] = useState(objectForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res === true) {
      setActivateError(false);
      setLogueado(true);
      navegar("/");
    } else setActivateError(true);
  }
  return (
    <div className='content_form'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className="text-center">Iniciar sesion</h1>
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
          <label htmlFor="input_email">Correo</label>
          <input type="email" className="form-control" id="input_email" placeholder="Escribe tu correo" name="email" onChange={handleChange} value={form.email} />
        </div><br />
          <div className="form-group">
            <label htmlFor="input_password">Contraseña</label>
            <input type="password" className="form-control" id="input_password" placeholder="Escribe tu contraseña" name="password" onChange={handleChange} value={form.password} />
          </div><br />
        <button type="submit" className="btn btn-primary">Iniciar sesion</button>
      </form>
      <br />
      <p>¿No tienes una cuenta? <Link to={'/register'}>¡Registrate aquí!</Link></p>
    </div>
  )
}
