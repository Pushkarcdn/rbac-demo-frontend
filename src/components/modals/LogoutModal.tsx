import React from "react";
import { Modal } from "antd/lib";
import { IoIosWarning } from "react-icons/io";
import { PrimaryButton, SecondaryOutlineButton } from "../ui/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const LogoutModal = ({ isOpen, closeModal, action }: ModuleModalProps) => {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={null}
      centered
      onCancel={closeModal}
      // width={800}
    >
      <div className="flex flex-col items-center gap-1 py-2">
        <div className="flex flex-col items-center gap-2">
          <span className="rounded-[50%] p-3 bg-[#FCEEEE] text-[#E05151]">
            <IoIosWarning size={32} />
          </span>
          <span className="font-medium text-lg">Logout</span>
        </div>

        <p className="text-center">
          Are you sure want to log out from Training Frontend?
        </p>

        <div className="flex gap-4 items-center text-sm mt-3">
          <SecondaryOutlineButton title={"Cancel"} onClick={closeModal} />

          <PrimaryButton
            title={"Confirm"}
            onClick={action}
            className="!bg-red-500 hover:!bg-red-600"
          />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
