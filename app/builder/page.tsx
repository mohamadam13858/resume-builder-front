'use client';
import BuilderLayout from "@/components/builder/BuilderLayout";
import SectionsPanel from "@/components/builder/SectionsPanel"
import ResumePreview from "@/components/preview/ResumePreview"
import { useResumeStore } from "@/store/resumeStore";

export default function BuilderPage() {
  const { data } = useResumeStore();

  return (
    <BuilderLayout
      left={<SectionsPanel/>}
      right={<ResumePreview data={data} />}
    />
  );
}