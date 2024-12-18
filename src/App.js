
import './App.css';
import Department from "./Pages/Department";
import Employee from './Pages/Employee';
import Payslip from './Pages/Payslip';
import Login from './Pages/Login';
import User from './Pages/User';
import NotFound from './Pages/NotFound';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Pages/component/ProtectedRoute';
import Payslip_Form from './Pages/component/Payslip_Form';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Protection */}
          <Route element={<ProtectedRoute />}>
            <Route path="/payslip" element={<Payslip />} />
            <Route path="/payslip/form" element={<Payslip_Form />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/department" element={<Department />} />
            <Route path="/user/:x" element={<User />} />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
