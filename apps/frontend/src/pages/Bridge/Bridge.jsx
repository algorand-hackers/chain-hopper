import { lazy, Suspense, useState } from 'react';
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
import SelectNetwork from '../../components/SelectNetwork';
import SelectToken from '../../components/SelectToken/selectToken';
import TokenRoute from '../../constant/TokenRoute';
import AlgoTranc from '../../asset/AlgoTran.svg';
import TransactionLoader from '../../components/TransactionLoader';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import Btn2 from '../../components/UI/Btn2';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';

import { networks } from '../../constant/networksJSON';
import wallet from '../../asset/ETH - Ethereum Token.png';
import Withdrawer from '../../components/Withdrawer';

// const NetworkSelector = lazy(
//   () => import("../../components/NetworkSelector")
// );

const Bridge = ({ isConnect }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectWallet = () => {
    onOpen();
    // setIsConnect(false)
  };

  const { root, fontsm } = useBridgeStyles();

  // This is to select Network
  const [selected, setSelected] = useState('Select Network');
  const [tokenIcon, setTokenIcon] = useState();
  // This is to select Token
  const [selectToken, setSelectToken] = useState('Eth');
  const [walletIcon, setWalletIcon] = useState(wallet);
  // This is for the connect button on the component to start it
  const [walletConnected, setWalletConnected] = useState(false);
  // This useState is to display the transaction histroy before making transaction
  const [isTransac, setIsTransac] = useState(false);
  // transre button
  const [tranferBtn, setTranferBtn] = useState(false);

  //   const networkData = networks.map((data) => {
  //   return { id: nanoid(), ...data };
  // });

  return (
    <Flex flexDir={'column'} h="100%">
      <Stack {...root} maxW="1600px" mx="auto" pos="relative">
        <Box
          bg="rgba(255, 255, 255, 0.97)"
          w={{ base: '95%', md: '520px', lg: '590px' }}
          pos="relative"
          h="fit-content"
          color="dark"
          borderRadius={'16px'}
          flexDir={'column'}
          paddingX={'10px'}
          pt="10px"
        >
          {/* ----------------------------------- TOP BUTTON TAB  [DEPOSIT & WITHDRAW] --------------------------------------------- */}
          <Tabs variant="unstyled">
            <TabList padding="10px" bg={'#EDF2FA'} borderRadius={'9.11545px'}>
              <Tab
                _selected={{ color: 'black', bg: '#FFFFFF' }}
                color="black"
                fontWeight={'500'}
                w={'50%'}
                px={2}
                h={'40px'}
                borderRadius={'9.11545px'}
              >
                Deposit
              </Tab>
              <Tab
                _selected={{ color: 'black', bg: '#FFFFFF' }}
                color="black"
                fontWeight={'500'}
                w={'50%'}
                px={2}
                h={'40px'}
                borderRadius={'9.11545px'}
              >
                Withdraw
              </Tab>
            </TabList>
            <TabPanels>
              {/* --------------------- TAB ONE DETAILS -------------------------- */}
              <TabPanel>
                <Suspense fallback={<Spinner size="sm" />}>
                  <Flex flexDir={'column'} padding={'5px'}>
                    <Text fontSize="14px" mb={-1}>
                      From the network
                    </Text>

                    {/* ------------------- SELECT NETWORK -------------------- */}
                    <Flex zIndex={2} mt={'10px'}>
                      <SelectNetwork
                        selected={selected}
                        setSelected={setSelected}
                        BackgroundColor="#fff"
                        tokenIcon={tokenIcon}
                        setTokenIcon={setTokenIcon}
                      />
                    </Flex>

                    {!walletConnected ? (
                      <>
                        <Box onClick={connectWallet}>
                          <Btn2 text="Connect Wallet" />
                        </Box>
                      </>
                    ) : (
                      <div></div>
                    )}

                    {!walletConnected ? (
                      <>
                        <div></div>
                      </>
                    ) : (
                      <Flex zIndex={1} mt={'-1px'}>
                        <SelectToken
                          networks={networks}
                          setSelectToken={setSelectToken}
                          selectToken={selectToken}
                          walletIcon={walletIcon}
                          setWalletIcon={setWalletIcon}
                          setIsTransac={setIsTransac}
                        />
                      </Flex>
                    )}

                    {/* Connect Wallet  */}

                    <ConnectWallet
                      walletIcon={walletIcon}
                      setWalletConnected={setWalletConnected}
                      setWalletIcon={setWalletIcon}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                    />

                    {/* ------------------------ BRIDGING ---------------------- */}

                    <Flex flexDir={'column'} mt={'15px'} mb="10px">
                      <Text {...fontsm} mb={2}>
                        To Algorand
                      </Text>

                      <Box
                        bg={'#EFF6FF'}
                        w="100%"
                        h="36px"
                        pt="4px"
                        color="dark"
                        borderRadius={'9.11545px'}
                        flexDir={'column'}
                      ></Box>
                    </Flex>

                    {/* -------------------- TOKEN ROUTE DETAILS ---------------------- */}

                    {isTransac && <TokenRoute />}
                  </Flex>
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
                </Suspense>
              </TabPanel>

              {/* ----------------------------------- Withdraw --------------------------------------------- */}

              <TabPanel>
                <Withdrawer
                  selected={selected}
                  setSelected={setSelected}
                  tokenIcon={tokenIcon}
                  setTokenIcon={setTokenIcon}
                  // ConnectWallet Props

                  walletIcon={walletIcon}
                  setWalletConnected={setWalletConnected}
                  setWalletIcon={setWalletIcon}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}

                  // Select Token

                  networks={networks}
                  setSelectToken={setSelectToken}
                  selectToken={selectToken}
                  
                  setIsTransac={setIsTransac}

                  // connect to wallet

                  walletConnected={walletConnected}

                  // Transfer useState
                  tranferBtn={tranferBtn}
                  setTranferBtn={setTranferBtn}
                />

               
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* -------------------- TRANSFER BUTTON ---------------------- */}
        </Box>
        {/* ----------------------------------- TRANSACTION lOADER --------------------------------------------- */}
      </Stack>
    </Flex>
  );
};

export default Bridge;

export const useBridgeStyles = () => {
  return {
    root: {
      w: '100%',
      h: '100%',
      alignItems: 'center',
      pt: '7%',
    },
    root2: {
      w: '100%',
      h: '48px',
      align: 'center',
      justify: 'center',
      px: '0px',
      bg: '#FFFFFF',
      borderWidth: '1px solid',
      borderColor: '#E5E5E5',
      outline: 'none',
      borderRadius: '10px 10px 0px 0px',
    },
    root3: {
      w: '100%',
      h: '48px',
      align: 'center',
      justify: 'center',
      px: '0px',
      bg: '#FFFFFF',
      borderWidth: '1px solid',
      borderColor: '#E5E5E5',
      outline: 'none',
      borderRadius: '0px 0px 10px 10px',
    },
    fontsm: {
      fontSize: '13.6732px',
      lineHeight: '22px',
      fontWeight: '400',
      color: '#404040',
    },
    networkSelect: {
      w: {
        base: '100%',
        md: '100%',
      },
      bg: '#FFFFFF',
      color: 'dark',
      borderColor: '1px solid rgba(0, 0, 0, 0.08)',
      borderWidth: '1px',
      align: 'center',
      borderRadius: '10px 10px 0px 0px',
    },
    networkSelect2: {
      w: {
        base: '100%',
        md: '100%',
      },
      bg: '#FFFFFF',
      color: 'dark',
      borderColor: '1px solid rgba(0, 0, 0, 0.08)',
      borderWidth: '1px',
      align: 'center',
      borderRadius: '0px 0px 10px 10px',
    },
  };
};
