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
  useColorMode
} from '@chakra-ui/react';
import SelectToken from './SelectToken/selectToken';
import Algo from '../asset/AlgorandIcon.svg';
import TransactionLoader from './TransactionLoader';
import TokenRoute from '../constant/TokenRoute';
import { NetworkType, supportedWithdrawalAssets } from '@chain-hopper/sdk';
import SelectNetwork from './SelectNetwork';
import { Eth } from '../asset';

const Withdrawer = ({
  otherChainBalance,
  algoChainBalance,
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
  selectTokenSymbol,
  setSelectTokenSymbol,
  selectTokenLogo,
  setSelectTokenLogo,
  setIsTransac,
  walletConnected,
  tranferBtn,
  setTranferBtn,
  network,
}) => {

  const connectWallet = () => {
    onOpen();
  };

  const { colorMode } = useColorMode();

  return (
    <>
      <Box pt={3}>
        <Text mb="6px"
         color={ colorMode === 'light' ? 'black' : 'white'} 
         >
          From Algorand Chain
        </Text>
        {selectTokenSymbol  && (
        <Flex
          p={3}
          justify="space-between"
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
          border="1px solid #E2E8F0"
          w={'100%'}
        >
          <Flex gap={2}>
          <Image src={selectTokenLogo} w="48px" h="48px" mr={5} />
            <Text pt="4px" fontSize="17px" 
            color={ colorMode === 'light' ? 'black' : 'white'}
            >
              {selectTokenSymbol}
            </Text>
          </Flex>
          <Text color="#2D8EFF" pt="4px" fontSize="14px">Balance: {algoChainBalance}</Text>
        </Flex>)}
        <Box mt="-1px">
          <SelectToken
            selectTokenBalance={algoChainBalance}
            tokens={supportedWithdrawalAssets(network)}
            network={network}
            chain={selected}
            isWithdrawal={true}
            setSelectToken={setSelectToken}
            selectToken={selectToken}
            walletIcon={walletIcon}
            setWalletIcon={setWalletIcon}
            setIsTransac={setIsTransac}
            selectTokenLogo={selectTokenLogo}
            setSelectTokenLogo={setSelectTokenLogo}
            selectTokenSymbol={selectTokenSymbol}
            setSelectTokenSymbol={setSelectTokenSymbol}
          />
        </Box>

            {/* ------------------- SELECT NETWORK -------------------- */}
        <Box mb={4}>
          {selected && <Text mb="6px" mt={'30px'} color={ colorMode === 'light' ? 'black' : 'white'} >
            To {selected} chain
          </Text>}
          <Box
           bgColor= { colorMode === 'light' ? "#EFF6FF" : "#202020" } 
           borderRadius="9.11545px"
          >
            <Flex zIndex={2} mt={'10px'}>
              <SelectNetwork
                network={network}
                selectToken={selectToken}
                selected={selected || 'Select To Chain'}
                setSelected={setSelected}
                BackgroundColor="#fff"
                tokenIcon={tokenIcon}
                setTokenIcon={setTokenIcon}
              />
            </Flex>

            <Box
              border="1px solid #E2E8F0"
              w={'100%'}
              borderTopRightRadius="10px"
              borderTopLeftRadius="10px"
              mt={4}
              p={4}
            >
              <Flex justifyContent="space-between" >
                <Flex>
                <Image src={Eth} />
                <Text pt="4px" ml={2}
                  color={ colorMode === 'light' ? 'black' : 'white'} 
                  >
                  {selected} Chain
                  </Text>
                </Flex>
                <Text color={ colorMode === 'light' ? 'black' : 'white'} ><span className="text-[#A0AEC0] mr-2 text-xs">Balance:</span>{otherChainBalance}</Text>
              </Flex>
            </Box>
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
