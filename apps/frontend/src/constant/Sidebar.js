import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Image, Icon, useColorMode } from '@chakra-ui/react';
import Swap from '../asset/swap.svg';
import Watchlist from '../asset/watchlist.svg';
import Settings from '../asset/setting.svg';
import Images_Icons from '../constant/icons-images';
import faq from '../asset/faq.svg';
import notification from '../asset/notification.svg';


const Sidebar = () => {
    // const [active, setActive] = useState(true);
    const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box  w={{base:"0", md:"230px", lg:"257px"}} display={{base:"none", md:"block"}} h="547px">
      
        {/* <Flex ml="auto" mr="10px" mt="4" mb="1" justify="space-between" align="center" w="80%"> */}
      <NavLink 
        to="/"
        className="px-3 py-2 rounded-[5px] mt-4 mb-1 mr-4 justify-between items-center w-[80%] flex ml-auto"
      >
        
          <div className="flex">
            {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Images_Icons.WalletLogo} alt="logo" />
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.walletLogo} alt="logo" /> 
                  ) }
            <Text ml="3" fontWeight="500">
              Portfolio
            </Text>
          </div>
          <Text
            fontSize="16px"
            fontWeight={500}
            color="dark"
            bg="bg2"
            px={1.5}
            py={1}
            rounded="50%"
          >
            00
          </Text>
      </NavLink>
        {/* </Flex> */}
      <Flex w="80%" mr="14px" ml="auto" direction="column" justify="space-between" h="80%">
        <Box>
            <Box mx="auto" my="2" rounded="8px">
            <NavLink
                to="/bridge"
                className="px-3 py-2 rounded-[5px] flex mx-auto "
            >
                {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Images_Icons.bridgeLogo1} alt="logo" /> 
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.bridgeLogo} alt="logo" /> 
                  ) }
                <Text ml="6" fontWeight="500">
                Bridge
                </Text>
            </NavLink>
            </Box>
            <Box mx="auto" my="2" >
            <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
               {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Swap} alt="logo" />
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.SwapLogo} alt="logo" /> 
                  ) }
                <Text ml="4" fontWeight="500">
                Swap
                </Text>
            </div>
            </Box>
            <Box mx="auto" my="2">
            <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Watchlist} alt="logo" />
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.WatchlistLogo} alt="logo" /> 
                  ) }
                <Text ml="4" fontWeight="500">
                Watchlist
                </Text>
            </div>
            </Box>
            <Box mx="auto" my="2">
            <div className="px-3 py-2 rounded-[5px]  flex mx-auto ">
                {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Settings} alt="logo" />
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.settingLogo} alt="logo" /> 
                  ) }
                <Text ml="4" fontWeight="500">
                Settings
                </Text>
            </div>
            </Box>
        </Box>

        <Box>            
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto" onClick={toggleColorMode}>
                  {colorMode == 'light' ? (
                    <Image color="dark" h="25px" src={Images_Icons.lightLogo} alt="logo" /> 
                  ) : (
                    <Image color="dark" h="25px" src={Images_Icons.lightMoonLogo} alt="logo" />
                  ) }
                    <Text ml="4" fontWeight="500">
                    Appearance 
                    </Text>
                </div>
            </Box>
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                    {colorMode == 'light' ? (
                       <Image color="dark" h="25px" src={notification} alt="logo" />
                       ) : (
                         <Image color="dark" h="25px" src={Images_Icons.notificationLogo} alt="logo" /> 
                       ) }
                    <Text ml="4" fontWeight="500">
                    What’s new
                    </Text>
                </div>
            </Box>
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                    {colorMode == 'light' ? (
                       <Image color="dark" h="25px" src={faq} alt="logo" />
                       ) : (
                         <Image color="dark" h="25px" src={Images_Icons.FAQLogo} alt="logo" /> 
                       ) }
                    <Text ml="4" fontWeight="500">
                    FAQ
                    </Text>
                </div>
            </Box>
            
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
