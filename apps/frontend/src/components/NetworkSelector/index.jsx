import { memo } from "react";
import { Flex, Image, Select } from "@chakra-ui/react";
import { networks } from "../../constant/networksJSON";
import { nanoid } from "nanoid";

const NetworkSelector = ({
  value,
  onChange,
  disabled,
  isImage,
  ...rest
}) => {
  const { root } = useStyles();

  const networkData = networks.map((data) => {
    return { id: nanoid(), ...data };
  });

  const coinImage = networkData.filter(
    (e) => e.name === value || e.image === value
  );
 
  return (
    <Flex {...root} {...rest}>
      <Image
        data-testid={"img-1"}
        src={coinImage}
        borderRadius='full'
        boxSize='30px'
        // style={{ width: "30px", height: "30px", borderRadius: "20px" }}
      />
      <Select
        onChange={onChange}
        value={value}
        variant="unstyled"
        placeholder="Select network"
        pl={"5px"}
        h="50px"
        alignSelf="center"
        justifySelf={"center"}
        justifyContent="center"
        disabled={disabled}
      >
        {networkData
          .map((e) => (
            <option
              key={nanoid()}
              value={isImage ? e.image : e.name}
              style={{ color: 'black' }}
            >
              {isImage ? e.image : e.name}
            </option>
          ))}
      </Select>
    </Flex>
  );
};

export default memo(NetworkSelector);

const useStyles = () => {
  return {
    root: {
      w: "100%",
      h: "50px",
      align: "center",
      justify: "center",
      borderRadius: 58,
      px: "10px",
      bg: "#E5E5E5",
      outline: "none",
      boxShadow: "0px",
    },
  };
};
