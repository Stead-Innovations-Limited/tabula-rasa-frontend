import VenueOverview from "@/components/venues/VenueOverview"
import SimilarVenueContainer from "@/components/venues/SimilarVenueContainer"
export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: venueId } = await params;

  return (
    <>
      <VenueOverview venueId={venueId} />
      <SimilarVenueContainer venueId={venueId} />
    </>
  )
}
