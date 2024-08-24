import React, { useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        color="primary"
        onClick={toggleSidebar}
        sx={{
          display: { xs: "block", lg: "none" }, // Show button only on mobile
          position: "absolute",
          top: 16,
          left: 16,
        }}
      >
        <FaBars />
      </IconButton>

      {/* Sidebar Drawer */}
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
              onClick={() => {
                onSidebarClick("EditTexts");
                toggleSidebar(); // Close the sidebar when an item is clicked
              }}
              className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
            >
              <ListItemIcon>
                <FaEdit style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Yazıları Düzenle" />
            </ListItem>
            <ListItem
              className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
              onClick={() => {
                onSidebarClick("ProjeTable");
                toggleSidebar(); // Close the sidebar when an item is clicked
              }}
            >
              <ListItemIcon>
                <FaPlusCircle style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Proje Ekle" />
            </ListItem>
            <ListItem
              className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
              onClick={() => {
                onSidebarClick("HizmetTable");
                toggleSidebar(); // Close the sidebar when an item is clicked
              }}
            >
              <ListItemIcon>
                <FaCogs style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Hizmet Ekle" />
            </ListItem>
            <ListItem
              className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
              onClick={() => {
                onSidebarClick("Contact");
                toggleSidebar(); // Close the sidebar when an item is clicked
              }}
            >
              <ListItemIcon>
                <FaEnvelope style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="İletişim" />
            </ListItem>
            <ListItem
              className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
              onClick={() => {
                onSidebarClick("Logout");
                toggleSidebar(); // Close the sidebar when an item is clicked
              }}
            >
              <ListItemIcon>
                <CiLogout style={{ fontSize: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Çıkış" />
            </ListItem>
          </List>
        </Card>
      </Drawer>

      {/* Desktop Sidebar */}
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
            onClick={() => onSidebarClick("EditTexts")}
            className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
          >
            <ListItemIcon>
              <FaEdit style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Yazıları Düzenle" />
          </ListItem>
          <ListItem
            className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
            onClick={() => onSidebarClick("ProjeTable")}
          >
            <ListItemIcon>
              <FaPlusCircle style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Proje Ekle" />
          </ListItem>
          <ListItem
            className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
            onClick={() => onSidebarClick("HizmetTable")}
          >
            <ListItemIcon>
              <FaCogs style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Hizmet Ekle" />
          </ListItem>
          <ListItem
            className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
            onClick={() => onSidebarClick("Contact")}
          >
            <ListItemIcon>
              <FaEnvelope style={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="İletişim" />
          </ListItem>
          <ListItem
            className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300"
            onClick={() => onSidebarClick("Logout")}
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
