const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <>some user {id}</>;
};

export default page;
