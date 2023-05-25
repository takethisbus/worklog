import { Box } from "@mui/material";
import { FormEvent, ReactNode } from "react";

type FormProps = {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form = ({ handleSubmit, children }: FormProps) => {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      {children}
    </Box>
  );
};

export default Form;
