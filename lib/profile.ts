import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const LinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url().refine((value) => value.startsWith("https://"), "URL must start with https://"),
});

const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(z.string().min(1)),
});

const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  skills: z.array(z.string().min(1)),
  url: z.string().optional().or(z.literal("")),
});

export const ProfileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  location: z.string().min(1),
  summary: z.string().min(1),
  links: z.array(LinkSchema),
  capabilities: z.array(z.string().min(1)),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
});

export type ProfileData = z.infer<typeof ProfileSchema>;

export function getProfile(): { success: true; data: ProfileData } | { success: false; error: string } {
  try {
    const filePath = path.join(process.cwd(), "career-data", "profile.json");
    const parsed = ProfileSchema.safeParse(JSON.parse(fs.readFileSync(filePath, "utf8")));
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n") };
    }
    return { success: true, data: parsed.data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Could not load profile.json" };
  }
}
