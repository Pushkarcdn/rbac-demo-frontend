/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;

  action: () => void;
  interviewConclusion: string;
  setInterviewConclusion: any;
}

const FinishInterviewModal: React.FC<ModuleModalProps> = ({
  isOpen,
  closeModal,
  action,
  interviewConclusion,
  setInterviewConclusion,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={500}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the default form submission behavior
          action(); // Calls the provided action function
        }}
        className="flex flex-col items-center gap-1 py-2"
      >
        <div className="flex flex-col items-center gap-1">
          <h2 id="modal-title" className="font-semibold text-lg">
            Finish Interview
          </h2>
        </div>

        <p id="modal-description" className="text-left">
          Please provide your conclusion for the interview. Only recruiter can
          see this information.
        </p>

        <textarea
          className="my-3 w-full max-w-[600px] rounded-lg border-2 border-gray-300 placeholder-gray-300 resize-none"
          rows={4}
          placeholder="Conclusion here..."
          value={interviewConclusion}
          onChange={(e) => setInterviewConclusion(e.target.value)}
          required
        />

        <div className="w-full mt-2 flex gap-4 items-center justify-end text-sm">
          <div
            onClick={closeModal}
            className="py-3 px-10 border-2 border-active text-active rounded-md hover:bg-active hover:text-white transition cursor-pointer"
          >
            Close
          </div>

          <button
            type="submit"
            className="py-3 px-10 rounded-md bg-primary text-white hover:bg-darkGreen transition"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FinishInterviewModal;
