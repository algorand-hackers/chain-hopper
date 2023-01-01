import {lazy, Suspense, useState} from 'react'
import { Flex, Box, 
     Stack, 
     Text, 
     Spinner,
     Tabs, TabList, TabPanels, Tab, TabPanel,
    } from '@chakra-ui/react';
import SelectNetwork from '../../components/SelectNetwork';
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
    <Flex flexDir={"column"}>
     <Stack {...root}>
            
              <Box bg='rgba(255, 255, 255, 0.97)' w='590px' 
              h='100%' 
              color='dark'
              borderRadius={"16px"}
              flexDir={"column"}
              padding={"10px"}
              >
                {/* ----------------------------------- TOP BUTTON TAB  [DEPOSIT & WITHDRAW] --------------------------------------------- */}
                  <Tabs variant='unstyled'>
                    <TabList padding="10px" bg={"#EDF2FA"} borderRadius={"9.11545px"}>
                      <Tab _selected={{ color: "black", bg: '#FFFFFF' }}
                      color="black"
                      fontWeight={"500"}
                      w={"50%"}
                      px={2}
                      h={"50px"}
                      borderRadius={"9.11545px"}
                      >Deposit</Tab>
                      <Tab 
                      _selected={{ color: "black", bg: '#FFFFFF' }}
                      color="black"
                      fontWeight={"500"}
                      w={"50%"}
                      px={2}
                      h={"50px"}
                      borderRadius={"9.11545px"}
                      >Withdraw</Tab>
                    </TabList>
                    <TabPanels>
                      {/* --------------------- TAB ONE DETAILS -------------------------- */}
                      <TabPanel>
                        <Suspense fallback={<Spinner size="sm"/>}>
                        <Flex flexDir={"column"} padding={"5px"}>
                          <Text {...fontsm}>From the network</Text>
                          
                          {/* ------------------- SELECT NETWORK -------------------- */}
                          <Flex {...rest} mt={"10px"}>
                           <SelectNetwork selected={selected} setSelected={setSelected} tokenIcon={tokenIcon} setTokenIcon={setTokenIcon} />
                          </Flex>
                        
                           {/* ------------------------ BRIDGING ---------------------- */}
                          
                          <Flex flexDir={"column"} mt={"15px"}>
                            <Text {...fontsm}>To Algorand</Text>

                                 <Box bg={"#EFF6FF"} w='100%' 
                                 h='60px'
                                 pt="4px" 
                                 color='dark'
                                 borderRadius={"9.11545px"}
                                 flexDir={"column"}
                                //  padding={"10px"}
                                 ></Box>
                          </Flex>
                        </Flex>
                        </Suspense>
                      </TabPanel>
                      <TabPanel>
                        <p>two!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>

                  {/* -------------------- TRANSFER BUTTON ---------------------- */}
                  <Box as="button" 
                   bg='linear-gradient(90deg, #4A48FF 0%, #2996FF 100%)'
                   w="100%" 
                   h='49.65px' 
                   color='white' 
                   borderRadius={"9.11545px"}
                   >
                    Transfer
                   </Box>
              </Box>
     </Stack>
    </Flex>
  )
}

export default Bridge

export const useBridgeStyles = () => {
    return {
        root: {
            w: "100%",
            // px: [5, 5, 10, 20, 40],
            justifyContent: "center",
            alignItems: "center",
            mt: "86px",
            pt: "3%",
        },
         root2: {
         w: "100%",
         h: "48px",
         align: "center",
         justify: "center",
         px: "0px",
         bg: "#FFFFFF",
         borderWidth: "1px solid",
         borderColor: "#E5E5E5",
         outline: "none",
         borderRadius: "10px 10px 0px 0px",
       },
           root3: {
         w: "100%",
         h: "48px",
         align: "center",
         justify: "center",
         px: "0px",
         bg: "#FFFFFF",
         borderWidth: "1px solid",
         borderColor: "#E5E5E5",
         outline: "none",
         borderRadius: "0px 0px 10px 10px",
       },
        fontsm: {
          fontSize: "13.6732px",
          lineHeight: "26px",
          fontWeight: "400",
          color: "#404040"
        },
    networkSelect: {
      w: {
        base: "100%",
        md: "100%",
      },
      bg: "#FFFFFF",
      color: "dark",
      borderColor: "1px solid rgba(0, 0, 0, 0.08)",
      borderWidth: "1px",
      align: "center",
      borderRadius: "10px 10px 0px 0px",
    },
      networkSelect2: {
      w: {
        base: "100%",
        md: "100%",
      },
      bg: "#FFFFFF",
      color: "dark",
      borderColor: "1px solid rgba(0, 0, 0, 0.08)",
      borderWidth: "1px",
      align: "center",
      borderRadius: "0px 0px 10px 10px",
    }
  };
};