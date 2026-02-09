'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { Plus, Trash2, Link as LinkIcon, Github } from 'lucide-react'

export default function ProjectsForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const projects = resume.content.projects || []

  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
    technologies: [] as string[],
    link: '',
    github: '',
  })

  const [newTech, setNewTech] = useState('')

  const addProject = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) return

    const newItem = {
      id: `proj-${Date.now()}`,
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      technologies: newProject.technologies,
      link: newProject.link.trim(),
      github: newProject.github.trim(),
    }

    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        projects: [...projects, newItem],
      },
      updatedAt: new Date(),
    })

    setNewProject({
      id: '',
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
    })
    setNewTech('')
  }

  const updateProj = (id: string, field: string, value: any) => {
    const updated = projects.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )

    updateResumeLocally(resume.id, {
      content: { ...resume.content, projects: updated },
      updatedAt: new Date(),
    })
  }

  const deleteProj = (id: string) => {
    const updated = projects.filter(item => item.id !== id)
    updateResumeLocally(resume.id, {
      content: { ...resume.content, projects: updated },
      updatedAt: new Date(),
    })
  }

  const addTech = () => {
    if (!newTech.trim()) return
    if (newProject.technologies.includes(newTech.trim())) return

    setNewProject({
      ...newProject,
      technologies: [...newProject.technologies, newTech.trim()],
    })
    setNewTech('')
  }

  const removeTech = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(t => t !== tech),
    })
  }

  return (
    <div className="space-y-6">
      {projects.map(proj => (
        <div key={proj.id} className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">{proj.name}</h3>
            <button onClick={() => deleteProj(proj.id)} className="text-red-600">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <Input
              value={proj.name}
              onChange={e => updateProj(proj.id, 'name', e.target.value)}
              placeholder="نام پروژه"
            />

            <Textarea
              rows={3}
              value={proj.description}
              onChange={e => updateProj(proj.id, 'description', e.target.value)}
              placeholder="توضیح پروژه..."
            />

            <div>
              <Label>تکنولوژی‌ها</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                  >
                    {tech}
                    <button
                      onClick={() => {
                        const newTechs = proj.technologies.filter(t => t !== tech)
                        updateProj(proj.id, 'technologies', newTechs)
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={proj.link || ''}
                onChange={e => updateProj(proj.id, 'link', e.target.value)}
                placeholder="لینک دمو"
              />
              <Input
                value={proj.github || ''}
                onChange={e => updateProj(proj.id, 'github', e.target.value)}
                placeholder="لینک گیت‌هاب"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="border-2 border-dashed rounded-lg p-4">
        <h3 className="font-medium mb-4">افزودن پروژه جدید</h3>

        <div className="space-y-4">
          <Input
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            placeholder="نام پروژه"
          />

          <Textarea
            rows={3}
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="توضیح پروژه..."
          />

          <div>
            <Label>تکنولوژی‌ها</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    onClick={() => removeTech(tech)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTech}
                onChange={e => setNewTech(e.target.value)}
                placeholder="نام تکنولوژی"
              />
              <Button type="button" onClick={addTech}>
                +
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={newProject.link}
              onChange={e => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="لینک دمو"
            />
            <Input
              value={newProject.github}
              onChange={e => setNewProject({ ...newProject, github: e.target.value })}
              placeholder="لینک گیت‌هاب"
            />
          </div>

          <Button
            onClick={addProject}
            disabled={!newProject.name.trim() || !newProject.description.trim()}
            fullWidth
          >
            افزودن پروژه
          </Button>
        </div>
      </div>
    </div>
  )
}