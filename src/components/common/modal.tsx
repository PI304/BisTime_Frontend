interface ModalProps {
  message?: string;
  isModal: boolean;
  denyMessage?: string;
  onCloseModal: () => void;
  onAccept: () => void;
}

export default function Modal({
  message,
  isModal,
  onAccept,
  onCloseModal,
}: ModalProps) {
  return (
    isModal && (
      <div>
        <div
          onClick={onCloseModal}
          className="absolute inset-0 bg-[#575757] opacity-95"
        >
          <div className="flex-col p-4 z-10 text-[18px] rounded-lg w-[90%] h-fit absolute flex justify-center items-center bg-white inset-0 m-auto overflow-hidden">
            {message ? (
              <div className="my-4 text-center text-base-black text-lg">
                {message}
              </div>
            ) : (
              <div className="my-4 text-center text-base-black text-lg">
                Are You Sure <br /> To Submit The Schedule?
              </div>
            )}
            <button
              onClick={onAccept}
              className="bg-primary-green-1 text-white w-full h-9 rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={onCloseModal}
              className="mt-2 bg-white border border-primary-green-1 text-primary-green-1 w-full h-9 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
}
