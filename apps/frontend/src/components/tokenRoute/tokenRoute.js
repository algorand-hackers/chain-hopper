import React from 'react';
import {
    Flex,
    Text,
    Image,
    useDisclosure,
  } from '@chakra-ui/react';

const tokenRoute = () => {
  return (
    <>
      <Flex>
        <Text fontSize="12px">
          Verified on 2 bridges. Confirm token address
        </Text>
        <Flex fontSize="12px" color="#3A6EFF" mb={4} ml={2}>
          Algoexplorer
          <Image src={AlgoTranc} ml={1} alt="algo" />
        </Flex>
      </Flex>

    </>
  );
};

export default tokenRoute;
