"use client";

import React from "react";
import { Button, Modal, Box } from "@mui/material";
import { useModal } from "@/contexts/modalContext";
import CloseIcon from "@mui/icons-material/Close";

const ModalCustomContent = () => {
  const { open, hideModal, modalTitle, modalContent, modalAction } = useModal();

  return (
    <Modal
      open={open}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      aria-modal="true"
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
        <Box sx={{ m: 2, marginLeft: "auto", top: 0, right: 0, position: "absolute" }}>
          <Button onClick={hideModal} sx={{ p: 0, minWidth: "fit-content" }}>
            <CloseIcon width="auto" />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            minWidth: "100%",
          }}
        >
          {modalTitle}
        </Box>

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

        <Box
          sx={{
            mt: 2,
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {modalAction && modalAction}
          <Button variant="outlined" onClick={hideModal}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCustomContent;
