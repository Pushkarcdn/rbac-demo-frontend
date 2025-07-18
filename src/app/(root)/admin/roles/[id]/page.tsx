import EditComponent from "@/components/admin/roles/Edit";

const EditRole = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditComponent id={id} />;
};

export default EditRole;
