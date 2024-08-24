import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  FaEdit,
  FaPlusCircle,
  FaCogs,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function DashboardSidebar({ onSidebarClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeItem, setActiveItem] = useState(null); // State to track active item

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSidebarClick(item);
    if (isMobile) toggleSidebar(); // Close sidebar on mobile after item click
  };

  const getItemClassName = (item) => {
    return `my-3 rounded-2xl shadow-md py-3 cursor-pointer ${
      activeItem === item ? "bg-[#f0f2f4]" : "hover:bg-[#f0f2f4]"
    } transition-all duration-300`;
  };

  return (
    <>
      {isMobile && (
        <IconButton
          color="primary"
          onClick={toggleSidebar}
          sx={{
            display: { xs: "block", lg: "none" },
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <FaBars />
        </IconButton>
      )}

      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            height: "100%",
            boxShadow: 3,
          },
        }}
      >
        <Card sx={{ height: "100%", p: 2 }}>
          <Box mb={2} p={2}>
            <Typography variant="h6" align="center" color="textPrimary">
              Bilgiş Harita Mühendislik Admin Panel
            </Typography>
          </Box>
          <List>
            <ListItem
              onClick={() => handleItemClick("EditTexts")}
              className={getItemClassName("EditTexts")}
            >
              <ListItemIcon>
                <FaEdit style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Yazıları Düzenle" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick("ProjeTable")}
              className={getItemClassName("ProjeTable")}
            >
              <ListItemIcon>
                <FaPlusCircle style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Proje Ekle" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick("HizmetTable")}
              className={getItemClassName("HizmetTable")}
            >
              <ListItemIcon>
                <FaCogs style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Hizmet Ekle" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick("ContactTable")}
              className={getItemClassName("ContactTable")}
            >
              <ListItemIcon>
                <FaEnvelope style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="İletişim" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick("Logout")}
              className={getItemClassName("Logout")}
            >
              <ListItemIcon>
                <CiLogout style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Çıkış" />
            </ListItem>
          </List>
        </Card>
      </Drawer>

      <Card
        sx={{
          height: "100vh",
          width: 250,
          p: 2,
          boxShadow: 3,
          display: { xs: "none", lg: "block" },
        }}
      >
        <Box mb={2} p={2}>
          <Typography variant="h6" align="center" color="textPrimary">
            Bilgiş Harita Mühendislik Admin Panel
          </Typography>
        </Box>
        <List>
          <ListItem
            onClick={() => handleItemClick("EditTexts")}
            className={getItemClassName("EditTexts")}
          >
            <ListItemIcon>
              <FaEdit style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Yazıları Düzenle" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("ProjeTable")}
            className={getItemClassName("ProjeTable")}
          >
            <ListItemIcon>
              <FaPlusCircle style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Proje Ekle" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("HizmetTable")}
            className={getItemClassName("HizmetTable")}
          >
            <ListItemIcon>
              <FaCogs style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Hizmet Ekle" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("ContactTable")}
            className={getItemClassName("ContactTable")}
          >
            <ListItemIcon>
              <FaEnvelope style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="İletişim" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("Logout")}
            className={getItemClassName("Logout")}
          >
            <ListItemIcon>
              <CiLogout style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Çıkış" />
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default DashboardSidebar;
