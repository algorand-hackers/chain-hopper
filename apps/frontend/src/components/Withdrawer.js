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
          rounded={'lg'}
          justify="space-between"
          w="100%"
          borderBottomRadius={0}
          border="2px #E5E5E5 solid"
        >
          <Flex gap={3}>
            <Image src={Algo} alt="algo" />
            <Text fontSize={'20px'}>Algorand Chain</Text>
          </Flex>
          <Text color="#2D8EFF">Balance: 34,678,785 Algo</Text>
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
          <Box bg="bg2">
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
        )}

        <ConnectWallet
          walletIcon={walletIcon}
          setWalletConnected={setWalletConnected}
          setWalletIcon={setWalletIcon}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />

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
