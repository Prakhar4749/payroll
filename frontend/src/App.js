
import './assets/styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes/RoutesComponent';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;

