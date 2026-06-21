import { getCurrentProfile } from "@/lib/queries";
import { Card, Label, Input } from "@/components/ui";

export default async function SettingsPage() {
  const profile = await getCurrentProfile();
  return (
    <div className="max-w-md space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Settings</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input defaultValue={profile?.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={profile?.email} disabled />
          </div>
          <p className="text-xs text-[#8C8B93]">
            Profile editing and push notification preferences are coming in a later phase.
          </p>
        </div>
      </Card>
    </div>
  );
}
