import { AlertDialog } from "@/components/shared/AlertDialog";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

interface Dialog {
  id: number;
  isOpen: boolean;
  title: React.ReactNode;
  agreeText: React.ReactNode;
  disagreeText: React.ReactNode;
  agreeTextColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  description: React.ReactNode;
  onAgree?: () => void;
  onDisagree?: () => void;
}

interface DialogContextType {
  dialogs: Dialog[];
  openDialog: (dialogProps: Partial<Dialog>) => void;
  closeDialog: (id: number) => void;
}

const DialogContext = createContext<DialogContextType>({
  dialogs: [],
  openDialog: () => {},
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const openDialog = useCallback(
    (dialogProps: Partial<Dialog>) => {
      const newDialog: Dialog = {
        id: Date.now(),
        isOpen: true,
        title: "",
        agreeText: "",
        disagreeText: "",
        description: "",
        onAgree: () => {},
        onDisagree: () => {},
        ...dialogProps,
      };
      setDialogs([...dialogs, newDialog]);
    },
    [dialogs]
  );

  const closeDialog = useCallback(
    (id: number) => {
      setDialogs(
        dialogs.map((dialog) => (dialog.id === id ? { ...dialog, isOpen: false } : dialog))
      );
    },
    [dialogs]
  );

  const dialogsMemo = useMemo(
    () =>
      dialogs
        .filter((d) => d.isOpen)
        .map((dialog) => (
          <AlertDialog
            key={dialog.id}
            open={dialog.isOpen}
            setOpen={(isOpen) => closeDialog(dialog.id)}
            title={dialog.title}
            description={dialog.description}
            agreeText={dialog.agreeText}
            agreeTextColor={dialog.agreeTextColor}
            onAgree={dialog.onAgree}
            disagreeText={dialog.disagreeText}
            onDisagree={dialog.onDisagree as (() => void) | undefined}
          />
        )),
    [dialogs, closeDialog]
  );

  return (
    <DialogContext.Provider value={{ dialogs, openDialog, closeDialog }}>
      {dialogsMemo}
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
