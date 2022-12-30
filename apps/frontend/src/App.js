import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from './pages/Home';
import Navbar from './constant/Navbar';
import Sidebar from './constant/Sidebar';
import Bridge from './pages/Bridge';



function App() {

  return (
    <div>
      <Box >
        <Navbar />
        <Box display="flex">
          <Box>
            <Sidebar />
          </Box>
          <Box bg="bg2" w={{base:"100%", md:"100%", lg:"100%"}}>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/bridge' element={<Bridge />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
