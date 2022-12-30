import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Image, Button, Icon } from '@chakra-ui/react';
import wallet from '../asset/walleticon.svg';
import Bridge from '../asset/bridge.svg';
import bridgeLight from '../asset/bridgeLight.svg';
import Swap from '../asset/swap.svg';
import Watchlist from '../asset/watchlist.svg';
import Settings from '../asset/setting.svg';
import darkmode from '../asset/darkmode.svg';
import faq from '../asset/faq.svg';
import notification from '../asset/notification.svg';


const Sidebar = () => {
    const [active, setActive] = useState(true);


  return (
    <Box  w={{base:"0", md:"230px", lg:"257px"}} display={{base:"none", md:"block"}} h="547px">
      <Flex ml="auto" mr="10px" mt="4" mb="1" justify="space-between" align="center" w="80%">
        <div className="flex">
          <Image color="dark" h="25px" src={wallet} alt="logo" />
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
      </Flex>
      <Flex w="80%" mr="14px" ml="auto" direction="column" justify="space-between" h="80%">
        <Box>
            <Box mx="auto" my="2" rounded="8px"
                // className={ active ? `rounded-[8px]` : `bg-[#3A6EFF] text-[white]`}
            >
            <NavLink
            // onClick={() => {setActive(false)}}
                to="/bridge"
                className="px-3 py-2 rounded-[5px] flex mx-auto "
            >
                <Icon boxSize={6} as={Bridge} />
                {/* <Image color="dark" h="25px" src={Bridge} alt="logo" /> */}
                {/* { 
                    active ? (<Image color="dark" h="25px" src={Bridge} alt="logo" />
                    ) : (
                    <Image color="dark" h="25px" src={bridgeLight} alt="logo" /> )
                } */}
                <Text ml="6" fontWeight="500">
                Bridge
                </Text>
            </NavLink>
            </Box>
            <Box mx="auto" my="2" >
            <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
            <Image color="dark" h="25px" src={Swap} alt="logo" />
                <Text ml="4" fontWeight="500">
                Swap
                </Text>
            </div>
            </Box>
            <Box mx="auto" my="2">
            <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                <Image color="dark" h="25px" src={Watchlist} alt="logo" />
                <Text ml="4" fontWeight="500">
                Watchlist
                </Text>
            </div>
            </Box>
            <Box mx="auto" my="2">
            <div className="px-3 py-2 rounded-[5px]  flex mx-auto ">
                <Image color="dark" h="25px" src={Settings} alt="logo" />
                <Text ml="4" fontWeight="500">
                Settings
                </Text>
            </div>
            </Box>
        </Box>

        <Box>            
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                    <Image color="dark" h="25px" src={darkmode} alt="logo" />
                    <Text ml="4" fontWeight="500">
                    Appearance 
                    </Text>
                </div>
            </Box>
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                    <Image color="dark" h="25px" src={notification} alt="logo" />
                    <Text ml="4" fontWeight="500">
                    What’s new
                    </Text>
                </div>
            </Box>
            <Box mx="auto" my="2" >
                <div className="px-3 py-2 rounded-[5px] flex mx-auto ">
                    <Image color="dark" h="25px" src={faq} alt="logo" />
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
