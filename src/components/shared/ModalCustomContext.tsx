"use client";

import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useModal } from "@/contexts/ModalContext";
import { LinkForm } from "@/components/me/linkForm/LinkForm";

export const ModalCustomContext: ExtendedComponent<{ link?: RedirectLink }> = ({ link }) => {
  const { open, setOpen, modalTitle, openNewModal } = useModal();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <LinkForm link={link} />

          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close modal
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
