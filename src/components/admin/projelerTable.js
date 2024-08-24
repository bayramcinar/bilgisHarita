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
  IconButton,
  Typography,
  Box,
  TextField,
  Input,
  Button,
  Skeleton,
} from "@mui/material";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { firestore, storage } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ProjelerTable() {
  const [hizmetler, setHizmetler] = useState([]);
  const [fileMetadata, setFileMetadata] = useState(null); // Only metadata
  const [newLessonName, setNewLessonName] = useState("");
  const [newHizmetImage, setNewHizmetImage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedHizmet, setSelectedHizmet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    fetchHizmetler();
  }, []);

  const fetchHizmetler = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "proje"));
      const fetchedHizmetler = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHizmetler(fetchedHizmetler);
    } catch (error) {
      console.error("Error fetching hizmetler:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    Swal.fire({
      icon: "info",
      title: "Video Yükleniyor...",
      html: "Lütfen bekleyin.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (file) {
      try {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        setFileMetadata({
          name: file.name,
          type: file.type,
          size: file.size,
          url: fileUrl, // Save the file URL
        });
        setNewHizmetImage(fileUrl);
        Swal.close();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAddHizmet = async () => {
    if (!newLessonName || !fileMetadata) return;

    Swal.fire({
      icon: "info",
      title: "Ekleme Yapılıyor...",
      html: "Lütfen bekleyin.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await addDoc(collection(firestore, "proje"), {
        title: newLessonName,
        fileMetadata: {
          name: fileMetadata.name,
          type: fileMetadata.type,
          size: fileMetadata.size,
          url: fileMetadata.url, // Save URL
        },
        createdAt: new Date(),
      });

      Swal.fire({
        title: "Başarılı",
        text: "Proje başarılı bir şekilde eklendi.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      toggleModal();
      fetchHizmetler();
    } catch (error) {
      console.error("Error adding hizmet:", error);

      Swal.fire({
        title: "Hata",
        text: "Proje ekleme sırasında bir hata oluştu.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleEditHizmet = (hizmet) => {
    setEditMode(true);
    setSelectedHizmet(hizmet);
    setNewLessonName(hizmet.title);
    setNewHizmetImage(hizmet.fileMetadata.url);
    setFileMetadata(hizmet.fileMetadata); // Restore metadata
    toggleModal();
  };

  const handleUpdateHizmet = async () => {
    if (!newLessonName || !fileMetadata || !selectedHizmet) return;

    Swal.fire({
      icon: "info",
      title: "Düzenleme Yapılıyor...",
      html: "Lütfen bekleyin.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const hizmetRef = doc(firestore, "proje", selectedHizmet.id);
      await updateDoc(hizmetRef, {
        title: newLessonName,
        fileMetadata: {
          name: fileMetadata.name,
          type: fileMetadata.type,
          size: fileMetadata.size,
          url: fileMetadata.url, // Update URL
        },
      });
      toggleModal();
      Swal.close();
      fetchHizmetler();
      Swal.fire({
        title: "Başarılı",
        text: "Proje başarılı bir şekilde güncellendi.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      toggleModal();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating Proje:", error);
    }
  };

  const handleDeleteHizmet = async (hizmetId) => {
    const result = await Swal.fire({
      title: "Silmek istediğinize emin misiniz?",
      text: "Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    });

    if (result.isConfirmed) {
      try {
        const hizmetRef = doc(firestore, "proje", hizmetId);
        await deleteDoc(hizmetRef);
        Swal.fire({
          icon: "info",
          title: "Siliniyor...",
          html: "Lütfen bekleyin.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        Swal.close();
        fetchHizmetler();

        Swal.fire({
          title: "Başarılı",
          text: "Proje başarıyla silindi.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting hizmet:", error);
        Swal.fire({
          title: "Hata",
          text: "Proje silinirken bir hata oluştu.",
          icon: "error",
          showConfirmButton: true,
        });
      }
    }
  };
  const handleRemoveImage = () => {
    setNewHizmetImage("");
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
          Projeler
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditMode(false);
            setNewLessonName("");
            setNewHizmetImage("");
            setFileMetadata(null);
            toggleModal();
          }}
        >
          Proje Ekle
        </Button>
      </Box>
      {loading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Proje ID</TableCell>
                <TableCell>Başlık</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Aksiyonlar</TableCell>
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
                <TableCell>Proje ID</TableCell>
                <TableCell>Başlık</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Aksiyonlar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hizmetler
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hizmet) => (
                  <TableRow key={hizmet.id}>
                    <TableCell>{hizmet.id}</TableCell>
                    <TableCell
                      style={{
                        maxWidth: "250px",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {hizmet.title}
                    </TableCell>
                    <TableCell>
                      {hizmet.fileMetadata?.url && (
                        <video
                          src={hizmet.fileMetadata.url}
                          alt={hizmet.fileMetadata.name}
                          style={{ width: "100px", height: "auto" }}
                        ></video>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditHizmet(hizmet)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteHizmet(hizmet.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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

      {/* Modal */}
      <Modal isOpen={modal} centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editMode ? "Proje Güncelle" : "Proje Ekle"}
        </ModalHeader>
        <ModalBody className="p-4">
          <TextField
            fullWidth
            label="Başlık"
            value={newLessonName}
            onChange={(e) => setNewLessonName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <div className="w-full flex items-center justify-between mt-3">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="file_input"
              >
                Proje Videosu
              </label>
              <input
                id="file_input"
                label="Proje Videosu"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
              />
              {newHizmetImage && (
                <div>
                  <br />
                  <video
                    src={newHizmetImage}
                    alt="Uploaded"
                    className="h-24 w-24"
                  ></video>
                  <button
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={handleRemoveImage}
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={editMode ? handleUpdateHizmet : handleAddHizmet}
          >
            {editMode ? "Güncelle" : "Ekle"}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
}

export default ProjelerTable;
