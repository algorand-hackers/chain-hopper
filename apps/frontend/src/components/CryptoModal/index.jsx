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
  Spacer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const crypto = [
  {
    id: 1,
    name: 'ethereum',
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
    name: 'usdt',
    symbol: 'USDT',
    amount: '104.29',
    imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=002',
  },

  {
    id: 4,
    name: 'aave',
    symbol: 'AAVE',
    amount: '20.82',
    imageUrl: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=024',
  },
  {
    id: 5,
    name: 'uniswap',
    symbol: 'UNI',
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

  const {search, font} = useCryptoModalStyles();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay  />
        <ModalContent  w={{base: "90vw", md: "30vw"}}
         borderRadius={16}
         p={"1%"}
         >
          <ModalHeader color={"#404040"} 
          fontWeight="600" 
          fontSize={"18px"}
          >
            Ethereum network tokens
          </ModalHeader>
          <ModalCloseButton mt={5} />
                <InputGroup _focus={{boxShadow: "none"}} as="button" bg={"#F7F7F8"} borderRadius="9.11545px">
                    <InputLeftElement
                        pointerEvents="none"
                        cursor={"pointer"}
                        children={<Icon as={SearchIcon} color="black"/>}
                    />
                      <Input
                          {...font}
                          value={searchTerm}
                          // onChange={(e) => {
                          //     setSearchValue(e.target.value);
                          // }}
                          onChange={handleSearch}
                          placeholder="Search token name.."
                          _placeholder={{ color: "black" }}
                          borderRadius="9.11545px"
                          borderWidth="0"
                      />
                  </InputGroup>
          <ModalBody mt={5}>
            {crypto.map((c) => (
              <Flex
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={5}
              >
                <Flex>
                  <Image src={c.imageUrl} w="48px" h="48px" mr={5} />
                  <Box>
                    <Text fontWeight={"700"}>{c.symbol}</Text>
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


export const useCryptoModalStyles = () => {
    return {
        font: {
            fontSize: ["14px", "14px", "14px", "16px", "16px"],
            // lineHeight: "19px",
         },
           search: {
            w: "100%",
            h: "40px",
            background: "#F6F6F6",
            borderRadius: "53px",
            justify: "flex-start",
            align: "center",
            pl: "1%",
        },
    }

};