"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  CssBaseline,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import { OutputData } from "@editorjs/editorjs";
import { styled } from "@mui/material/styles";
import SearchInput from "@/components/SearchInput";
const EditorBlock = dynamic(() => import("@/components/Editor"), {
  ssr: false
});

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}));

export default function WorkSpace() {
  const [data, setData] = useState<OutputData>();
  const menu = useMemo(() => {
    const menuList = data?.blocks.filter(({ type }) => type === "header");
    if (!menuList) {
      return [];
    }
    return menuList;
  }, [data]);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleScrollLink = (id: string) => {
    const headers = document.querySelectorAll(".ce-header");
    headers.forEach((item, index) =>
      item.setAttribute("id", `${menu[index].id}`)
    );
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px" // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <SearchInput />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        {menu.map((item, index) => (
          <List key={index} component={"nav"}>
            <ListItemButton onClick={() => handleScrollLink(item.id as string)}>
              <ListItemText>{item.data.text}</ListItemText>
            </ListItemButton>
          </List>
        ))}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        </Container>
      </Box>
    </Box>
  );
}
