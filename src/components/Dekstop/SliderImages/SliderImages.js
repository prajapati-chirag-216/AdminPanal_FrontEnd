import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const SliderImages = (props) => {
  return (
    <Card sx={{ minWidth: "400px", borderRadius: "2px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.img}
          alt="green iguana"
          sx={{
            position: "relative",
            objectFit: "cover",
          }}
        />
        <CancelIcon
          fontSize="large"
          sx={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
            fontSize: "2rem",
            "&:hover": {
              color: "red",
            },
          }}
          onClick={props.onDelete.bind(null, props.id)}
        />
      </CardActionArea>
    </Card>
  );
};
export default SliderImages;
