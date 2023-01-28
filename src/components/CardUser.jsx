import React from 'react';
import './CardUser.css';

export default function CardUser({name, email}) {
  return (
    <div className='cardUser'>
      <p>nombre de usuario: {name}</p>
      <p>correo electronico: {email}</p>
    </div>
  )
}
