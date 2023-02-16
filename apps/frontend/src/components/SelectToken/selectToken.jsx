import React, { useState, useContext, useEffect } from 'react';

import { Flex, Input, Text, Image, Box, Img, useDisclosure, useColorMode, useToast } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import CryptoModal from '../CryptoModal';
import { networks } from '../../constant/networksJSON'
import wallet from "../../asset/ETH - Ethereum Token.png"
import Images_Icons from '../../constant/icons-images';
import { getEtherBalance } from '../../context/main';
import { TransactionContext } from "../../context/TransactionContext";
const SelectToken = ({ setSelectToken, walletIcon, selectToken, setWalletIcon, chain, network, tokens, isWithdrawal, selectTokenBalance, setIsTransac, selectTokenLogo, setSelectTokenLogo, selectTokenSymbol, setSelectTokenSymbol }) => {
  const toast = useToast()
  const [value, setValue] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  // const { currentAccount, connectToMyAlgo, disconnectWallet } = useContext(TransactionContext);
  const onClick = () => {
    setValue(selectTokenBalance);
  }

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);


  const handleAmountChange = (e) => {
    const amount = e.target.value;
    if (amount > selectTokenBalance) {
      setIsAmountValid(false);
      e.target.disabled = true;
      toast({
        position: 'top-right',
        title: 'Insufficient balance',
        status: 'error',
        isClosable: true,
      });
      setTimeout(() => {
        setIsAmountValid(true);
        e.target.disabled = false;
        setValue('');
      }, 10000); // 10 seconds delay
    } else {
      setIsAmountValid(true);
      e.target.disabled = false;
    }
    setValue(amount);
  }



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
          {selectTokenLogo && <Image h="20px" w="20px" src={walletIcon}  /> }
          <Text fontWeight="500" fontSize={"18px"} mx="2px"
           color={colorMode === 'light' ? 'dark' : 'white' }  
           >
            {selectTokenSymbol || 'Asset'}
           </Text>
          
          {colorMode == 'light' ? (
             <MdOutlineKeyboardArrowDown className='w-[20px] h-[20px]' />
              ) : (
            <Image color="dark" h="18px" src={Images_Icons.arrowDownLogo} alt="logo" /> 
          ) }
        </Flex>
        <Input 
       value={value}
       onChange={handleAmountChange}
       onBlur={handleAmountChange}
       bgColor={colorMode === 'light' ? '#fffff' : 'bg4' }
       color={colorMode === 'light' ? 'black' : 'white' }
       rounded="0px" 
       h="100%" 
       px={3} 
       variant='unstyled' 
       placeholder='0' 
       _placeholder={ colorMode === 'light' ? { color: '' } : { color: 'white'} }
       isDisabled={!isAmountValid}
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
            setSelectTokenLogo={setSelectTokenLogo}
            setSelectTokenSymbol={setSelectTokenSymbol}
        />
        </Flex>
  );
};

export default SelectToken;