import { Box, Divider } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
        textAlign: "center",
        borderRadius: "50%",
        marginBottom: "3rem"
      }}
    >
      Work log
      <Divider />
    </Box>
  );
};

export default Logo;
