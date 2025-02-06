import React from 'react';
import { Route } from 'react-router-dom';
import Payslip from '../views/Payslip';
import PayslipForm from '../components/page_specific/Payslip_Form';
import PayslipPdf from "../components/page_specific/Payslip_pdf"

const payslipRoutes = [
  <Route key="payslip" path="/payslip" element={<Payslip />} />,
  <Route key="payslip_form" path="/payslip/form" element={<PayslipForm />} />,
  <Route key="payslip_pdf" path="/payslip/payslip_pdf" element={<PayslipPdf />} />,
];

export default payslipRoutes; 