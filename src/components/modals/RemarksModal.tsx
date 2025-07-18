/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import {
  PrimaryButton,
  SecondaryOutlineButton,
} from "@/components/ui/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: any;
  message: string;
  setMessage: any;
}

const RemarksModal = ({
  isOpen,
  closeModal,
  action,
  message,
  setMessage,
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
      <div className="flex flex-col items-center gap-5 py-2">
        {/* <div className="flex flex-col items-center gap-1">
                    <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
                        <RxCross1 size={25} />
                    </span>
                </div> */}

        {/* <p className="text-center">{text}</p> */}

        <div className="w-full max-w-80 flex flex-col gap-1">
          <span>Interview Remarks or Conclusion</span>

          <textarea
            className="w-full p-2 border border-[#E0E0E0] rounded-md bg-[#fafafa] resize-none outline-none"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            placeholder="Conclusion here..."
            required
          />
        </div>

        <div className="flex gap-4 items-center text-sm">
          <div onClick={closeModal}>
            <SecondaryOutlineButton title={"Cancel"} />
          </div>

          <PrimaryButton title={"Confirm"} action={action} />
        </div>
      </div>
    </Modal>
  );
};

export default RemarksModal;
