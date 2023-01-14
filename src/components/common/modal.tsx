interface ModalProps {
  message: string;
  isModal: boolean;
  denyMessage?: string;
  onCloseModal: () => void;
  onAccept?: () => void;
}

export default function Modal({ message, isModal, onCloseModal }: ModalProps) {
  return (
    isModal && (
      <div>
        <div
          onClick={onCloseModal}
          className="absolute inset-0 bg-[#767676] opacity-90 backdrop-blur-xl"
        >
          <div className="z-10 rounded-lg w-4/5 h-20 absolute flex justify-center items-center bg-primary-green-1 inset-0 m-auto overflow-hidden">
            <div className="text-center text-base-white text-lg text">
              {message}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
