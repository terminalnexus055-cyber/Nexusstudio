import Link from "next/link";
import { getAllMeetings } from "@/lib/queries";
import { Badge, Button, EmptyState } from "@/components/ui";
import { formatDateTime } from "@/lib/format";

export default async function MeetingsPage() {
  const meetings = await getAllMeetings();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Sessions</h1>
        <Link href="/meetings/new"><Button>Schedule session</Button></Link>
      </div>
      {meetings.length === 0 ? (
        <EmptyState
          title="No sessions scheduled"
          description="Schedule a recording session for one of your teams."
          action={<Link href="/meetings/new"><Button>Schedule session</Button></Link>}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#26262E] bg-[#15151B]">
          <ul className="divide-y divide-[#26262E]">
            {meetings.map((m: any) => (
              <li key={m.id}>
                <Link href={`/meetings/${m.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#1C1C24]">
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-xs text-[#8C8B93]">{m.teams?.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#8C8B93]">
                      {formatDateTime(m.start_time)}
                    </span>
                    <Badge status={m.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
