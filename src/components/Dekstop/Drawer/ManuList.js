import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Inbox,
  Dashboard,
  Category,
  Inventory2,
  ManageAccounts,
  Person,
  Group,
} from "@mui/icons-material";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAdminProfile } from "../../../utils/api";
import roleTypes from "../../../utils/roles/roleTypes";
import { uiActions } from "../../../store/ui-slice";
const ListItems = [
  {
    icon: Dashboard,
    title: "Dashboard",
    link: "dashboard",
  },
  {
    icon: ManageAccounts,
    title: "Admins",
    link: "admins",
  },
  {
    icon: Group,
    title: "Customers",
    link: "customers",
  },
  {
    icon: Inbox,
    title: "Orders",
    link: "orders",
  },
  {
    icon: Inventory2,
    title: "Products",
    link: "product",
  },
  {
    icon: Category,
    title: "Catogaries",
    link: "category",
  },
];
const ManuList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery("(max-width:700px)");
  const dispatch = useDispatch();

  const navigateHandler = async (link) => {
    const res = await fetchAdminProfile();
    if (
      !(link === "admins") ||
      res.adminProfile.role === roleTypes.SUPER_ADMIN
    ) {
      return navigate(`/admin/${link}`);
    } else {
      dispatch(
        uiActions.setSnackBar({
          status: true,
          message: "Unauthorized access",
          severity: "warning",
        })
      );
    }
  };
  return (
    <Box
      sx={{ width: !matches ? 400 : "60vw" }}
      role="presentation"
      onClick={props.toggleDrawer}
      onKeyDown={props.toggleDrawer}
    >
      <List>
        {ListItems.map((item, index) => (
          <ListItem
            disablePadding
            onClick={props.onClose}
            key={index}
            sx={{
              background: location.pathname.endsWith(item.link)
                ? "rgb(235,235,235)"
                : "transparent",
            }}
          >
            <ListItemButton
              sx={{
                height: !matches ? "100px" : "70px",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={navigateHandler.bind(null, item.link)}
              // onClick={() => {
              //   navigate(`/admin/${item.link}`);
              // }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <item.icon fontSize={!matches ? "large" : "medium"} />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  textAlign: "center",
                  ".MuiTypography-root": {
                    fontSize: !matches ? "1.1rem" : "0.9rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ManuList;
