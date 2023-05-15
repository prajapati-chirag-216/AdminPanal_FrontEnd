import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const DUMMY_CARDS = [
  {
    icon: PersonIcon,
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
  const navigateHandler = (link) => {
    return navigat(link);
  };
  return (
    <Grid container spacing={4}>
      {DUMMY_CARDS.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            sx={{
              minWidth: 275,
              boxShadow: "0px 1px 4px grey",
              "&:hover": {
                cursor: "pointer",
                transition: "transform 500ms",
                transform: "scale(1.08)",
              },
            }}
            onClick={navigateHandler.bind(null, card.link)}
          >
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
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
              <Typography
                variant="h6"
                fontSize="small"
                color="green"
                component="div"
                align="center"
              >
                7%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default CardDiv;
