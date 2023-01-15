import React, { useState } from 'react';
import { Flex, Input, Text, Image, Box, Img, useDisclosure } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import CryptoModal from '../CryptoModal';
import { networks } from '../../constant/networksJSON'
import wallet from "../../asset/ETH - Ethereum Token.png"
// import Images_Icons from '../../constant/icons-images';

const SelectToken = ({ setSelectToken, walletIcon, selectToken, setWalletIcon, setIsTransac }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  
    console.log(networks)

  const [isActive, setIsActive] = useState(false);
  const [icon, setIcon] = useState(false);

  return (
    <Flex  rounded={'lg'} w="100%" h="fit-content" gap={3}  borderBottomRadius={0} border="2px #E5E5E5 solid" >
      <Flex 
        w="100%"  
        h="50px" 
      >
        <Flex
          onClick={() => setIsOpen(true)}
          align="center" 
          borderRight="2px #E5E5E5 solid"
          w="140px"
          mx="2px"
          cursor={"pointer"} 
        >
          <Image h="20px" w="20px" src={walletIcon}  />
          <Text fontWeight="500" fontSize={"18px"} mx="2px" >{selectToken}</Text>
          <MdOutlineKeyboardArrowDown className='w-[30px] h-[30px]' />
        </Flex>
        <Input bg="bg2" rounded="0px" h="100%" px={3} variant='unstyled' placeholder='0' />
        <Flex align="center" dir="row" justify="center" fontWeight={500} pl={3} mr={2}> <span> ~ </span> $242678</Flex>
        
      </Flex>

      {/* -------------------- THE SELECT OPTION DROPDOWN NETWORK AVAILABLE ---------------------- */}
    <CryptoModal
        isOpen={isOpen}
        onClose={onClose}
        setSelectToken={setSelectToken} 
        walletIcon={walletIcon} 
        setWalletIcon={setWalletIcon}
        setIsTransac={setIsTransac}
    />
    </Flex>
  );
};

export default SelectToken;