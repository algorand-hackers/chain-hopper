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
} from '@chakra-ui/react';
import metamask from '../../asset/metamask.svg';
import coinbase from '../../asset/coinbase.svg';
import walletConnect from '../../asset/walletConnect.svg';
// import { toast } from 'react-toastify';
// import {PeraWalletConnect} from "@perawallet/connect"


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
];

// const peraWallet = new PeraWalletConnect();

const ConnectWallet = ({
  currentAccount,
  connectWallet,
  walletIcon,
  isOpen,
  onOpen,
  onClose,
}) => {

  // const [isActive, setIsActive] = useState(false);
  // const [icon, setIcon] = useState(false);
  // const [walletAddress, setWalletAddress] = useState("")
  
  // Store account address which is connected dApp with Pera Wallet
  // const [accountAddress, setAccountAddress] = (useState < string) | (null > null);
  //  // Check app is connected with Pera Wallet
	// const isConnectedToPeraWallet = !!accountAddress;
  
   //useEffect for Pera Wallet
  // useEffect(() => {
  //   // Reconnect to the session when the component is mounted
  //   peraWallet.reconnectSession().then((accounts) => {
  //     // Setup the disconnect event listener
  //     peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

  //     if (accounts.length) {
  //       setAccountAddress(accounts[0]);
  //     }
  //   });
  // }, []);
  // const {  connectWallet } = useContext(TransactionContext);


  // function handleConnectWalletClick() {
  //   peraWallet
  //     .connect()
  //     .then((newAccounts) => {
  //       // Setup the disconnect event listener
  //       peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

  //       setAccountAddress(newAccounts[0]);
  //     })
  //     .reject((error) => {
  //       // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
  //       // For the async/await syntax you MUST use try/catch
  //       if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
  //         // log the necessary errors
  //         console.log(error);
  //          toast.error('error connecting to Pera wallet', {
  //          position: toast.POSITION.TOP_CENTER, 
  //          autoClose: 5000
  //         });
  //       }
  //     });
  // }

//   function handleDisconnectWalletClick() {
// 	peraWallet.disconnect();
// 	setAccountAddress(null);
// }


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
            {/* {wallet?.map((item) => ( */}
              <Flex
                direction={'column'}
                onClose={onClose}
                onClick={connectWallet}
                _hover={{ bg: '#3D68FF', borderRadius: '16px', color: "white" }}
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
              </Flex>
               
               {/* -------------------- Pera Wallet */}
              {/* <Flex
                direction={'column'}
                onClick={
                  isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
                }
                _hover={{ bg: '#3D68FF', borderRadius: '16px', color: "white" }}
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
                   Pera Wallet
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
