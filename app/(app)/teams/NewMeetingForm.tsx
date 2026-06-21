"use client";

import { useState } from "react";
import { createMeeting } from "@/app/meetings/actions";
import { Input, Label, Textarea, Button } from "@/components/ui";

export default function NewMeetingForm({ teams, defaultTeamId }: { teams: any[]; defaultTeamId?: string }) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createMeeting(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label>Team</Label>
        <select
          name="team_id"
          defaultValue={defaultTeamId ?? ""}
          required
          className="w-full rounded-md border border-[#26262E] bg-[#15151B] px-4 py-2 text-sm text-[#F2F0EB]"
        >
          <option value="" disabled>Select a team</option>
          {teams.map((t: any) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Title</Label>
        <Input name="title" placeholder="e.g. Episode 12 recording" required />
      </div>
      <div>
        <Label>Description (optional)</Label>
        <Textarea name="description" rows={3} placeholder="What's this session about?" />
      </div>
      <div>
        <Label>Start time</Label>
        <Input name="start_time" type="datetime-local" required />
      </div>
      {error && <p className="text-sm text-[#FF3B30]">{error}</p>}
      <Button type="submit">Schedule session</Button>
    </form>
  );
}
