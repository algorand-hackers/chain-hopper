import React from 'react'
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
  import metamask from '../../asset/metamask.svg';
  import coinbase from '../../asset/coinbase.svg';
  import walletConnect from '../../asset/walletConnect.svg';

  const wallet = [
    {
      id: 1,
      name: 'MetaMask',
      desc: 'Connect using browser wallet',
      image: metamask,
    },
    {
      id: 2,
      name: 'Coinbase',
      desc: 'Connect using Coinbase wallet',
      image: coinbase,
    },
    {
      id: 3,
      name: 'WalletConnect',
      desc: 'Connect using mobile wallet',
      image: walletConnect,
    },
  ];
const ConnectWallet = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}  isCentered>
        <ModalOverlay />
        <ModalContent rounded="18px" w={{base:"90%", md:"400px"}}>
          <ModalBody rounded="18px" bg="white" px={6} pt={6}  w={{base:"100%", md:"100%"}}>
            <Text fontSize={{base:"20px", md:"22px", lg:"24px"}} fontWeight="500">
                Log in with your wallet
            </Text>
           
            <Box mx="auto" w="100%" mt={8} mb="10px" >
                {wallet.map((item) => (
                  <Box as="button" key={item.id}  mb={8}>
                    <Flex gap={5}>
                      <Image src={item.image} />
                        <Box>
                            <Text textAlign={"left"} fontWeight="700" fontSize="16px" >{item.name}</Text>
                            <Text textAlign={"left"} color="dark" fontSize="14px" >{item.desc}</Text>
                        </Box>
                    </Flex>
                  </Box>
                ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ConnectWallet