/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/Buttons";
import { CiWarning } from "react-icons/ci";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: any;
  link: string;
}

const FinishProfileModal = ({
  isOpen,
  closeModal,
  title,
  text,
  link,
}: ModuleModalProps) => {
  return (
    <>
      <Modal open={isOpen} footer={null} closeIcon={null} centered>
        <div className="flex flex-col items-center py-2">
          <div className="flex flex-col items-center gap-2">
            <span className="rounded-[50%] p-2.5 bg-yellow-5 text-yellow-600">
              <CiWarning size={55} />
            </span>
            <span className="font-semibold text-lg text-yellow-600">{title}</span>
          </div>

          <p className="text-center">{text}</p>

          <div className="flex gap-4 items-center text-sm mt-5">
            <Link href={link}>
              <PrimaryButton title={"Continue"} />
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FinishProfileModal;
