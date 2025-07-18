/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd/lib";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { RxCalendar } from "react-icons/rx";
import { today } from "@/utils/dateFormatters";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  action: any;
  interviewData: any;
  setInterviewData: any;
  type: string;
}

const ScheduleModal = ({
  isOpen,
  closeModal,
  action,
  interviewData,
  setInterviewData,
  type,
}: ModuleModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={null}
        centered
      >
        <div className="flex flex-col items-center gap-5 py-2">
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-[50%] p-3 bg-[#D7E7FF] text-[#0040A0]">
              <RxCalendar size={32} />
            </span>
            <span className="font-medium text-lg text-center">
              {type} Interview
            </span>
          </div>

          <p className="text-center">
            Choose flexible date and time for the interview!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevents the default form submission behavior
              action(); // Calls the provided action function
            }}
            className="w-full flex flex-col justify-center items-center gap-5 max-w-80"
          >
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="date">Date</label>
              <input
                required
                type="date"
                name=""
                id=""
                min={today}
                className="w-full py-2 border-2 rounded-md outline-none px-3"
                value={interviewData?.date}
                onChange={(e: any) =>
                  setInterviewData({ ...interviewData, date: e.target.value })
                }
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="date">Time</label>
              <input
                required
                type="time"
                name="time"
                className="w-full py-2 border-2 rounded-md outline-none px-3"
                value={interviewData?.time}
                onChange={(e: any) =>
                  setInterviewData({ ...interviewData, time: e.target.value })
                }
              />
            </div>

            <div className="w-full max-w-80 flex flex-col gap-1">
              <span>Meet link</span>

              <input
                required
                name="link"
                type="text"
                className="w-full p-2 border border-[#E0E0E0] rounded-md resize-none outline-none"
                value={interviewData?.link}
                onChange={(e: any) =>
                  setInterviewData({ ...interviewData, link: e.target.value })
                }
                placeholder="link"
              />
            </div>

            <div className="w-full max-w-80 flex flex-col gap-1">
              <span>Message for applicant</span>

              <textarea
                required
                className="w-full p-2 border border-[#E0E0E0] rounded-md bg-[#fafafa] resize-none outline-none"
                value={interviewData?.messageForApplicant}
                onChange={(e: any) =>
                  setInterviewData({
                    ...interviewData,
                    messageForApplicant: e.target.value,
                  })
                }
                placeholder="Message"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center text-sm mt-4">
              <div onClick={closeModal}>
                <SecondaryOutlineButton title={"Cancel"} />
              </div>

              {/* <PrimaryButton title={"Confirm"} action={action} /> */}

              <button
                type="submit"
                className="py-3 px-8 text-white font-medium rounded-lg bg-primary hover:bg-darkGreen transition"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* {scheduledModelState && (
                <ScheduledModal
                    isOpen={scheduledModelState}
                    closeModal={() => setScheduledModelState(false)}
                    id={id}
                    type={type}
                />

            )
            } */}
    </>
  );
};

export default ScheduleModal;
