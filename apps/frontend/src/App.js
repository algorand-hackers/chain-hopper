import { React, useState } from "react"
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from './pages/Home';
import Navbar from './constant/Navbar';
import Sidebar from './constant/Sidebar';
import Bridge from './pages/Bridge/Bridge';
// import { useColorMode } from "@chakra-ui/color-mode"

function App() {
  const [isConnect, setIsConnect] = useState(true)

  

  return (
    <div>
      <Box >
        <Navbar isConnect={isConnect} setIsConnect={setIsConnect} />
        <Box display="flex" >
          <Box>
            <Sidebar />
          </Box>
          <Box h="90vh" bg="bg2" w={{base:"100%", md:"100%", lg:"100%"}}>
            <Routes>
              <Route index path="/"  element={<Home isConnect={isConnect} setIsConnect={setIsConnect} />} />
              <Route path='/bridge' element={<Bridge  isConnect={isConnect} />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
