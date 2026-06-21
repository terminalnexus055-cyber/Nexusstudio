import { getMyTeams } from "@/lib/queries";
import NewMeetingForm from "./NewMeetingForm";

export default async function NewMeetingPage({
  searchParams,
}: { searchParams: Promise<{ team?: string }> }) {
  const teams = await getMyTeams();
  const { team } = await searchParams;
  return (
    <div className="max-w-md space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Schedule a session</h1>
      <NewMeetingForm teams={teams} defaultTeamId={team} />
    </div>
  );
}
