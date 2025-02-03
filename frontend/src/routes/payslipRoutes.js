import React from 'react';
import { Route } from 'react-router-dom';
import Payslip from '../views/Payslip';
import Payslip_Form from '../components/page_specific/Payslip_Form';
import PayslipPdf from "../utils/PayslipPdf"

const payslipRoutes = [
  <Route key="payslip" path="/payslip" element={<Payslip />} />,
  <Route key="payslip_form" path="/payslip/form" element={<Payslip_Form />} />,
  <Route key="payslip_pdf" path="/payslip/payslipPdf" element={<PayslipPdf />} />,
];

export default payslipRoutes; 