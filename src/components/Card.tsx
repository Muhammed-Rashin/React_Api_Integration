import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const doDelete = (emailToDelete,setProfiles) => {
  console.log(emailToDelete);
  
  const jsonData = localStorage.getItem("users");
  const data = JSON.parse(jsonData);
  const indexToDelete = data.findIndex((obj) => obj.email === emailToDelete);
  if (indexToDelete !== -1) {
    data.splice(indexToDelete, 1);
  }
  setProfiles([...data])
  const updatedJsonData = JSON.stringify(data);
  localStorage.setItem("users", updatedJsonData);

};

export default function RecipeReviewCard({ name, email, picture,setProfiles }) {
  return (
    <Card sx={{ maxWidth: 400, minWidth:400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={picture} alt="" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => doDelete(email,setProfiles)}>
            <DeleteIcon />
          </IconButton>
        }
        title={`${name.title}.${name.first} ${name.last}`}
        subheader={email}
      />
    </Card>
  );
}
