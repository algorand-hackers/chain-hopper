import React from 'react';
import {
  Flex,
  Box,
  Stack,
  Text,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import SelectNetwork from './SelectNetwork';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import SelectToken from './SelectToken/selectToken';
import Algo from '../asset/AlgorandIcon.svg';
import Btn2 from './UI/Btn2';
import TransactionLoader from './TransactionLoader';
import TokenRoute from '../constant/TokenRoute';

const Withdrawer = ({
  selected,
  setSelected,
  tokenIcon,
  setTokenIcon,
  walletIcon,
  setWalletConnected,
  setWalletIcon,
  isOpen,
  onOpen,
  onClose,
  networks,
  setSelectToken,
  selectToken,
  setIsTransac,
  walletConnected,
  tranferBtn,
  setTranferBtn,
}) => {
  const connectWallet = () => {
    onOpen();
  };

  return (
    <>
      <Box pt={3}>
        <Text mb="6px">From Algorand</Text>
        <Flex
          p={3}
          justify="space-between"
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
          border="1px solid #E2E8F0"
          w={'100%'}
        >
          <Flex gap={2}>
            <Image src={Algo} alt="algo" />
            <Text pt="4px" fontSize="17px">Algorand</Text>
          </Flex>
          <Text color="#2D8EFF" pt="4px" fontSize="14px">Balance: 34,678,785 Algo</Text>
        </Flex>
        <Box mt="-1px">
          <SelectToken
            networks={networks}
            setSelectToken={setSelectToken}
            selectToken={selectToken}
            walletIcon={walletIcon}
            setWalletIcon={setWalletIcon}
            setIsTransac={setIsTransac}
          />
        </Box>

        {/* ------------------- SELECT NETWORK -------------------- */}
        <Box mb={4}>
          <Text mb="6px" mt={'30px'}>
            To this network
          </Text>
          <Box bgColor="#EFF6FF" borderRadius="9.11545px">
          <SelectToken
            networks={networks}
            setSelectToken={setSelectToken}
            selectToken={selectToken}
            walletIcon={walletIcon}
            setWalletIcon={setWalletIcon}
            setIsTransac={setIsTransac}
          />
          </Box>
        </Box>

        {/* ------------------- Connect Wallet -------------------- */}
{/* 
        {!walletConnected ? (
          <>
            <Box onClick={connectWallet}>
              <Btn2 text="Connect" />
            </Box>
          </>
        ) : (
          <Box mt={"-8px"} mb={6}>
            <TokenRoute />
          </Box>
        )} */}

        {/* <ConnectWallet
          walletIcon={walletIcon}
          setWalletConnected={setWalletConnected}
          setWalletIcon={setWalletIcon}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        /> */}

        {/* ------------------- Transper Button -------------------- */}

        <Box
          as="button"
          bg="linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)"
          w="100%"
          h="49.65px"
          color="white"
          borderRadius={'9.11545px'}
          onClick={() => setTranferBtn(true)}
        >
          Transfer
        </Box>
        {tranferBtn && <TransactionLoader />}
      </Box>
    </>
  );
};

export default Withdrawer;
