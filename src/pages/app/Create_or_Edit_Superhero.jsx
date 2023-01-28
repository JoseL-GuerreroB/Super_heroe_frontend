import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SesionContext } from '../../contexts/SesionContext';

export default function Create_or_Edit_Superhero() {
  const navegar = useNavigate();
  const { createPower, editPower, dataToEdit, setLogueado, error } = useContext(SesionContext);

  const [activateError, setActivateError] = useState(undefined);
  const objectForm = dataToEdit.type === "superhero" ? dataToEdit : {
    hero_name: "",
    secret_identity: ""
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
    if (dataToEdit.type === "power") {
      const res = await editPower({
        hero_name: form.name,
        secret_identity: form.description
      });
      if (res === true) {
        setActivateError(false);
        setLogueado(true);
        navegar("/superheros");
      } else setActivateError(true);
    } else {
      const res = await createPower(form);
      if (res === true) {
        setActivateError(false);
        setLogueado(true);
        navegar("/superheros");
      } else setActivateError(true);
    }
  }
  return (
    <div className='content_form'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className="text-center">Crear superheroe</h1>
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
          <label htmlFor="input_hero_name">Nombre del superheroe</label>
          <input type="text" className="form-control" id="input_hero_name" placeholder="Escribe el nombre del superheroe" name="hero_name" onChange={handleChange} value={form.name} />
        </div><br />
        <div className="form-group">
          <label htmlFor="input_secret_identity">Identidad secreta</label>
          <input type="text" className="form-control" id="input_secret_identity" placeholder="Escribe la identidad secreta" name="secret_identity" onChange={handleChange} value={form.description} />
        </div><br />
        <select multiple class="form-select" aria-label="Default select example">
          <option defaultValue>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      <br />
    </div>
  )
}
