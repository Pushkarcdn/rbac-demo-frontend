import EditComponent from "@/components/admin/users/Edit";

const EditUser = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditComponent id={id} />;
};

export default EditUser;
