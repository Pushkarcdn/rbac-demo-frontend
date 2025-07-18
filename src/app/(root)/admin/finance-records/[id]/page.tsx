import EditComponent from "@/components/admin/finance-records/Edit";

const EditFinanceRecord = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <EditComponent id={id} />;
};

export default EditFinanceRecord;
