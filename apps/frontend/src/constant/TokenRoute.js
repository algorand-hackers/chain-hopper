import React from 'react';
import {
    Flex,
    Box,
    Text,
    Icon,
    Image
  } from '@chakra-ui/react';
import AlgoTranc from "../asset/AlgoTran.svg";
import Wormhole from "../asset/Wormhole.svg";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';


const TokenRoute = () => {
  return (
    <Box mt={2}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="500">Cheapest route</Text>
          <Text fontSize="12px">
            Saves you money, but you will wait a bit longer{' '}
          </Text>
        </Box>
        <Text fontSize="12px" color="blue">
          Choose a different route (2)
        </Text>
      </Flex>

      <Flex justify="space-between" mb={2} mt={5}>
        <Flex fontSize="14px" h="fit-content" align={"flex-end"} fontWeight="500">
            <Image src={Wormhole} w="25px" h="25px"  mr={1} alt="algo" />
            WormHole
            <Image src={AlgoTranc} w="15px" h="15px" mb="3px" ml={1} alt="algo" />
        </Flex>
        <Box>
            <Text fontSize="14px" fontWeight="500">10mins</Text>
            <Text fontSize="14px" fontWeight="500">Estimated Time</Text>
        </Box>
        <Box>
            <Text fontSize="14px" fontWeight="500">$46.28</Text>
            <Text fontSize="14px" fontWeight="500">Expected balance</Text>
        </Box>
        <Flex align={"center"}>
            <MdOutlineKeyboardArrowDown className='w-[25px] h-[25px] font-bold '/>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TokenRoute;
