"use client";

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  title: React.ReactNode;
  description: React.ReactNode;
  agreeText: React.ReactNode;
  agreeTextColor?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  onAgree?: () => void;
  disagreeText: React.ReactNode;
  onDisagree?: () => void;
};

export const AlertDialog = ({
  open,
  setOpen,
  title,
  description,
  agreeText,
  agreeTextColor,
  onAgree,
  disagreeText,
  onDisagree,
}: AlertDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleClose();
    onAgree && onAgree();
  };

  const handleDisagree = () => {
    handleClose();
    onDisagree && onDisagree();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color={agreeTextColor ?? "success"}
          onClick={handleAgree}
          autoFocus
        >
          {agreeText}
        </Button>
        {disagreeText && (
          <Button variant="outlined" onClick={handleDisagree}>
            {disagreeText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
