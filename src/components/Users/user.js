import { Box, Typography, useMediaQuery } from "@mui/material";
import UserTable from "./UserTable/userTable";

const UsersPage = () => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Typography
        align="center"
        sx={{
          width: "8rem",
          fontSize: !matches ? "1.8rem" : "1.5rem",
          letterSpacing: "1px",
          borderBottom: "1px solid rgb(80,80,80)",
          textTransform: "uppercase",
          color: "rgb(80,80,80)",
        }}
      >
        Users
      </Typography>
      <UserTable />
    </Box>
  );
};

export default UsersPage;
