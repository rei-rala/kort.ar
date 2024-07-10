"use client";

import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useModal } from "@/contexts/modalContext";

export const ModalCustomContent = () => {
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
          maxWidth: "50svw",
          bgcolor: "black",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>

        {modalContent}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-evenly" }}>
          {modalAction && modalAction}
          <Button variant="outlined" onClick={handleClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
