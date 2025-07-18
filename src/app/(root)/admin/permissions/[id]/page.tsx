import EditComponent from "@/components/admin/permissions/Edit";

const EditPermission = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <EditComponent id={id} />;
};

export default EditPermission;
