import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SliderImages from "../SliderImages/SliderImages";
import SimpleContainer from "../UI/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  addDisplayImage,
  deleteDisplayImage,
  fetchDisplayImage,
} from "../../../utils/api";
import StatusButton from "../StatusButton/StatusButton";

const Display = () => {
  const matches = useMediaQuery("(max-width:700px)");
  const [displayImages, setDisplayImages] = useState([]);
  const [isLoading, setIsLoading] = useState({
    status: true,
    activity: "Fetching..",
  });
  const [fetchData, setFetchData] = useState(true);

  const deleteImgHandler = async (id) => {
    setIsLoading({ status: true, activity: "Deleteing.." });
    try {
      await deleteDisplayImage(id);
      setFetchData(true);
    } catch (err) {
      throw err;
    }
  };

  const addImgHandler = async (event) => {
    setIsLoading({ status: true, activity: "Uploading.." });
    try {
      await addDisplayImage(event.target.files[0]);
      setFetchData(true);
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (fetchData) {
      const fetchData = async () => {
        try {
          const res = await fetchDisplayImage();
          setDisplayImages(res.data);
        } catch (err) {
          throw err;
        }
      };
      fetchData().then(() => {
        setIsLoading({ status: false, activity: "None" });
        setFetchData(false);
      });
    }
  }, [fetchData]);
  return (
    <SimpleContainer>
      <Typography
        variant={matches ? "h6" : "h4"}
        color="black"
        padding="10px"
        align="left"
      >
        Shop Slider Images
      </Typography>
      <Divider
        variant="fullWidth"
        style={{ width: "100%", backgroundColor: "black", height: "2px" }}
      />
      <StatusButton isLoading={isLoading} icon={<PhotoCamera />}>
        {isLoading.status ? isLoading.activity : "Upload"}
        <input hidden accept="image/*" type="file" onChange={addImgHandler} />
      </StatusButton>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflow: "scroll",
        }}
      >
        {displayImages.map((img) => {
          return (
            <SliderImages
              img={img.image}
              key={img._id}
              id={img._id}
              onDelete={deleteImgHandler}
            />
          );
        })}
      </div>
    </SimpleContainer>
  );
};

export default Display;
