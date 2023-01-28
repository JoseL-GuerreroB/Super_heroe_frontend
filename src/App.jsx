import './App.css';
import { HashRouter } from 'react-router-dom';
import Main_routes from './routes/Main_routes';
import HeaderMain from './components/HeaderMain';
import { useContext } from 'react';
import { SesionContext } from './contexts/SesionContext';

function App() {
  const {logueado} = useContext(SesionContext);
  return (
    <div className="App">
      <HashRouter>
        {logueado && <HeaderMain />}
        <Main_routes />
      </HashRouter>
    </div>
  )
}

export default App;
