type LabPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LabPage({
  params: { id },
  searchParams,
}: LabPageProps) {
  return (
    <div className="container">
      <h1>Lab Page</h1>
      <p>id: {id}</p>
    </div>
  );
}
