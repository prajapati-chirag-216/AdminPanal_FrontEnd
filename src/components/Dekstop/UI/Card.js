import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { fetchAdminProfile } from "../../../utils/api";
import roleTypes from "../../../utils/roles/roleTypes";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch } from "react-redux";
const DUMMY_CARDS = [
  {
    icon: ManageAccountsIcon,
    title: "Admins",
    link: "admins",
  },
  {
    icon: GroupRoundedIcon,
    title: "Customers",
    link: "customers",
  },
  {
    icon: GradingIcon,
    title: "Orders",
    link: "orders",
  },
  {
    icon: ProductionQuantityLimitsIcon,
    title: "Products",
    link: "product",
  },
  {
    icon: BusinessCenterIcon,
    title: "Catogaries",
    link: "category",
  },
];

const CardDiv = () => {
  const navigat = useNavigate();
  const matches = useMediaQuery("(max-width:700px)");
  const dispatch = useDispatch();

  const navigateHandler = async (link) => {
    const res = await fetchAdminProfile();
    if (
      !(link === "admins") ||
      res.adminProfile.role === roleTypes.SUPER_ADMIN
    ) {
      return navigat("/admin/" + link);
    } else {
      console.log("ran");
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
    <Grid container spacing={4}>
      {DUMMY_CARDS.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={index < 2 ? 6 : 4}>
          <Card
            sx={{
              minWidth: 275,
              boxShadow: "0px 1px 4px grey",
              "&:hover": {
                cursor: "pointer",
                transition: "scale 500ms",
                scale: "1.03",
                background: "rgb(245,245,245)",
              },
            }}
            onClick={navigateHandler.bind(null, card.link)}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <card.icon
                  sx={{
                    fontSize: matches ? "2.5rem" : "3rem",
                  }}
                />
              </div>
              <Typography variant="h6" component="div" align="center">
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default CardDiv;
