import React, { useState, useContext, useEffect } from 'react';
import { Flex, Input, Text, Image, Box, Img, useDisclosure, useColorMode } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import CryptoModal from '../CryptoModal';
import { networks } from '../../constant/networksJSON'
import wallet from "../../asset/ETH - Ethereum Token.png"
import Images_Icons from '../../constant/icons-images';
import { getEtherBalance } from '../../context/main';
import { TransactionContext } from "../../context/TransactionContext";
const SelectToken = ({ setSelectToken, walletIcon, selectToken, setWalletIcon, chain, network, tokens, isWithdrawal, selectTokenBalance, setIsTransac }) => {
  const [value, setValue] = useState("");
  // const { currentAccount, connectToMyAlgo, disconnectWallet } = useContext(TransactionContext);
  const onClick = () => {
    alert('Cammer herer');
    setValue(selectTokenBalance);
  }

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { colorMode } = useColorMode();
  
    console.log(networks)

  return (
    <Flex 
    w="100%" 
    h="fit-content" 
    gap={2}  
    borderBottomRadius={10} 
    border="1px solid #E2E8F0" 
    >
      <Flex 
        w="100%"  
        h="50px" 
      >
        <Flex
          onClick={() => setIsOpen(true)}
          align="center" 
          borderRight="1px #E5E5E5 solid"
          w="140px"
          mx="2px"
          cursor={"pointer"} 
        >
          <Image h="20px" w="20px" src={walletIcon}  />
          <Text fontWeight="500" fontSize={"18px"} mx="2px"
           color={colorMode === 'light' ? 'dark' : 'white' }  
           >
            {selectToken}
           </Text>
          
          {colorMode == 'light' ? (
             <MdOutlineKeyboardArrowDown className='w-[20px] h-[20px]' />
              ) : (
            <Image color="dark" h="18px" src={Images_Icons.arrowDownLogo} alt="logo" /> 
          ) }
        </Flex>
        <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
         bgColor={colorMode === 'light' ? '#fffff' : 'bg4' }
         color={colorMode === 'light' ? 'black' : 'white' }
         rounded="0px" 
         h="100%" px={3} 
         variant='unstyled' 
         placeholder='0' 
         _placeholder={ colorMode === 'light' ? { color: '' } : { color: 'white'} }
        />
        <Flex align="center" dir="row" justify="center" 
         fontWeight={500} pl={3} mr={2}
         color={colorMode === 'light' ? 'dark' : 'white' }
         > <span mr="5px">  </span> <Text onClick={onClick} cursor="pointer" color="blue">MAX</Text></Flex>
        
      </Flex>

      {/* -------------------- THE SELECT OPTION DROPDOWN NETWORK AVAILABLE ---------------------- */}
        <CryptoModal
            isWithdrawal={isWithdrawal}
            tokens={tokens || []}
            network={network}
            chain={chain}
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