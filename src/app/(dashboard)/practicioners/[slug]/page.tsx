import PractitionersOverview from "@/components/practicioners/PractitionersOverview";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: practicionerId } = await params;

  return (
    <>
      <PractitionersOverview id={practicionerId} />
    </>
  )
}