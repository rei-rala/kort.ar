"use client";

import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useModal } from "@/contexts/modalContext";

const ModalCustomContent = () => {
  const { open, setOpen, modalTitle, modalContent, modalAction } = useModal();

  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 330,
          width: "80vw",
          maxWidth: "500px",
          bgcolor: "#f9f9fa",
          color: "#111827",
          boxShadow: 24,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 1,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {modalTitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "100%",
          }}
        >
          {modalContent}
        </Box>

        <Box sx={{ mt: 2, display: "flex", width: "100%", justifyContent: "space-evenly" }}>
          {modalAction && modalAction}
          <Button variant="outlined" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCustomContent;
