import React,{useState} from 'react';
import {getQuotes,NetworkType} from '@chain-hopper/sdk';
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

  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const quoteRequest = {
        amountIn: '1000',
        assetKey: 'ETH',
        fromAddress: '0x20497f37a8169c8c9fa09411f8c2cfb7c90de5d1',
        fromChainName: 'Ethereum',
        fromWallet: {},
        fromWalletType: 'metamask',
        toAddress: 'KVVYUJHPZXW7PF4O64W6DG7GU3GF6SPCLS6YKUSV7WFQ7WX7HXY7LS6CRA',
        toChainName: 'Algorand Chain',
        toWallet: {},
        toWalletType: 'Algorand',
        network: 'NetworkType.Mainet'
      };
      const quotes = await getQuotes(quoteRequest);
   
      setQuotes(quotes);
    } catch (error) {
      console.error(error);
    }
  };

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
            {/* <Box>
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
             */}
             <div>
      <button onClick={fetchQuotes}>Get Quotes</button>
      {quotes.map((quote, index) => (
        <div key={index}>
          {quote.amountOut} {quote.toChainName} for {quote.amountIn} {quote.fromChainName}
        </div>
      ))}
    </div>
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
