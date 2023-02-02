import { React, useState } from "react"
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from './pages/Home';
import Navbar from './constant/Navbar';
import Sidebar from './constant/Sidebar';
import Bridge from './pages/Bridge/Bridge';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useColorMode } from "@chakra-ui/color-mode"

function App() {

  // const [isConnect, setIsConnect] = useState(true)
  return (
    <>
      <Box>
        <Navbar />
        <Box display="flex" >
          <Box>
            <Sidebar />
          </Box>
          <Box h="85vh" bg="bg2" w={{base:"100%", md:"100%", lg:"100%"}}>
             <ToastContainer />
            <Routes>
              <Route index path="/"  element={<Home  />} />
              <Route path='/bridge' element={<Bridge  />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
