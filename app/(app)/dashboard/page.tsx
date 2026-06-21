import Link from "next/link";
import { getMyTeams, getUpcomingMeetings } from "@/lib/queries";
import { Card, Badge, EmptyState, Button } from "@/components/ui";
import { formatDateTime } from "@/lib/format";

export default async function DashboardPage() {
  const [teams, meetings] = await Promise.all([getMyTeams(), getUpcomingMeetings(6)]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-[#8C8B93]">Your distributed studio, at a glance.</p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#8C8B93]">Upcoming sessions</h2>
          <Link href="/meetings/new" className="text-sm text-[#FF3B30] hover:underline">Schedule one →</Link>
        </div>
        {meetings.length === 0 ? (
          <EmptyState
            title="Nothing on the calendar"
            description="Schedule your first recording session to get the team together."
            action={<Link href="/meetings/new"><Button>Schedule a session</Button></Link>}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {meetings.map((m: any) => (
              <Link key={m.id} href={`/meetings/${m.id}`}>
                <Card className="h-full transition-colors hover:border-[#3A3A44]">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium leading-snug">{m.title}</h3>
                    <Badge status={m.status} />
                  </div>
                  <p className="mt-2 text-xs text-[#8C8B93]">{m.teams?.name}</p>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[#8C8B93]">
                    {formatDateTime(m.start_time)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#8C8B93]">Your teams</h2>
          <Link href="/teams/new" className="text-sm text-[#FF3B30] hover:underline">New team →</Link>
        </div>
        {teams.length === 0 ? (
          <EmptyState
            title="No teams yet"
            description="Create a team to start scheduling recording sessions with collaborators."
            action={<Link href="/teams/new"><Button>Create a team</Button></Link>}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((t: any) => (
              <Link key={t.id} href={`/teams/${t.id}`}>
                <Card className="h-full transition-colors hover:border-[#3A3A44]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{t.name}</h3>
                    <Badge status={t.role} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
