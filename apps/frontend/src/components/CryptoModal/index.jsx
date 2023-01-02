import React, {useState} from 'react'
import {  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  Image, 
  Text, Button, Box, Flex } from "@chakra-ui/react";
const CryptoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  
  const crypto = [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: '0.8',
      imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
      name: 'xrp',
      symbol: 'XRP',
      amount: '23,060.45',
      imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=002'
    },
    {
      name: 'USDT',
      symbol: 'USDT',
      amount: '104.29',
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=002'
    },
 
 

    {
      name: 'AAVE',
      symbol: 'aave',
      amount: '20.82',
      imageUrl: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=024'
    },
    {
      name: 'UNI',
      symbol: 'uniswap',
      amount: '0.8',
      imageUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=024'
    }
  ];
  return (
    <>
   <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

<Modal isOpen={isOpen} onClose={onClose} >
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Ethereum network tokens</ModalHeader>
    <ModalCloseButton />
    <ModalBody >
      {crypto.map(c => (
        <Flex d="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Flex>
          <Image src={c.imageUrl} width="48px" mr={5} />
          <Box>
          <Text>{c.symbol}</Text>
          <Text color="#404040">{c.name}</Text>
          </Box>
          </Flex>
          <Text color="#404040" fontSize="lg"> {c.amount}</Text>
        </Flex>
      ))}
    </ModalBody>
    
  </ModalContent>
</Modal>
    </>
  )
}

export default CryptoModal