"use client";
import { ModalCustomContent } from "@/components/shared";
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  modalTitle: string;
  modalContent: React.ReactNode | null;
  actionRef: React.RefObject<HTMLButtonElement> | null;
  modalAction: React.ReactNode | null;

  openNewModal: (
    title: string,
    content: React.ReactNode,
    action?: React.ReactNode,
    actionRef?: React.RefObject<HTMLButtonElement> | null
  ) => void;

  closeModal: () => void;
}

const modalContextDefaultValue: ModalContextType = {
  open: false,
  setOpen: () => {},

  modalTitle: "",
  modalContent: null,
  actionRef: null,
  modalAction: null,

  openNewModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextType>(modalContextDefaultValue);

export const ModalProvider: DefaultComponent = ({ children }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const actionRef = React.createRef<HTMLButtonElement>();
  const [modalAction, setModalAction] = useState<React.ReactNode | null>(null);

  const openNewModal = (title: string, content: React.ReactNode, action?: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalAction(Boolean(action) ? action : null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        modalAction,
        actionRef,
        modalTitle,
        modalContent,
        openNewModal,
        closeModal,
      }}
    >
      <ModalCustomContent />
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
