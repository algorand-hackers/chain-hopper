import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Button,
  Box,
  Flex,
  Input,
  Icon,
  InputGroup,
  InputLeftElement,

} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const crypto = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '0.8',
    imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    id: 2,
    name: 'xrp',
    symbol: 'XRP',
    amount: '23,060.45',
    imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=002',
  },
  {
    id: 3,
    name: 'USDT',
    symbol: 'USDT',
    amount: '104.29',
    imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=002',
  },

  {
    id: 4,
    name: 'AAVE',
    symbol: 'aave',
    amount: '20.82',
    imageUrl: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=024',
  },
  {
    id: 5,
    name: 'UNI',
    symbol: 'uniswap',
    amount: '0.8',
    imageUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=024',
  },
];

const CryptoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCrypto, setFilteredCrypto] = useState(crypto);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredCrypto(crypto.filter((c) => c.name.includes(searchTerm.toLocaleLowerCase)));
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ModalOverlay />
        <ModalContent mx={8}>
          <ModalHeader>Ethereum network tokens</ModalHeader>
          <ModalCloseButton />
          
            <InputGroup>
    <InputLeftElement
    mx={8}
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input  p={6}
            variant="filled"
            placeholder="Search token name.."
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch} 
            mx={7}/>
  </InputGroup>


          <ModalBody>
            {crypto.map((c) => (
              <Flex
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={5}
              >
                <Flex>
                  <Image src={c.imageUrl} width="48px" mr={5} />
                  <Box>
                    <Text>{c.symbol}</Text>
                    <Text color="#404040">{c.name}</Text>
                  </Box>
                </Flex>
                <Text color="#404040" fontSize="lg">
                  {' '}
                  {c.amount}
                </Text>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CryptoModal;
