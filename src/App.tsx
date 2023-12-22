import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./components/404";
import NavBar from "./components/navbar";
import HomePage from "./components/home";
import Protected from "./components/protected";
import Dashboard from "./components/dashboard";
import SinglePost from "./components/singlePost";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="pt-10">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="article/:id" element={<SinglePost />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
