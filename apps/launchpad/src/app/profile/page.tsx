export const dynamic = "force-dynamic";

import { getProfile, seedProfileFromPortfolio, upsertProfile } from "@/actions/profile-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const existing = await getProfile();
  const profileData = existing ?? (await seedProfileFromPortfolio());

  async function saveProfile(formData: FormData) {
    "use server";

    const skillsRaw = formData.get("skills") as string;
    const experienceRaw = formData.get("experienceJson") as string;
    const educationRaw = formData.get("educationJson") as string;

    await upsertProfile({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      summary: formData.get("summary") as string,
      skills: skillsRaw.split(",").map((s) => s.trim()).filter(Boolean),
      experienceJson: JSON.parse(experienceRaw || "[]"),
      educationJson: JSON.parse(educationRaw || "[]"),
    });

    redirect("/profile");
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Your master profile — AI uses this to generate tailored resumes</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <form action={saveProfile}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={profileData.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={profileData.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={profileData.phone ?? ""} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={profileData.location ?? ""} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                name="summary"
                rows={4}
                defaultValue={profileData.summary ?? ""}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <p className="text-sm text-muted-foreground">Comma-separated list</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="skills"
                rows={3}
                defaultValue={(profileData.skills ?? []).join(", ")}
              />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(profileData.skills ?? []).map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <p className="text-sm text-muted-foreground">JSON array — each entry: company, position, period, description, bullets[]</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="experienceJson"
                rows={12}
                className="font-mono text-sm"
                defaultValue={JSON.stringify(profileData.experienceJson ?? [], null, 2)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <p className="text-sm text-muted-foreground">JSON array — each entry: institution, degree, year</p>
            </CardHeader>
            <CardContent>
              <Textarea
                name="educationJson"
                rows={6}
                className="font-mono text-sm"
                defaultValue={JSON.stringify(profileData.educationJson ?? [], null, 2)}
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            Save Profile
          </Button>
        </div>
      </form>
    </main>
  );
}
