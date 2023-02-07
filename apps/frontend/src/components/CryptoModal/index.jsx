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
  useColorMode,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { networks, crypto } from '../../constant/networksJSON';
import { nanoid } from "nanoid";
import {allSupportedChains, supportedAssetsByChain} from '@chain-hopper/sdk';
import { NetworkType } from '@chain-hopper/sdk/types';


const CryptoModal = ({ isOpen, onClose, setSelectToken, setWalletIcon, setIsTransac }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);

  const chains = allSupportedChains();
// alert(JSON.stringify(supportedAssetsByChain(chains[1], NetworkType.MAINNET)));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCrypto, setFilteredCrypto] = useState(crypto);
  const { colorMode } = useColorMode();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredCrypto(
      crypto.filter((c) => c.name.includes(searchTerm.toLocaleLowerCase))
    );
  };

  const { search, font } = useCryptoModalStyles();

  return (
    <>
      {/* <Button onClick={() => setIsOpen(true)}>Show Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={{ base: '90vw', md: '30vw' }}
          borderRadius={16}
          p={'1%'}
          bg={colorMode === 'light' ? '#FFFFFF' : 'bg6'}
        >
          <ModalHeader
           color={colorMode === 'light' ? 'black' : 'white'}
           fontWeight="600" 
           fontSize={'18px'}
           >
            Ethereum network tokens
          </ModalHeader>
          <ModalCloseButton mt={5} />
          <InputGroup
            _focus={{ boxShadow: 'none' }}
            as="button"
            bg={'#F7F7F8'}
            borderRadius="9.11545px"
          >
            <InputLeftElement
              pointerEvents="none"
              cursor={'pointer'}
              children={<Icon as={SearchIcon} color="black" />}
            />
            <Input
              {...font}
              value={searchTerm}
              // onChange={(e) => {
              //     setSearchValue(e.target.value);
              // }}
              onChange={handleSearch}
              color={colorMode === 'light' ? 'black' : 'white' }
              placeholder="Search token name.."
              _placeholder={ colorMode === 'light' ? { color: '' } : { color: 'white'}}
              borderRadius="9.11545px"
              borderWidth="0"
            />
          </InputGroup>
          <ModalBody mt={5}>
            {crypto?.map((c) => (
              <Flex
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                key={c.nanoid}
                mb={5}
                cursor="pointer"
                onClick={e => {
                  setSelectToken(c.symbol)
                  setWalletIcon(c.imageUrl)
                  onClose()
                  setIsTransac(true)
                }}
              >
                <Flex>
                  <Image src={c?.imageUrl} w="48px" h="48px" mr={5} />
                  <Box>
                    <Text fontWeight={'700'} 
                      color={colorMode === 'light' ? 'black' : 'white'}
                      >
                        {c.symbol}
                      </Text>
                    <Text
                     color={colorMode === 'light' ? '#404040' : 'white'}
                     >{c.name}</Text>
                  </Box>
                </Flex>
                <Text color={colorMode === 'light' ? '#404040' : 'white'}  fontSize="lg">
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
      fontSize: ['14px', '14px', '14px', '16px', '16px'],
      // lineHeight: "19px",
    },
    search: {
      w: '100%',
      h: '40px',
      background: '#F6F6F6',
      borderRadius: '53px',
      justify: 'flex-start',
      align: 'center',
      pl: '1%',
    },
  };
};
