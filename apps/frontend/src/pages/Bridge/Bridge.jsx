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
import { getAlgoBalance, getEtherBalance, getSolBalance } from '../../context/main';
import { TransactionContext } from "../../context/TransactionContext";
import { AssetKeys, Chains, NetworkType, supportedDepositAssetsByChain } from '@chain-hopper/sdk';
// const NetworkSelector = lazy(
//   () => import("../../components/NetworkSelector")
// );

const Bridge = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositTokenBalanceOnOtherChain, setDepositTokenBalanceOnOtherChain] = useState(0);
  const [withdrawalTokenBalanceOnOtherChain, setWithdrawalTokenBalanceOnOtherChain] = useState(0);
  const [algoChainBalOfDepositToken, setAlgoChainBalOfDepositToken] = useState(5000);
  const [algoChainBalOfWithdrawalToken, setAlgoChainBalOfWithdrawalToken] = useState(5000);


   const { colorMode } = useColorMode();
  // const connectWallet = () => {
  //   onOpen();
  //   // setIsConnect(false)
  // };

  const { algorandAccount, otherChainAccount, otherWalletProvider} = useContext(TransactionContext);

  

  const { root, fontsm } = useBridgeStyles();

  // This is to select Network
  const [selected, setSelected] = useState('');
  const [selectedWithdrawToChain, setSelectedWithdrawToChain] = useState('');

  const [tokenIcon, setTokenIcon] = useState();
  // This is to select Token
  const [selectToken, setSelectToken] = useState('Asset');
  const [selectTokenLogo, setSelectTokenLogo] = useState('');
  const [selectTokenSymbol, setSelectTokenSymbol] = useState('');

  const [selectedTokenToWithdraw, setSelectedTokenToWithdraw] = useState('Asset');
  const [selectedTokenToWithdrawLogo, setSelectedTokenToWithdrawLogo] = useState('');
  const [selectedTokenToWithdrawSymbol, setSelectedTokenToWithdrawSymbol] = useState('');

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

  useEffect(()=>{
    if(otherChainAccount  && algorandAccount){
      // Algorand balances
      if(selectToken  ===  AssetKeys.xALGO_Glitter){
        getAlgoBalance(NetworkType.TESTNET, algorandAccount, setAlgoChainBalOfDepositToken);
      }

      // Other chain balances
      if(selected === Chains.ETH  && selectToken === AssetKeys.ETH && otherWalletProvider)  {
        getEtherBalance(otherWalletProvider, otherChainAccount, setDepositTokenBalanceOnOtherChain);
      }
      else if(selected === Chains.SOL  && selectToken === AssetKeys.SOL) {
        getSolBalance(NetworkType.TESTNET, otherChainAccount, setDepositTokenBalanceOnOtherChain);
      }
    }
      else 
        setDepositTokenBalanceOnOtherChain(0);
  },[selectToken, selected, otherWalletProvider, otherChainAccount, algorandAccount]);

  useEffect(()=>{
    if(otherChainAccount && algorandAccount){
      // Algorand balances
      if(selectedTokenToWithdraw  ===  AssetKeys.ALGO){
        getAlgoBalance(NetworkType.TESTNET, algorandAccount, setAlgoChainBalOfWithdrawalToken);
      }

      //  Other chain balances
      if(selectedWithdrawToChain === Chains.ETH && selectedTokenToWithdraw  === AssetKeys.WETH_Wormhole &&  otherWalletProvider)
        getEtherBalance(otherWalletProvider, otherChainAccount, setWithdrawalTokenBalanceOnOtherChain);
      else if(selectedWithdrawToChain === Chains.SOL  && selectedTokenToWithdraw === AssetKeys.xSOL_Glitter) {
        getSolBalance(NetworkType.TESTNET,  otherChainAccount, setWithdrawalTokenBalanceOnOtherChain);
      }
    }
    else 
      setWithdrawalTokenBalanceOnOtherChain(0);
  },[selectedTokenToWithdraw, selectedWithdrawToChain, otherWalletProvider, otherChainAccount, algorandAccount]);

  useEffect(() =>{
    setSelectTokenLogo('');
    setSelectTokenSymbol('');
    setSelectToken('');
  },[selected]);

  useEffect(() =>{
    setSelectedWithdrawToChain('');
  },[selectedTokenToWithdraw]);


  return (
    <Flex 
      flexDir={'column'} 
      h="100vh"
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
                      {selected && `From ${selected} chain`}
                    </Text>

                    {/* ------------------- SELECT NETWORK -------------------- */}
                    <Flex zIndex={2} mt={'10px'}>
                      <SelectNetwork
                        selected={selected || 'Select From Chain'}
                        setSelected={setSelected}
                        BackgroundColor="#fff"
                        tokenIcon={tokenIcon}
                        setTokenIcon={setTokenIcon}
                      />
                    </Flex>

                    {selectTokenSymbol && (
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
                        <Image src={selectTokenLogo} w="48px" h="48px" mr={5} />
                        <Text pt="4px" ml={2}
                         color={ colorMode === 'light' ? 'black' : 'white'} 
                         >
                          {selectTokenSymbol}
                         </Text>
                        </Flex>
                        <Text color={ colorMode === 'light' ? 'black' : 'white'} ><span className="text-[#A0AEC0] mr-2 text-xs">Balance:</span>{depositTokenBalanceOnOtherChain}</Text>
                      </Flex>

                    </Box>)}

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
                        selectTokenBalance={depositTokenBalanceOnOtherChain}
                        tokens={supportedDepositAssetsByChain(selected,   NetworkType.TESTNET )}
                        network={NetworkType.TESTNET}
                        chain={selected}
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
                    </Flex>
                    {/* )} */}

                    {/* ------------------------ BRIDGING ---------------------- */}

                    <Flex flexDir={'column'} mt={'15px'} mb="10px">
                      <Text {...fontsm} mb={2} color={ colorMode === 'light' ? 'black' : 'white'}>
                        To Algorand Chain
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
                            Balance:</span>{algoChainBalOfDepositToken}
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
                  otherChainBalance={withdrawalTokenBalanceOnOtherChain}
                  algoChainBalance={algoChainBalOfWithdrawalToken}
                  selected={selectedWithdrawToChain}
                  setSelected={setSelectedWithdrawToChain}
                  selectToken={selectedTokenToWithdraw}
                  setSelectToken={setSelectedTokenToWithdraw}
                  tokenIcon={tokenIcon}
                  setTokenIcon={setTokenIcon}
                  selectTokenLogo={selectedTokenToWithdrawLogo}
                  setSelectTokenLogo={setSelectedTokenToWithdrawLogo}
                  selectTokenSymbol={selectedTokenToWithdrawSymbol}
                  setSelectTokenSymbol={setSelectedTokenToWithdrawSymbol}
                  // ConnectWallet Props

                  walletIcon={walletIcon}
                  setWalletConnected={setWalletConnected}
                  setWalletIcon={setWalletIcon}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  // Select Token

                  networks={networks}
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
