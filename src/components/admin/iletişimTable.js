import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

// Utility function to format Firestore timestamps
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
  return "";
};

function ContactTable() {
  const [hizmetler, setHizmetler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchHizmetler();
  }, []);

  const fetchHizmetler = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "messages"));
      const fetchedHizmetler = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedHizmetler = fetchedHizmetler.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return b.timestamp.seconds - a.timestamp.seconds;
        }
        return 0;
      });

      console.log(sortedHizmetler);
      setHizmetler(sortedHizmetler);
    } catch (error) {
      console.error("Error fetching hizmetler:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "93vh",
        marginInline: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          İletişime Geçenler
        </Typography>
      </Box>
      {loading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>İletişim ID</TableCell>
                <TableCell>İsim</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Mesaj</TableCell>
                <TableCell>Tarih</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(rowsPerPage).keys()).map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>İletişim ID</TableCell>
                <TableCell>İsim</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Mesaj</TableCell>
                <TableCell>Tarih</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hizmetler
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hizmet) => (
                  <TableRow key={hizmet.id}>
                    <TableCell>{hizmet.id}</TableCell>
                    <TableCell>{hizmet.name}</TableCell>
                    <TableCell>{hizmet.phone}</TableCell>
                    <TableCell>{hizmet.email}</TableCell>
                    <TableCell
                      style={{
                        maxWidth: "250px",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {hizmet.message}
                    </TableCell>
                    <TableCell>{formatTimestamp(hizmet.timestamp)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={hizmetler.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      )}
    </Box>
  );
}

export default ContactTable;
