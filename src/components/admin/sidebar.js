import React from "react";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { FaEdit, FaPlusCircle, FaCogs, FaEnvelope } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function DashboardSidebar({ onSidebarClick }) {
  return (
    <Card sx={{ height: "100vh", width: 250, p: 2, boxShadow: 3 }}>
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
          className="my-3 rounded-2xl shadow-md py-3 cursor-pointer hover:bg-[#f0f2f4] transition-all duration-300 "
          onClick={() => onSidebarClick("Logout")}
        >
          <ListItemIcon>
            <CiLogout style={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText primary="Çıkış" />
        </ListItem>
      </List>
    </Card>
  );
}

export default DashboardSidebar;
