import React from "react";
import { Modal } from "antd/lib";
import { IoCheckmarkCircle } from "react-icons/io5";
import { PrimaryButton } from "@/components/ui/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: string;
  type: string;
}

const ScheduledModal = ({ isOpen, closeModal, type }: ModuleModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
    >
      <div className="flex flex-col items-center gap-5 py-2">
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-[50%] p-3 bg-[#EDFFEA] text-[#4DE95C]">
            <IoCheckmarkCircle size={32} />
          </span>
          <span className="font-medium text-lg">Interview {type}d</span>
        </div>

        <p className="text-center leading-6 w-96">
          Interview for &apos;James Maharzan&apos; has been {type}d on 18th
          April, 2024 at 3:15 PM for the application of &apos;UI UX Designer&apos;
        </p>

        <div className="flex gap-4 items-center text-sm">
          <div onClick={closeModal}>
            <PrimaryButton title={"Continue"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduledModal;
