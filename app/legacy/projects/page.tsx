import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects - Secure House",
  description: "Our projects",
  alternates: {
    canonical: "https://secure-house.co.uk/projects",
  },
};

export default function Page() {
  const filePath = path.join(process.cwd(), "app",
    "legacy", "projects", "content.html");
  const html = fs.readFileSync(filePath, "utf-8");
  return <ProjectsClient html={html} />;
}
