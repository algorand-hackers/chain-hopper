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
} from '@chakra-ui/react';
import SelectNetwork from '../../components/SelectNetwork';
import TokenRoute from '../../constant/TokenRoute';
import AlgoTranc from "../../asset/AlgoTran.svg";
import TransactionLoader from '../../components/TransactionLoader';
import TransactionModal from '../../components/TransactionModal/TransactionModal';

// const NetworkSelector = lazy(
//   () => import("../../components/NetworkSelector")
// );

const Bridge = ({...rest}) => {
      
  const {
        root,
        fontsm,
    } = useBridgeStyles();
    // const [displaySwitcher, setDisplaySwitcher] = useState(true);
    const [selected, setSelected] = useState("Select Network");
    const [tokenIcon, setTokenIcon] = useState();
    // const [network2, setNetwork2] = useState(false);
    

  //   const networkData = networks.map((data) => {
  //   return { id: nanoid(), ...data };
  // });

  return (
    <Flex flexDir={'column'} h="100%">
      <Stack {...root} pos="relative">
        <Box
          bg="rgba(255, 255, 255, 0.97)"
          w="590px"
          pos="relative"
          h="fit-content"
          color="dark"
          borderRadius={'16px'}
          flexDir={'column'}
          padding={'10px'}
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
                  <Flex flexDir={'column'} padding={'5px'} >
                    <Text fontSize="14px" mb={-1}>From the network</Text>

                    {/* ------------------- SELECT NETWORK -------------------- */}
                    <Flex {...rest} mt={'10px'}>
                      <SelectNetwork
                        selected={selected}
                        setSelected={setSelected}
                        tokenIcon={tokenIcon}
                        setTokenIcon={setTokenIcon}
                      />
                    </Flex>
                    
                    {/* ------------------------ BRIDGING ---------------------- */}

                    <Flex flexDir={'column'} mt={'15px'} mb="10px">
                      <Text {...fontsm} mb={2}>To Algorand</Text>

                      <Box
                        bg={'#EFF6FF'}
                        w="100%"
                        h="36px"
                        pt="4px"
                        color="dark"
                        borderRadius={'9.11545px'}
                        flexDir={'column'}
                        //  padding={"10px"}
                      ></Box>
                    </Flex>
                    <Flex>
                      <Text fontSize="12px">
                        Verified on 2 bridges. Confirm token address
                      </Text>
                      <Flex fontSize="12px" color="blue" mb={4} ml={2}>
                        Algoexplorer 
                        <Image src={AlgoTranc} ml={1} alt="algo" />
                      </Flex>
                    </Flex>

                    {/* -------------------- TOKEN ROUTE DETAILS ---------------------- */}
                    <TokenRoute />

                  </Flex>
                </Suspense>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* -------------------- TRANSFER BUTTON ---------------------- */}
          <Box
            as="button"
            bg="linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)"
            w="100%"
            h="49.65px"
            color="white"
            borderRadius={'9.11545px'}
          >
            Transfer
          </Box>
        </Box>
          {/* ----------------------------------- TRANSACTION lOADER --------------------------------------------- */}

            <TransactionLoader />
          

      </Stack>
    </Flex>
  );
};

export default Bridge;

export const useBridgeStyles = () => {
  return {
    root: {
      w: '100%',
      h: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      // mt: '6px',
      pt: '3%',
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