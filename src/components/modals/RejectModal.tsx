/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { RxCross1 } from "react-icons/rx";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  action: any;
  remarks: any;
  setRemarks: any;
}

const RejectModal = ({
  isOpen,
  closeModal,
  title,
  text,
  action,
  remarks,
  setRemarks,
}: ModuleModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={500}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the default form submission behavior
          action(); // Calls the provided action function
        }}
        className="flex flex-col items-center gap-1 py-2"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
            <RxCross1 size={25} />
          </span>
          <span className="font-medium text-lg">{title}</span>
        </div>

        <p className="text-center">{text}</p>

        <textarea
          className="my-3 w-full max-w-[600px] rounded-lg border-2 border-gray-300 placeholder-gray-300 resize-none !outline-none"
          rows={4}
          placeholder="Remarks here..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          required
        />

        <div className="flex gap-4 items-center text-sm">
          <div onClick={closeModal}>
            <SecondaryOutlineButton title={"Cancel"} />
          </div>

          <button
            type="submit"
            className="py-3 px-10 rounded-md bg-red-600 text-white hover:bg-red-800 transition"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RejectModal;
