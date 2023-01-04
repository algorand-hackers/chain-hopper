import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
  Image,
  Circle,
  Progress,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import Expand from "../../asset/Expand.svg"

const TransactionModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={6}>
            <Flex>
              <Text fontSize="24px" fontWeight={'500'}>
                Bridging in progress
              </Text>
              <Spacer />
              <Image onClick={onOpen} src={Expand} alt-="expand" />
            </Flex>
            <Text my={7} fontSize={'18px'} fontWeight="500">
              Estimated completion time 01:23PM WAT
            </Text>
            <Box w="100%" mb={7} pos="relative">
              <Circle pos="absolute" size="20px" bottom="-8px" bg="#3A6EFF" />
              <Box width="90%" mx="auto">
                <Progress value={30} h="4px" color="blue" />
              </Box>
              <Circle
                pos="absolute"
                right="0"
                bottom="-8px"
                size="20px"
                bg="#3A6EFF"
              />
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
            <Text text="center" my="10px">You are sending:</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionModal;
