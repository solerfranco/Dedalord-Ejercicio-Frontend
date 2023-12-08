import React from 'react';
import Layout from './pages/Layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import SignUpForm from './pages/SignUpForm/SignUpForm';
import Chat from './pages/Chat/Chat';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />} >
            <Route index element={<Chat />} />
          </Route>
          <Route path="login" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
