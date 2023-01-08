import React, { useState } from 'react';
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
    image: metamask,
  },
  {
    id: 2,
    name: 'Coinbase',
    image: coinbase,
  },
  {
    id: 3,
    name: 'WalletConnect',
    image: walletConnect,
  },
  {
    id: 4,
    name: 'MetaMask',
    image: metamask,
  },
  {
    id: 5,
    name: 'Coinbase',
    image: coinbase,
  },
  {
    id: 6,
    name: 'WalletConnect',
    image: walletConnect,
  },
  {
    id: 7,
    name: 'MetaMask',
    image: metamask,
  },
  {
    id: 8,
    name: 'Coinbase',
    image: coinbase,
  },
  {
    id: 9,
    name: 'WalletConnect',
    image: walletConnect,
  },
];

const ConnectWallet = ({
  walletIcon,
  setWalletIcon,
  setSelectWallet,
  selectWallet,
  isOpen,
  onOpen,
  setWalletConnected,
  onClose,
}) => {

  const [isActive, setIsActive] = useState(false);
  const [icon, setIcon] = useState(false);

  const connectWallet = () => {
    onClose()
    setWalletConnected(true)
    // setIsConnect(false)
}
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        rounded="18px"
        w={{ base: '90%', md: '500px', lg: '500px' }}
      >
        <ModalBody
          rounded="18px"
          bg="white"
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
            {wallet?.map((item) => (
              <Flex
                direction={'column'}
                onClick={connectWallet}
                align="center"
                as="button"
                key={item.id}
                w="30%"
                mb={8}
              >
                <Image src={item.image} />
                <Box>
                  <Text mt="4px" textAlign={'left'} fontSize="16px">
                    {item.name}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWallet;
