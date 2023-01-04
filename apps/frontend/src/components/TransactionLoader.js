import React from 'react'
import {
    Flex,
    Box,
    Text,
    Icon,
    Image,
    Progress,
    Circle,
    Stack,
    Spacer,
    useDisclosure,

  } from '@chakra-ui/react';
import Expand from "../asset/Expand.svg"
import TransactionModal from './TransactionModal/TransactionModal';

const TransactionLoader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <div className='absolute p-4 top-[430px] shadow-md rounded-[12.42px] right-[20px] w-[390px] h-fit-content bg-[white]'>
        <Flex >
            <Text fontSize="18px" fontWeight={"500"}>Bridging in progress</Text>
            <Spacer />
            {/* <Button onClick={onOpen}>
                Trigger modal
            </Button> */}

            {/* <Icon as={Expand} /> */}
                <Image  src={Expand} alt-="expand"/>
        </Flex>
        <Text my={3} fontSize={"14px"} fontWeight="500" >Estimated completion time 01:23PM WAT</Text>
        <Box w="100%" mb="10px" pos="relative" >
            <Circle pos="absolute" size="20px" bottom="-8px" bg="blue" />
            <Box width="90%" mx="auto">
                <Progress  value={30} h="4px" color="blue"  />
            </Box>
            <Circle pos="absolute" right="0" bottom="-8px" size="20px" bg="blue" />
        </Box>
        <Flex bg="bg2" p={3} rounded="10px">
            <Flex>
                <Image src={Expand} alt-="expand"/>
                <Text >Switch to Algorand from you wallet to see your new funds.</Text>
            </Flex>
            <Spacer />
            <Box 
                bg="blue"
                py={2}
                px={3}
                as="button"
                color="white"
                h={"fit-content"}
                rounded="sm"
            >
                Switch
            </Box>
        </Flex>
<TransactionModal />
<div>
        {/* <Button onClick={onOpen}>Trigger modal</Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                ghhjhj
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal> */}
        </div>

    </div>
  )
}

export default TransactionLoader