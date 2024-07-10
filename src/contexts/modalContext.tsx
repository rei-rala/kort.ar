"use client";
import { ModalCustomContext } from "@/components/shared/ModalCustomContext";
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  modalTitle: string;
  modalContent: React.ReactNode | null;

  openNewModal: (title: string, content: React.ReactNode) => void;
}

const modalContextDefaultValue: ModalContextType = {
  open: false,
  setOpen: () => {},

  modalTitle: "",
  modalContent: null,

  openNewModal: () => {},
};

const ModalContext = createContext<ModalContextType>(modalContextDefaultValue);

export const ModalProvider: DefaultComponent = ({ children }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openNewModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setOpen(true);
  };

  return (
    <ModalContext.Provider value={{ open, setOpen, modalTitle, modalContent, openNewModal }}>
      <ModalCustomContext />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
