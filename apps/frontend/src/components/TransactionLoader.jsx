import React from 'react';
// import { Progress } from "@material-tailwind/react"
import {
  Flex,
  Box,
  Text,
  Icon,
  Image,
  Progress,
  Circle,
  Spacer,
  Button,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import Expand from '../asset/Expand.svg';
import TransactionModal from './TransactionModal/TransactionModal';
import viewSVG from '../asset/viewSVG.svg';
import Images_Icons from '../constant/icons-images';

const TransactionLoader = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box w={{base:"80%", md:"400px", lg:"450px"}} 
     pos="absolute"
     p={4}
    //  top="430px"
     rounded="12.42px"
     boxShadow='2xl'
     right="20px"
     h="fit-content"
     bg={ colorMode === 'light' ? 'white' : 'bg4'}  
     >
      <Flex>
        <Text fontSize="20px" fontWeight={'500'} color={colorMode === 'light' ? "black" : "#F5F5F5"}>
          Bridging in progress
        </Text>
        <Spacer />
        {colorMode == 'light' ? (
              <Image onClick={onOpen} src={Expand} alt-="expand" />
            ) : (
              <Image onClick={onOpen} src={viewSVG} alt-="expand" />
             ) }
      </Flex>
      <Text mb={3} mt={4} fontSize={'16px'} fontWeight="500"
      color={colorMode === 'light' ? "black" : "#F5F5F5"}
      >
        Estimated completion time 01:23PM WAT
      </Text>
      <Box w="100%" my="25px" pos="relative">
        <Circle pos="absolute" size="20px" bottom="-8px" bg="#3A6EFF" />
        <Box width="92%" mx="auto">
          {/* <Progress value={50}  color="red" /> */}
          <Progress value={50} h="4px" colorScheme="blue" />
        </Box>
        <Circle pos="absolute" right="0" bottom="-8px" size="20px" bg="#3A6EFF" />
      </Box>
      <Flex bg={ colorMode === 'light' ? "bg2" : "bg4"} p={3} rounded="10px">
          {colorMode == 'light' ? (
              <Icon mt="4px" boxSize={6}  />
            ) : (
               <Image color="dark" h="28px" src={Images_Icons.FALogo} alt="logo" /> 
             ) }
        <Spacer />

        <Text w="70%" color={colorMode === 'light' ? "black" : "#F5F5F5"}>
          Switch to Algorand from you wallet to see your new funds.
        </Text>
        <Spacer />
        <Box
          bg="#3A6EFF"
          py={2}
          px={3}
          as="button"
          color="white"
          h={'fit-content'}
          rounded="sm"
        >
          Switch
        </Box>
      </Flex>
      <TransactionModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TransactionLoader;
