/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import hitApi from "@/lib/axios";
import DeleteModal from "@/components/modals/DeleteModal";
import { CiTrash } from "react-icons/ci";

const ActionCard = ({ id, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(`/finance-records/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center cursor-pointer text-sm font-semibold">
      <div className="flex items-start gap-6">
        <Link href={`/manager/finance-records/${id}`}>
          <FiEdit3 size={20} color="#0295a9" className="cursor-pointer" />
        </Link>

        <CiTrash
          size={20}
          color="red"
          onClick={() => {
            setDeleteModalStatus(true);
          }}
          className="cursor-pointer"
        />
      </div>

      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title="Delete finance record"
          description="Are you sure you want to delete this finance record?"
          action={() => {
            deleteItem(id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionCard;
