import EditComponenet from "@/components/admin/finance-records/Edit";

const EditTestimonial = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <EditComponenet id={id} />;
};

export default EditTestimonial;
