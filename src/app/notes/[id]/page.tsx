const NoteDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main className="container py-4">
      <h1>Note Details</h1>
      <p>You are viewing note #{id}</p>
    </main>
  );
};

export default NoteDetailsPage;