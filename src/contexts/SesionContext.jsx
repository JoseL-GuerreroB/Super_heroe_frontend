import { createContext, useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

export const SesionContext = createContext();

export default function SesionProvider({children}) {
  const [logueado, setLogueado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeRefresh, setTimeRefresh] = useState(0);

  const [sesionUser, setSesionUser] = useState({});
  const [dataToEdit, setDataToEdit] = useState({});
  const [infoToken, setInfoToken] = useState([900, ""]);
  const objectErrorBase = { message: [] };
  const [error, setError] = useState(objectErrorBase);
  
  const urlBase = "http://localhost:6001";

  useEffect(() => {
    sesion();
  }, []);


  const sesion = async () => {
    try {
      setLoading(true);
      const presesion = await axios.get(`${urlBase}/app/presesion`, {
        withCredentials: true
      });
      setInfoToken([900, presesion.data.token]);
      const sesion = await axios.get(`${urlBase}/app/sesion`, {
        headers: {
          Authorization: `Bearer ${presesion.data.token}`
        }
      });
      setSesionUser(sesion.data);
      setLoading(false);
      setError(objectErrorBase);
      setLogueado(true);
      refresh();
    } catch (error) {
      setSesionUser({});
      setError(error.response.data);
      setLoading(false);
    }
  }

  const refresh = () => {
    const st = setTimeout(() => {
      sesion();
    }, (infoToken[0] * 1000) - 5000);
    setTimeRefresh(st);
  }

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${urlBase}/auth/register`, data, {
        withCredentials: true,
      });
      if (res.data.ok === true) {
        setError(objectErrorBase);
        await sesion();
      }
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }

  const login = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${urlBase}/auth/login`, data, {
        withCredentials: true,
      });
      if (res.data.ok === true) {
        setError(objectErrorBase);
        await sesion();
      }
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }

  const editUser = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(`${urlBase}/auth/edit_user`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setError(objectErrorBase);
      setSesionUser(res.data);
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }

  const editUserPassword = async (data) => {
    try {
      setLoading(true);
      const res = await axios.patch(`${urlBase}/auth/edit_password`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      if (res.data.ok === true) {
        setError(objectErrorBase);
        setLoading(false);
      }
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }

  const deleteUser = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${urlBase}/auth/delete_user`, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      if (res.data.ok === true) {
        clearTimeout(timeRefresh);
        setError(objectErrorBase);
        setInfoToken([900, ""]);
        setSesionUser({});
        setTimeRefresh(0);
        setLoading(false);
        setLogueado(false);
      }
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }

  const logout = async () => {
    try {
      setLoading(true);
      const close = await axios.get(`${urlBase}/app/close_sesion`, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        },
        withCredentials: true
      });
      if (close.data.ok === true) {
        clearTimeout(timeRefresh);
        setError(objectErrorBase);
        setInfoToken([900, ""]);
        setSesionUser({});
        setTimeRefresh(0);
        setLoading(false);
        setLogueado(false);
      }
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const createPower = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${urlBase}/powers`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const editPower = async (id, data) => {
    try {
      setLoading(true);
      await axios.put(`${urlBase}/powers/${id}`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const createSuperhero = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${urlBase}/superheros`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const editSuperhero = async (id, data) => {
    try {
      setLoading(true);
      await axios.put(`${urlBase}/superheros/${id}`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const createPerson = async (sid, data) => {
    try {
      setLoading(true);
      await axios.post(`${urlBase}/superheros/${sid}/people_saved`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const editPerson = async (sid, pid, data) => {
    try {
      setLoading(true);
      await axios.put(`${urlBase}/superheros/${sid}/people_saved/${pid}`, data, {
        headers: {
          Authorization: `Bearer ${infoToken[1]}`
        }
      });
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
      return false;
    }
  }
  const request = {
    register,
    login,
    editUser,
    editUserPassword,
    deleteUser,
    logout,
    createPower,
    editPower,
    createSuperhero,
    editSuperhero,
    createPerson,
    editPerson
  }
  const variables = {
    logueado,
    setLogueado,
    loading,
    setLoading,
    dataToEdit,
    setDataToEdit,
    sesionUser,
    error,
    urlBase,
    infoToken
  }
  const values = Object.assign(request, variables);
  return <SesionContext.Provider value={values}>{children}</SesionContext.Provider>
}