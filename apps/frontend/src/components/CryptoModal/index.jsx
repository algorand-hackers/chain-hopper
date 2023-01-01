import React, {useState} from 'react'
import {  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  Image, 
  Text, Button, Box } from "@chakra-ui/react";
const CryptoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  
  const crypto = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: '0.01',
      imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: '0.5',
      imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
      name: 'Litecoin',
      symbol: 'LTC',
      amount: '1',
      imageUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png'
    },
    {
      name: 'Ripple',
      symbol: 'XRP',
      amount: '20',
      imageUrl: 'https://cryptologos.cc/logos/ripple-xrp-logo.png'
    },
    {
      name: 'Monero',
      symbol: 'XMR',
      amount: '0.1',
      imageUrl: 'https://cryptologos.cc/logos/monero-xmr-logo.png'
    },
    {
      name: 'Dogecoin',
      symbol: 'DOGE',
      amount: '100',
      imageUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png'
    }
  ];
  return (
    <>
  <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Crypto Holdings</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {crypto.map(c => (
        <Box d="flex" alignItems="center" mb={5}>
          <Image src={c.imageUrl} size={2} mr={5} />
          <Text fontSize="lg">{c.symbol}: {c.amount}</Text>
        </Box>
      ))}
    </ModalBody>
    
  </ModalContent>
</Modal>
    </>
  )
}

export default CryptoModal