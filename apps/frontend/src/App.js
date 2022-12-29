import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import Home from './pages/Home';
import Navbar from './constant/Navbar';
import Sidebar from './constant/Sidebar';
import Bridge from './pages/Bridge';
// import { useColorMode } from "@chakra-ui/color-mode"


function App() {
  // const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Box h="100vh">
        <Navbar />
        <Box display="flex" h="90%">
          <Box bg="#FFFFFF"  w={{base:"20%", md:"230px", lg:"257px"}}>
            <Sidebar />
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
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
