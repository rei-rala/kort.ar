"use client";
import { ModalCustomContent } from "@/components/shared";
import React, { createContext, useContext, useState } from "react";

type ModalCustomChildrenComponent = React.ReactNode | React.ReactNode[];

interface ModalContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  modalTitle: ModalCustomChildrenComponent;
  modalContent: ModalCustomChildrenComponent;
  modalActionRef: React.RefObject<HTMLButtonElement> | null;
  modalAction: React.ReactNode | null;

  openNewModal: (
    title: ModalCustomChildrenComponent,
    content: ModalCustomChildrenComponent,
    action?: React.ReactNode
  ) => void;

  closeModal: () => void;
  hideModal: () => void;
}

const modalContextDefaultValue: ModalContextType = {
  open: false,
  setOpen: () => {},

  modalTitle: null,
  modalContent: null,
  modalActionRef: null,
  modalAction: null,

  openNewModal: () => {},
  closeModal: () => {},
  hideModal: () => {},
};

const ModalContext = createContext<ModalContextType>(modalContextDefaultValue);

export const ModalProvider: DefaultComponent = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<ModalCustomChildrenComponent>(null);
  const [modalContent, setModalContent] = useState<ModalCustomChildrenComponent>(null);

  const modalActionRef = React.createRef<HTMLButtonElement>();
  const [modalAction, setModalAction] = useState<React.ReactNode | null>(null);

  const openNewModal = (
    title: ModalCustomChildrenComponent,
    content: ModalCustomChildrenComponent,
    action?: React.ReactNode
  ) => {
    setModalTitle(title);
    setModalContent(content);
    setModalAction(action);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalTitle(null);
    setModalContent(null);
    setModalAction(null);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        modalAction,
        modalActionRef,
        modalTitle,
        modalContent,
        openNewModal,
        closeModal,
        hideModal,
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
