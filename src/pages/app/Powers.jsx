import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardsPower from '../../components/CardsPower';
import { SesionContext } from '../../contexts/SesionContext';

export default function Powers() {
  const navegar = useNavigate();
  const { setLoading, loading, urlBase, infoToken } = useContext(SesionContext);
  const [allPowers, setAllPowers] = useState([]);
  useEffect(() => {
    const allPowersFunction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${urlBase}/powers`, {
          headers: {
            Authorization: `Bearer ${infoToken[1]}`
          }
        });
        allPowers(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setAllPowers(error.response.data);
        setLoading(false);
      }
    }
    allPowersFunction();
  }, []);
  return (
    <div>
      <div>
        <p>Registrar poder: </p>
        <button className='btn btn-access' onClick={() => navegar("/create_pw")}>Crear</button>
      </div>
      {
        loading && <div>
          {
            typeof allPowers === "string" ?
              <h3>No se encontraron poderes registrados</h3> :
              allPowers.map((user) =>
                <CardsPower key={user._id} id={user._id} name={user.name} email={user.description} />
              )
          }
        </div>
      }
    </div>
  )
}
