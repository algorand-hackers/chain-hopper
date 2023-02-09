import { lazy, Suspense, useState, useEffect, useContext } from 'react';
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
  useColorMode,
} from '@chakra-ui/react';
import SelectNetwork from '../../components/SelectNetwork';
import SelectToken from '../../components/SelectToken/selectToken';
import TokenRoute from '../../constant/TokenRoute';
import AlgoTranc from '../../asset/AlgoTran.svg';
import TransactionLoader from '../../components/TransactionLoader';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import Btn2 from '../../components/UI/Btn2';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import Algo from '../../asset/AlgorandIcon.svg';
import { networks } from '../../constant/networksJSON';
import wallet from '../../asset/ETH - Ethereum Token.png';
import Withdrawer from '../../components/Withdrawer';
import { Eth } from '../../asset';
import { getEtherBalance } from '../../context/main';
import { TransactionContext } from "../../context/TransactionContext";
// const NetworkSelector = lazy(
//   () => import("../../components/NetworkSelector")
// );

const Bridge = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pinTokenBalance, setpinTokenBalance] = useState(0);
   const { colorMode } = useColorMode();
  // const connectWallet = () => {
  //   onOpen();
  //   // setIsConnect(false)
  // };

const [chain, setChain] = useState('')

  const { currentAccount, connectToMyAlgo, disconnectWallet } = useContext(TransactionContext);

  useEffect(()=>{
      getEtherBalance(currentAccount, setpinTokenBalance).then(data=>{console.log(pinTokenBalance)})
   
  } )
  

  const { root, fontsm } = useBridgeStyles();

  // This is to select Network
  const [selected, setSelected] = useState('Select Network');
  const [tokenIcon, setTokenIcon] = useState();
  // This is to select Token
  const [selectToken, setSelectToken] = useState('ETH');
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
    <Flex 
      flexDir={'column'} 
      h="100%"
      bg={ colorMode === 'light' ? 'bg1' : 'bg3'}  
      >
      <Stack {...root} maxW="1600px" mx="auto" pos="relative">
        <Box
          bg={ colorMode === 'light' ? 'rgba(255, 255, 255, 0.97)' : 'bg4'}  
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
            <TabList padding="10px" 
             bg={ colorMode === 'light' ? '#EDF2FA' : 'bg5'}  
             borderRadius={'9.11545px'}
             >
              <Tab
                // _selected={{ color: 'black', bg: '#FFFFFF' }}
                _selected={ colorMode === 'light' ? { color: 'black', bg: '#FFFFFF' } : { color:'white', bg:'#3A6FFF' }  }
                color={ colorMode === 'light' ? 'black' : 'white'}  
                fontWeight={'500'}
                w={'50%'}
                px={2}
                h={'40px'}
                borderRadius={'9.11545px'}
              >
                Deposit
              </Tab>
              <Tab
                _selected={ colorMode === 'light' ? { color: 'black', bg: '#FFFFFF' } : { color:'white', bg:'#3A6FFF' }  }
                color={ colorMode === 'light' ? 'black' : 'white'}  
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
                    <Text fontSize="14px" 
                     mb={-1}
                     color={ colorMode === 'light' ? 'black' : 'white'} 
                    >
                      From the chain
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
                        <Text color={ colorMode === 'light' ? 'black' : 'white'} ><span className="text-[#A0AEC0] mr-2 text-xs">Balance:</span>{pinTokenBalance}</Text>
                      </Flex>
                    </Box>

                    {/* {!walletConnected ? (
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
                    ) : ( */}
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
                    {/* )} */}

                    {/* ------------------------ BRIDGING ---------------------- */}

                    <Flex flexDir={'column'} mt={'15px'} mb="10px">
                      <Text {...fontsm} mb={2} color={ colorMode === 'light' ? 'black' : 'white'}>
                        To Algorand
                      </Text>

                      <Box
                        bg={ colorMode === 'light' ? '#EFF6FF' : '#232323'} 
                        w="100%"
                        h="36px"
                        p={6}
                        color="dark"
                        borderRadius={'9.11545px'}
                        flexDir={'column'}
                      >
                        <Flex justifyContent="space-between" alignItems="center" mt="-15px">
                        <Flex>
                        <Image src={Algo} />
                        <Text pt="4px" ml={2}
                         color={ colorMode === 'light' ? 'black' : 'white'} 
                         >
                          Algorand Chain
                         </Text>
                        </Flex>
                        <Text color={ colorMode === 'light' ? 'black' : 'white'}>
                          <span className="text-[#A0AEC0] mr-2 text-xs">
                            Balance:</span>0.00000000
                          </Text>
                      </Flex>
                      </Box>
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
