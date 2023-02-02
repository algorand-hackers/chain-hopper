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
  useColorMode,
} from '@chakra-ui/react';
import Expand from '../../asset/Expand.svg';
import GoEth from '../../asset/GoEth.svg';
import greatThan from '../../asset/Greaterthan.svg';
import warning from '../../asset/warning.svg';
import viewSVG from '../../asset/viewSVG.svg';
import arrowRight from '../../asset/arrowRight.svg';
import Images_Icons from '../../constant/icons-images';

const Transac = [
  {
    id: 1,
    name: 'Amount sent',
    amount1: '0.9357 ETH',
    amount2: "$1046.57",
  },
  {
    id: 2,
    name: 'Estimated gas fee',
    amount1: '0.9357 ETH',
    amount2: "$1046.57",
    image: <Image src={warning} />,
    image2: <Image src={Images_Icons.FALogo} />
  },
  {
    id: 3,
    name: 'Estimated balance',
    amount1: '0.07 ETH',
    amount2: "$10.57",
    image: <Image src={warning} />,
    image2: <Image src={Images_Icons.FALogo} />
  },
];

const TransactionModal = ({ isOpen, onOpen, onClose }) => {

    const { colorMode} = useColorMode();

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}  isCentered>
        <ModalOverlay />
        <ModalContent rounded="18px" w={{base:"95%", md:"500px", lg:"550px"}}>
          <ModalBody rounded="18px" 
           bg={ colorMode === 'light' ? 'white' : 'bg6'}   
           px={6}  
           w={{base:"100%", md:"500px", lg:"550px"}}
          >
            <Flex>
              <Text fontSize={{base:"23px",md:"24px", lg:"28px"}} fontWeight={'500'}
              color={colorMode === 'light' ? "black" : "#F5F5F5"}
              >
                Bridging in progress
              </Text>
              <Spacer />
              {colorMode == 'light' ? (
              <Image onClick={onClose} src={Expand} alt-="expand" />
            ) : (
              <Image onClick={onClose} src={viewSVG} alt-="expand" />
             ) }
            </Flex>
            <Text my={{base:3,md:4}} fontSize={{base:"18px", md:"18px", lg:"20px"}} fontWeight="500"
            color={colorMode === 'light' ? "black" : "#F5F5F5"}
            >
              Estimated completion time 01:23PM WAT
            </Text>
            <Box w="100%" mb={7} pos="relative">
              <Circle zIndex={1} pos="absolute" size="20px" bottom="-8px" bg="#3A6EFF" />
              <Box width="94%" mx="auto">
                <Progress value={70} h="4px" colorScheme="blue" />
              </Box>
              <Circle
                pos="absolute"
                right="0"
                zIndex={1}
                bottom="-8px"
                size="20px"
                bg="#3A6EFF"
              />
            </Box>

            <Box display={{base:"block", md:"flex"}} 
              bg={ colorMode === 'light' ? "bg2" : "bg4"} 
              p={3} rounded="10px"
              >
              {/* <Flex> */}
                <Icon mt="4px" boxSize={6} />
                <Spacer />

                <Text w={{base:"100%", md:"70%"}}>
                  Switch to Algorand from you wallet to see your new funds.
                </Text>
              {/* </Flex> */}
              <Spacer />
              <Box
                bg="#3A6EFF"
                py={2}
                px={3}
                as="button"
                color="white"
                h={'fit-content'}
                rounded="md"
                mt={{base:"6px", md:"0"}}
                w={{base:"100%", md:"fit-content"}}
              >
                Switch
              </Box>
            </Box>
            <Text className='text-center text-[18px] font-[500]' my="16px">
              You are sending:
            </Text>

             {/* Coin sending  */}
             
            <Box display="flex" border="1px #EDF2FF solid" rounded="lg" px={3} py={2} my={4} w="fit-content" mx="auto">
                  <Flex align={"center"} >
                    <Image  w={{base:"20px", md:"25px"}}  h={{base:"20px", md:"25px"}} src="https://cryptologos.cc/logos/ethereum-eth-logo.png" />
                    <Text fontSize={{base:"18px",md:"22px"}} ml={1} fontWeight="500"> 0.9357 ETH</Text>
                    {colorMode == 'light' ? (
                       <Image mx={3} w={{base:"25px", md:"30px"}}  h={{base:"25px", md:"30px"}} src={greatThan} />
                      ) : (
                        <Image mx={3} w={{base:"25px", md:"30px"}}  h={{base:"25px", md:"30px"}} src={arrowRight} />
                       ) }
                  </Flex>
    
                  <Flex   align={"center"} >
                    <Image  w={{base:"20px", md:"25px"}}   h={{base:"20px", md:"25px"}} src={GoEth} />
                    <Text fontSize={{base:"18px",md:"22px"}} ml={1}  fontWeight="500"> 0.9357 ETH</Text>
                  </Flex>
            </Box>
            <Box mx="auto" w={{base:"100%", md:"100%", lg:"80%"}} mt="30px" mb="10px" >
                {Transac.map((item) => (
                  <Flex key={item.id} justify="space-between">
                    <Flex align={"center"}>
                      <Text mr={{base:"4px", md:"6px"}} fontSize={{base:"18px", md:"20px"}}
                       color={colorMode === 'light' ? "black" : "#F5F5F5"}
                       >{item.name}
                       </Text>
                      {/* {colorMode === 'light' ?  */}
                            {item?.image}
                          {/* {item?.image2}
                        } */}
                    </Flex>
                    <Flex textAlign="right">
                      <Text textAlign="right" fontSize={{base:"18px", md:"20px"}}  mr={2}
                      color={colorMode === 'light' ? "black" : "#F5F5F5"}
                       >
                        {item.amount1}
                       </Text>
                      <Text textAlign="right" fontSize={{base:"18px", md:"20px"}}  mx={1}
                       color={colorMode === 'light' ? "black" : "#F5F5F5"}
                       >
                        ≈
                       </Text>
                      <Text textAlign="right" fontSize={{base:"18px", md:"20px"}}  ml={2}
                       color={colorMode === 'light' ? "black" : "#F5F5F5"}
                       >
                          {item.amount2}
                        </Text>
                    </Flex>
                  </Flex>
                ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionModal;
