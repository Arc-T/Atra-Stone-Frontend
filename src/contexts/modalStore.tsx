import { create } from "zustand";
import { ModalProps } from "../types/admin";

interface modalStore {
  modalProps: ModalProps;
  isModalOpen: boolean;
  onOpenModal: (props: ModalProps) => void;
  onCloseModal: () => void;
}

const useModalStore = create<modalStore>((set) => ({
  modalProps: {} as ModalProps,
  isModalOpen: false,
  onOpenModal: (props: ModalProps) => set({ isModalOpen: true, modalProps: props }),
  onCloseModal: () => set({ isModalOpen: false }),
}));

export default useModalStore;
