import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ClockLoader from "react-spinners/ClockLoader";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import googleimg from "../../images/google.png";
import Drawer from "@material-ui/core/Drawer";
import "./Header.css";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    background: "#f66f61 ",
  },
}));
const notSureIfLoggedIn = (color, loading, size) => {
  return (
    <Button color="inherit" size="large">
      <div className="m-1">Loading </div>
      <ClockLoader color={color} loading={loading} size={size} />
    </Button>
  );
};
const renderLoginButton = (auth, color, loading, size) => {
  switch (auth) {
    // Not sure if user is logged in or not
    case null:
      return notSureIfLoggedIn(color, loading, size);
    // user is logged out
    case false:
      return (
        <div>
        <Button color="inherit" size="large" href="/auth/google">
          <div className="sign-in">Sign In With Google</div>{" "}
          <img src={googleimg} alt="google logo" className="logo-img" />
        </Button>
     
        </div>
      );
    // user is logged in
    default:
      return (
        <React.Fragment>
          <Link to="/checkout" className="no-decoration">
            <Button className="add-credits" size="large" disableRipple>
              Add credit <AttachMoneyIcon />
            </Button>
          </Link>

          <p
            className="credits"
            color="inherit"
            size="large"
            variant="contained"
          >
            credit : {auth.credits}
          </p>
          <Button
            color="inherit"
            size="large"
            href="/api/logout"
            className="font"
          >
            Logout
            <ExitToAppIcon />
          </Button>
        </React.Fragment>
      );
  }
};
const ToggleDrawer = ({ auth, color, loading, size }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open, props) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="backGround"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt = {4}
      >
        {renderLoginButton(auth, color, loading, size)}
      </Box>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <MenuIcon style={{ color: "white" }} />
      </Button>
      <Drawer
        classes={{ paper: classes.paper }}
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
};

const Header = (props) => {

  const [loading] = useState(true);
  const [color] = useState("#ffffff");
  const classes = useStyles();
  const size = 20;
  const auth = props.auth;
  const smallMatches = useMediaQuery("(max-width:600px)");

  const renderContent = (smallMatches) => {
    if (smallMatches) {
      return (
        <ToggleDrawer auth={auth} color={color} loading={loading} size={size} />
      );
    }
    return renderLoginButton(auth, color, loading, size);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="orange">
        <Container>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <Link
                className="no-decoration-logo"
                to={props.auth ? "/surveys" : ""}
              >
                Poll.me
              </Link>
            </Typography>
            {renderContent(smallMatches)}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
const mapStateToProps = ({ auth }) => {
  return { auth }; 
};

export default connect(mapStateToProps, {})(Header);
