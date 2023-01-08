import React from 'react';
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
  Progress,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import AlgoTranc from '../../asset/AlgoTran.svg';
import Wormhole from '../../asset/Wormhole.svg';
import cancle from '../../asset/Cancle.svg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const TokenRouteModal = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
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
          <Flex>
            <Text fontSize={{base:"24px", md:"26px"}} fontWeight="600" >Select a bridge provider</Text>
            <Spacer />
            <Image onClick={onClose} cursor="pointer" src={cancle} w="25px" h="25px" mr={1} alt="algo" />
          </Flex>

          <Flex my={5} gap={3} flexWrap="wrap">
            <Box
                as="button"
                py={2}
                px={4}
                bg="#3970FF"
                color={"white"}
                rounded="30px"
            >
                Best price
            </Box>
            <Box
                as="button"
                py={2}
                px={4}
                bg="bg2"
                rounded="30px"
            >
                Fastest
            </Box>
          </Flex>

          {/* warmhole  */}

          <Flex justify="space-between" mb={2} mt={6}>
            <Flex
              fontSize="14px"
              h="fit-content"
              align={'flex-end'}
              fontWeight="500"
            >
              <Image src={Wormhole} w="25px" h="25px" mr={1} alt="algo" />
              WormHole
              <Image
                src={AlgoTranc}
                w="15px"
                h="15px"
                mb="3px"
                ml={1}
                alt="algo"
              />
            </Flex>
            <Box>
              <Text fontSize="14px" fontWeight="500">
                10mins
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Estimated Time
              </Text>
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="500">
                $46.28
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Expected balance
              </Text>
            </Box>
            
            <Flex cursor="pointer" align={'center'}></Flex>
          </Flex>

          {/* Glitter  */}

          <Flex justify="space-between" mb={2} mt={5}>
            <Flex
              fontSize="14px"
              h="fit-content"
              align={'flex-end'}
              fontWeight="500"
            >
              <Image src={Wormhole} w="25px" h="25px" mr={1} alt="algo" />
              WormHole
              <Image
                src={AlgoTranc}
                w="15px"
                h="15px"
                mb="3px"
                ml={1}
                alt="algo"
              />
            </Flex>
            <Box>
              <Text fontSize="14px" fontWeight="500">
                10mins
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Estimated Time
              </Text>
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="500">
                $46.28
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Expected balance
              </Text>
            </Box>
            <Flex cursor="pointer" align={'center'}></Flex>
          </Flex>

          <Flex
            mx="auto"
            justify={'space-between'}
            flexWrap="wrap"
            w="100%"
            mt={8}
            mb="10px"
          ></Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TokenRouteModal;
