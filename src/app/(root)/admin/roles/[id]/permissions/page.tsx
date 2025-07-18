import Permissions from "@/components/admin/roles/permissions/Permissions";

const EditRole = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Permissions id={id} />;
};

export default EditRole;
