import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./pages/auth/Login";
import RegisterIndex from "./pages/auth/Register";

import { GetAllCouriers } from "./pages/GetAllCouriers";
import { PostCourier } from "./pages/PostCourier";
import { PostOrder } from "./pages/PostOrder"
import { GetOrders } from "./pages/GetOrders"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/GetAllCouriers" element={<GetAllCouriers />}></Route>
        <Route path="/PostCourier" element={<PostCourier />}></Route>
        <Route path="/PostOrder" element={<PostOrder />}></Route>
        <Route path="/GetOrders" element={<GetOrders />}></Route>
      </Route>

      <Route path="/auth/login" element={<Login />}></Route>
      <Route path="/auth/register" element={<RegisterIndex />}></Route>

    </Routes>
  );
}

export default App;
