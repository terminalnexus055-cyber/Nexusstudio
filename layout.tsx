import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyTeams } from "@/lib/queries";
import AppShell from "@/components/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("name, email").eq("id", user.id).single();
  const teams = await getMyTeams();

  return (
    <AppShell userName={profile?.name ?? user.email ?? "You"} teams={teams}>
      {children}
    </AppShell>
  );
}
