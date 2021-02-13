import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import "./SurveyItem.css";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const SurveyItem = ({
  subject,
  body,
  dateSent,
  index,
  noOfYesResponses,
  noOfNoResponses,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box display="flex" justifyContent="center" my={2}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {index + 1}
              </Avatar>
            }
            title={subject}
            subheader={` ${dateSent}`}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
            <div className="responses">
              <Typography variant="body2" component="p" className="d-flex-row">
                <CheckCircleIcon style={{ color: "green" }} fontSize="small" />{" "}
                Yes Responses : {noOfYesResponses}
              </Typography>
              <Typography variant="body2" component="p" className="d-flex-row">
                <CancelIcon style={{ color: "#f66f61 " }} fontSize="small" /> No
                Responses : {noOfNoResponses}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};
export default SurveyItem;
