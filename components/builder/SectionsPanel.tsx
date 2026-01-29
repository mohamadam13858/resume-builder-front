
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PersonalForm from '@/components/sections/PersonalForm';
import ExperienceForm from '../sections/ExperienceForm';


export default function SectionsPanel() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>

      <Accordion type="single" collapsible defaultValue="personal" className="w-full">
        <AccordionItem value="personal">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <PersonalForm />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            <ExperienceForm/>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}