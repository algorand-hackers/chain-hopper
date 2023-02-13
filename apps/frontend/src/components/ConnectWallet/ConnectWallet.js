import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  Text,
  Image,
  useColorMode
} from '@chakra-ui/react';
import metamask from '../../asset/metamaskLogo.svg';
import phantomLogo from '../../asset/phantomLogo.svg';
// import { toast } from 'react-toastify';
import Images_Icons from '../../constant/icons-images';
import { Chains } from '@chain-hopper/sdk';

// const wallet = [
//   {
//     id: 1,
//     name: 'MetaMask',
//     image: metamask,
//   },
//   {
//     id: 2,
//     name: 'Coinbase',
//     image: coinbase,
//   },
//   {
//     id: 3,
//     name: 'WalletConnect',
//     image: walletConnect,
//   },
// ];

// const peraWallet = new PeraWalletConnect();

const ConnectWallet = ({
  chain,
  algorandAccount,
  otherChainAccount,
  connectMetamask,
  connectToMyAlgo,
  connectPhantom,
  isOpen,
  onClose,
}) => {

  

  const { colorMode } = useColorMode();

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay 
        bg='none'
        backdropFilter='auto'
        backdropInvert='20%'
        backdropBlur='2px'
      />
      <ModalContent
        rounded="18px"
        w={{ base: '20%', md: '500px', lg: '500px' }}
      >
        <ModalBody
          rounded="18px"
          bg={colorMode === 'light' ? '#FFFFFF' : 'bg6' }
          px={6}
          pt={6}
          w={{ base: '100%', md: '100%' }}
        >
          <Text
            fontSize={{ base: '20px', md: '22px', lg: '24px' }}
            fontWeight="500"
          >
            Log in with your wallet
          </Text>

          <Flex
            mx="auto"
            justify={'space-between'}
            flexWrap="wrap"
            w="100%"
            mt={8}
            mb="10px"
          >
            {/* {wallet?.map((item) => ( */}
              {/* -------------------- My Algo Wallet ------------------------ */}
              {!algorandAccount && (<Flex
                direction={'column'}
                display="flex"
                justify="center"
                alignItems="center"
                onClose={onClose}
                onClick={connectToMyAlgo}
                _hover={ colorMode === 'light' ? { bg: '#EFF6FF', borderRadius: '16px', color: "black" } :
                { bg: '#EFF6FF', borderRadius: '16px', color: "black" }
                }
                align="center"
                as="button"
                // key={item.nanoid}
                w="30%"
                mb={8}
                p={4}
              >
                <Image src={Images_Icons.myalgologo} />
                <Box>
                  <Text mt="4px" textAlign={'left'} fontSize="16px">
                   MyAlgo
                  </Text>
                </Box>
              </Flex>)}


              {!!algorandAccount && !otherChainAccount && 
              (<> 
              {!chain || chain === Chains.ETH && (<Flex
                direction={'column'}
                display="flex"
                justify="center"
                alignItems="center"
                onClose={onClose}
                onClick={connectMetamask}
                _hover={ colorMode === 'light' ? { bg: '#EFF6FF', borderRadius: '16px', color: "black" } :
                { bg: '#EFF6FF', borderRadius: '16px', color: "black" }
                }
                align="center"
                as="button"
                // key={item.nanoid}
                w="30%"
                mb={8}
                p={4}
              >
                <Image src={metamask} />
                <Box>
                  <Text mt="4px" textAlign={'left'} fontSize="16px">
                   Metamask
                  </Text>
                 
                </Box>
              </Flex> )}
               
                 {/* -------------------- My Phantom Wallet ------------------------ */}
                 {!chain || chain === Chains.SOL && (<Flex
                direction={'column'}
                display="flex"
                justify="center"
                alignItems="center"
                onClose={onClose}
                onClick={connectPhantom}
                _hover={ colorMode === 'light' ? { bg: '#EFF6FF', borderRadius: '16px', color: "black" } :
                { bg: '#EFF6FF', borderRadius: '16px', color: "black" }
                }
                align="center"
                as="button"
                // key={item.nanoid}
                w="30%"
                mb={8}
                p={4}
              >
                <Image src={phantomLogo} alt="phantom-logo" />
                <Box>
                  <Text mt="4px" textAlign={'left'} fontSize="16px">
                   Phantom
                  </Text>
                </Box>
              </Flex>)}</>)}

              {/* -------------------- Pera Wallet ------------------------ */}
              {/* <Flex
                direction={'column'}
                display="flex"
                justify="center"
                alignItems="center"
                // onClick={}
                _hover={{ bg: '#EFF6FF', borderRadius: '16px' }}
                align="center"
                as="button"
                // key={item.nanoid}
                w="30%"
                mb={8}
                p={4}
              >
                <Image src={metamask} />
                <Box>
                  <Text mt="4px" textAlign={'left'} fontSize="16px">
                  Coming 
                  </Text>
                </Box>
              </Flex> */}
            {/* ))} */}
          </Flex>
        </ModalBody>
      </ModalContent>
   </Modal>
  );
};

export default ConnectWallet;
