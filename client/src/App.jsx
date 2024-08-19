// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import TestDashboard from './components/TestDashboard';
import TestEnvironment from './components/TestEnvironment';
import FinishTest from './components/FinishTest';
import './App.css';
import SignUP from './components/SignUP';

function App() {
  return (
    // <BrowserRouter>
    // {/* // <AuthProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<TestDashboard />} />
          <Route path="/test-environment/:testid" element={<TestEnvironment />} />
          <Route path="/finish-test" element={<FinishTest />} />
          <Route path="/signup" element={<SignUP />}></Route>
        </Routes>
      </Router>
    // {/* // </AuthProvider> */}
    // </BrowserRouter>
  );
}

export default App;
