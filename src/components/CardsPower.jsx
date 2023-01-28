import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardsPower({id, name, description}) {
  const navegar = useNavigate();
  const { setDataToEdit, setLoading, loading, urlBase, infoToken } = useContext(SesionContext);
  const handleEditPower = async () => {
    setDataToEdit({
      type: "power",
      id,
      name,
      description
    });
    navegar("/create_pw");
  }
  const handleDeletePower = async () => {
    await axios.delete(`${urlBase}`, {
      headers: {
        Authorization: `Bearer ${infoToken[1]}`
      }
    });
    navegar("/powers")
  }
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <div>
        <button className='btn btn-warning' onClick={handleEditPower}>editar</button>
        <button className='btn btn-danger' onClick={handleDeletePower}>eliminar</button>
      </div>
    </div>
  )
}
