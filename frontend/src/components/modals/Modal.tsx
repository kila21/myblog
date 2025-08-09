import type { ModalProps } from "../../types/modals/ModalProps";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#23262F] rounded-lg p-5 md:w-96 w-70 h-80 relative">
        {title && <h2 className="text-lg font-bold mb-3 text-white">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};
