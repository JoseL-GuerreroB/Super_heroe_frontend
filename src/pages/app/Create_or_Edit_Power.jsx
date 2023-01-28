import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SesionContext } from '../../contexts/SesionContext';

export default function Create_or_Edit_Power() {
  const navegar = useNavigate();
  const { createPower, editPower, dataToEdit, setLogueado, error } = useContext(SesionContext);

  const [activateError, setActivateError] = useState(undefined);
  const objectForm = dataToEdit.type === "power" ? dataToEdit : {
    name: "",
    description: ""
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
        name: form.name,
        description: form.description
      });
      if (res === true) {
        setActivateError(false);
        setLogueado(true);
        navegar("/powers");
      } else setActivateError(true);
    } else {
      const res = await createPower(form);
      if (res === true) {
        setActivateError(false);
        setLogueado(true);
        navegar("/powers");
      } else setActivateError(true);
    }
  }
  return (
    <div className='content_form'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className="text-center">Crear poder</h1>
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
          <label htmlFor="input_name">Nombre del poder</label>
          <input type="text" className="form-control" id="input_name" placeholder="Escribe el poder" name="name" onChange={handleChange} value={form.name} />
        </div><br />
        <div className="form-group">
          <label htmlFor="input_description">Descripcion</label>
          <input type="text" className="form-control" id="input_description" placeholder="Escribe la descripcion" name="description" onChange={handleChange} value={form.description} />
        </div><br />
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      <br />
    </div>
  )
}
