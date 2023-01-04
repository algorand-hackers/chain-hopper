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
} from '@chakra-ui/react';
import Expand from '../asset/Expand.svg';
import TransactionModal from './TransactionModal/TransactionModal';

const TransactionLoader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-[450px] absolute p-4 top-[430px] shadow-md rounded-[12.42px] right-[20px] h-fit-content bg-[white]">
      <Flex>
        <Text fontSize="20px" fontWeight={'500'}>
          Bridging in progress
        </Text>
        <Spacer />
        <Image onClick={onOpen} src={Expand} alt-="expand" />
      </Flex>
      <Text mb={3} mt={4} fontSize={'16px'} fontWeight="500">
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
      <Flex bg="bg2" p={3} rounded="10px">
        <Icon mt="4px" boxSize={6}  />
        <Spacer />

        <Text w="70%">
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
    </div>
  );
};

export default TransactionLoader;
