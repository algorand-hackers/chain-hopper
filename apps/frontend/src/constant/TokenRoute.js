import React from 'react';
import {
    Flex,
    Box,
    Text,
    Icon,
    Image,
    useDisclosure,
    useColorMode,
  } from '@chakra-ui/react';
import AlgoTranc from "../asset/AlgoTran.svg";
import Wormhole from "../asset/Wormhole.svg";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import TokenRouteModal from '../components/TokenRouteModal/TokenRouteModal';
import Images_Icons from './icons-images';


const TokenRoute = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode();

  return (
    <Box mt={2}>
      <Flex gap={2} mb={12}>
        <Text color={colorMode === 'light' ? 'black' : 'white'}>Verified on 2 bridges. Confirm token address</Text>
        <Flex gap={1} align="center">
          <Text color="#396FFF">Etherscan</Text>
          <Image src={AlgoTranc} size={"20px"} alt="tr" />
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="500"
           color={colorMode === 'light' ? 'black' : 'white'}
           >
            Cheapest route
          </Text>
          <Text fontSize="12px"
           color={colorMode === 'light' ? 'black' : 'white'}
          >
            Saves you money, but you will wait a bit longer{' '}
          </Text>
        </Box>
        <Text onClick={onOpen} cursor="pointer" fontSize="12px" color="#4A48FF">
          Choose a different route (2)
        </Text>
      </Flex>

      <Flex justify="space-between" mb={2} mt={5}>
        <Flex fontSize="14px" h="fit-content" align={"flex-end"} fontWeight="500">
            {colorMode == 'light' ? (
                 <Image src={Wormhole} w="25px" h="25px"  mr={1} alt="algo" />
                ) : (
                  <Image src={Images_Icons.wormholeSVG} w="25px" h="25px"  mr={1} alt="algo" />
               ) }
            <Text color={colorMode === 'light' ? 'black' : 'white'}>WormHole</Text> 
            <Image src={AlgoTranc} w="15px" h="15px" mb="3px" ml={1} alt="algo" />
        </Flex>
        <Box>
            <Text fontSize="14px" fontWeight="500"
             color={colorMode === 'light' ? 'black' : 'white'}
             >
              10mins
             </Text>
            <Text fontSize="14px" fontWeight="500"
             color={colorMode === 'light' ? 'black' : 'white'}
             >
              Estimated Time
            </Text>
        </Box>
        <Box>
            <Text fontSize="14px" fontWeight="500" color={colorMode === 'light' ? 'black' : 'white'}>$46.28</Text>
            <Text fontSize="14px" fontWeight="500"
             color={colorMode === 'light' ? 'black' : 'white'}
             >
              Expected balance
            </Text>
        </Box>
        <Flex onClick={onOpen} cursor="pointer" align={"center"}>
              {colorMode == 'light' ? (
                  <MdOutlineKeyboardArrowDown className='w-[25px] h-[25px] font-bold '/>
                ) : (
                  <Image color="dark" h="20px" src={Images_Icons.arrowDownLogo} alt="logo" /> 
               ) }
        </Flex>
      </Flex>

      <TokenRouteModal onClose={onClose} isOpen={isOpen}/>
    </Box>
  );
};

export default TokenRoute;
