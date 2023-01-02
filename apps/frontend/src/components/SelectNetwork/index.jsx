import React, { useState } from 'react';
import { Flex, Stack, Text, Image, Box, Img } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Images_Icons from '../../constant/icons-images';

const SelectNetwork = ({ selected, setSelected, tokenIcon, setTokenIcon }) => {
  const { wrapperSelect, buttonSelect, optionContent, optionContentChild } =
    useSelectNetworkStyles();

  const [isActive, setIsActive] = useState(false);
  const [icon, setIcon] = useState(false);
  const options = [
    {
      token:"Ethereum",
      img: Images_Icons.ethereumLogo
    }, 
    {
      token:"BNB Chain",
      img: Images_Icons.bnbLogo
    },
    {
      token:"Polygon",
      img: Images_Icons.polygonLogo
    }, 
    {
      token:"Avalanche",
      img: Images_Icons.avalancheLogo
    }
  ]



  return (
    <Flex  {...wrapperSelect}>
      <Flex {...buttonSelect} justifyContent="space-between" align="center"
        onClick={e => setIsActive(!isActive)}
      >
        <Flex>
          {icon && <Image src={tokenIcon} mr={'10px'} />}
          <Text>{selected}</Text>
        </Flex>
        <MdOutlineKeyboardArrowDown />
      </Flex>
      {/* -------------------- THE SELECT OPTION DROPDOWN NETWORK AVAILABLE ---------------------- */}
      {isActive && (
        <Stack
          {...optionContent}
          zIndex={'10000'}
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box>
            {options?.map((option, index) => (
              <Flex
              key={index}
              {...optionContentChild}
              _hover={{ bg: '#F7F7F8', borderRadius: '5.3183px' }}
              p={'5px'}
              onClick={e => {
                setSelected(option.token)
                setTokenIcon(option.img)
                setIsActive(false)
                setIcon(true)
              }}
            >
              <Image src={option.img} mr={'10px'} />
              {option.token}
            </Flex>
            ))}
            

            {/* <Flex
              {...optionContentChild}
              _hover={{ bg: '#F7F7F8', borderRadius: '5.3183px' }}
              p={'5px'}
            >
              <Image fallbackSrc={Images_Icons.bnbLogo} mr={'10px'} />
              BNB Chain
            </Flex>
            <Flex
              {...optionContentChild}
              _hover={{ bg: '#F7F7F8', borderRadius: '5.3183px' }}
              p={'5px'}
            >
              <Image fallbackSrc={Images_Icons.polygonLogo} mr={'10px'} />
              Polygon
            </Flex>
            <Flex
              {...optionContentChild}
              _hover={{ bg: '#F7F7F8', borderRadius: '5.3183px' }}
              p={'5px'}
            >
              <Image fallbackSrc={Images_Icons.avalancheLogo} mr={'10px'} />
              Avalanche
            </Flex> */}
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

export default SelectNetwork;

export const useSelectNetworkStyles = () => {
  return {
    wrapperSelect: {
      minWidth: '100%',
      w: '100%',
      position: 'relative',
    },
    buttonSelect: {
      w: '100%',
      h: '42px',
      color: '#404040',
      border: '1px solid #E5E5E5',
      borderRadius: '10px 10px 0px 0px',
      padding: '10px',
      cursor: 'pointer',
    },
    optionContent: {
      marginTop: '40px',
      w: '100%',
      position: 'absolute',
      bg: '#FFFFFF',
      borderRadius: '11.422px',
      padding: '17.1329px 8px',
      minHeight: '100px',
    },
    optionContentChild: {
      cursor: 'pointer',
      color: '#404040',
    },
  };
};