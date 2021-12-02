import { NavLink } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

import { useSelector } from "react-redux";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
const Nav = () => {
  //const classes = useStyles();
  const count = useSelector((state) => state.counter);
  const login = useSelector((state) => state.login);
  console.log(count);
  console.log(login);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">DeveloperCommunity App</Typography>
          <Button color="inherit" component={NavLink} to="/home">
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/Feeds">
            Feeds
          </Button>
          <Button
            color="inherit"
            style={{ marginRight: "auto" }}
            component={NavLink}
            to="/developer"
          >
            Developer
          </Button>

          {login.loggedIn ? (
            <Button color="inherit" component={NavLink} to="/logout">
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
          )}
          <Button color="inherit" component={NavLink} to="/developer/add">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
