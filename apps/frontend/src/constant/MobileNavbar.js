import React from 'react';
import { Box, Flex, Button, Text, Icon } from '@chakra-ui/react';
import { GiCancel } from 'react-icons/gi';

const MobileNavbar = ({ setIsMenu }) => {
  return (
    <Box position="relative">
      <Box pos="absolute" bg="#fff" right="0">
        <Box
          display={{ base: 'flex', md: 'none' }}
          mt={9}
          mb={6}
          w="80%"
          mx="auto"
          justifyContent={"flex-end"}
          cursor="pointer"
          onClick={() => setIsMenu(false)}
        >
          <Icon boxSize={7} as={GiCancel} />
        </Box>
        <Box pt={4} pb={2} pl={4} pr={12} className="mr-4 p-2 font-[500]">
          Networks
        </Box>
        <Box py={2} pl={4} pr={12} className="mr-4 p-2 font-[500]">
          Community
        </Box>
        <Box py={2} pl={4} pr={12} className="mr-4 p-2 font-[500]">
          Docs
        </Box>
        <Box pt={2} pb={10} pl={4} pr={12} className="mr-4 p-2 font-[500]">
          Contact us
        </Box>
      </Box>
    </Box>
  );
};

export default MobileNavbar;
