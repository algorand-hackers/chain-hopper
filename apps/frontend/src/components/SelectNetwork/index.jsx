import React, {useState} from 'react'
import { 
     Flex, 
     Stack, 
     Text,
     Image
    } from '@chakra-ui/react';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import Images_Icons from "../../constant/icons-images";


const SelectNetwork = ( props, {...rest}) => {
       const {
        wrapperSelect,
        buttonSelect,
        optionContent,
        optionContentChild
    } = useSelectNetworkStyles();

    const [value, setValue] = useState("Select network");

    const onElementClicked = () => {
     setValue()
    }

  return (
     <Flex {...rest} {...wrapperSelect}>
     <Flex {...buttonSelect} justifyContent="space-between" align="center">
     <Text>{value}</Text>
     <MdOutlineKeyboardArrowDown/>
     </Flex>
     {/* -------------------- THE SELECT OPTION DROPDOWN NETWORK AVAILABLE ---------------------- */}
     <Stack {...optionContent} zIndex={"10000"} overflowY="auto"
          css={{
          '&::-webkit-scrollbar': {
          display: "none"
          }
     }}
     onClick={() => {onElementClicked()}}
     >
          <Flex {...optionContentChild} _hover={{ bg:"#F7F7F8", borderRadius: "5.3183px" }} p={"5px"}>
          <Image fallbackSrc={Images_Icons.ethereumLogo} mr={"10px"} />
          <Text>Ethereum</Text>
          </Flex>

          <Flex {...optionContentChild} _hover={{ bg:"#F7F7F8", borderRadius: "5.3183px" }} p={"5px"}>
          <Image fallbackSrc={Images_Icons.bnbLogo} mr={"10px"} />
          <Text>BNB Chain</Text>
          </Flex>

          <Flex {...optionContentChild} _hover={{ bg:"#F7F7F8", borderRadius: "5.3183px" }} p={"5px"}>
          <Image fallbackSrc={Images_Icons.polygonLogo} mr={"10px"} />
          <Text>Polygon</Text>
          </Flex>

          <Flex {...optionContentChild} _hover={{ bg:"#F7F7F8", borderRadius: "5.3183px" }} p={"5px"}>
          <Image fallbackSrc={Images_Icons.avalancheLogo} mr={"10px"} />
          <Text>Avalanche</Text>
          </Flex>
          
     </Stack>
     </Flex>
  )
}

export default SelectNetwork

export const useSelectNetworkStyles = () => {
    return {
    wrapperSelect: {
      minWidth: "100%",
      w: "100%",
      position: "relative",
    },
    buttonSelect: {
      w: "100%",
      h: "48px",
      color: "#404040",
      border: "1px solid #E5E5E5",
      borderRadius: "10px 10px 0px 0px",
      padding: "10px",
      cursor: "pointer"
    },
    optionContent: {
       marginTop: "40px",
       w: "100%",
       position: "absolute",
       bg: "#FFFFFF",
       borderRadius: "11.422px",
       padding: "17.1329px 8px",
       minHeight: "100px"
    },
    optionContentChild: {
      cursor: "pointer",
      color: "#404040",
    }
    };
};

