import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { PiSignOut } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { FaMoon, FaSun } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [darkMode, setDarkMode] = React.useState(false);
  const [showUserOptions, setShowUserOptions] = React.useState(false);

  const { data: user } = useCurrentUser();

  console.log(user);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prevShow) => !prevShow);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routes = [
    // { label: "Home", path: "/dashboard" },
    { label: "Upload", path: "/dashboard/upload" },
    { label: "Email Finder", path: "/dashboard/emailFinder" },
    // { label: "Home", path: "/dashboard" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            justifyContent: "space-between",
            // background: "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
            // padding: "25px",
            // background: "rgb(236 72 153 / 0.2) rgb(168 85 247 / 0.3)",
            background:
              "linear-gradient(to top, rgba(196, 113, 245, 1) 0%, rgba(250, 113, 205, 1) 100%)",
          }}
          // className="bg-gradient-to-t from-purple-500/30 to-pink-500/20"
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link href={"/dashboard"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ cursor: "pointer" }}
            >
              Email Findly
            </Typography>
          </Link>

          <div className="rounded-full flex items-center ">
            <div className="flex items-center flex-row gap-4">
              {/* <div className="flex items-center hover:bg-gray-500 rounded-full h-10 w-10 justify-center">
                {darkMode ? (
                  <button onClick={toggleDarkMode}>
                    <FaSun size={20} />
                  </button>
                ) : (
                  <button onClick={toggleDarkMode}>
                    <FaMoon size={20} />
                  </button>
                )}
              </div> */}
              <div
                className="cursor-pointer flex items-center rounded-full"
                onClick={toggleUserOptions}
              >
                {user?.image ? (
                  <img
                    className="hover:bg-gray-500 h-8 w-8 rounded-full"
                    src={user?.image}
                    alt=""
                  />
                ) : (
                  <div className="hover:bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <AiOutlineUser size={25} />
                  </div>
                )}
                <div className="rounded-full hover:bg-purple-600/30">
                  <RiArrowDropDownLine size={25} />
                </div>
              </div>
              {showUserOptions && (
                <div className="absolute top-20 right-0  w-48 text-black bg-gradient-to-t from-purple-500 to-pink-500 rounded-md shadow-xl z-10">
                  <List>
                    <ListItem className="cursor-pointer rounded-md hover:bg-purple-600/30">
                      <ListItemIcon>
                        {user?.image ? (
                          <img
                            className=" h-8 w-8 rounded-full"
                            src={user?.image}
                            alt=""
                          />
                        ) : (
                          <div className=" h-10 w-10 flex items-center justify-center">
                            <AiOutlineUser size={25} />
                          </div>
                        )}
                      </ListItemIcon>
                      <ListItemText primary={user?.name} />
                    </ListItem>
                    <ListItem
                      className="cursor-pointer  hover:bg-purple-600/30 rounded-md"
                      onClick={() => signOut()}
                    >
                      <ListItemIcon>
                        <div className="h-10 w-10 flex items-center justify-center">
                          <PiSignOut size={25} />
                        </div>
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" />
                    </ListItem>
                  </List>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        style={{ backgroundColor: "red" }}
        variant="permanent"
        open={open}
        className="test"
        // style={{ border: "none", backgroundColor: "#4e49af" }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((text, index) => (
            <Link href={text.path} key={text.label}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider style={{ marginTop: "15rem" }} />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
