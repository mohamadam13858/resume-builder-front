'use client'

import React, { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  Plus, 
  Trash2, 
  Award, 
  Link as LinkIcon,
  Github,
  Calendar,
  Tag,
  ExternalLink
} from 'lucide-react'

const ProjectsForm = () => {
  const { getActiveResume, addProject, updateProject, deleteProject } = useResumeStore()
  const activeResume = getActiveResume()
  const projects = activeResume?.projects || []

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: [] as string[],
    link: '',
    github: ''
  })

  const [newTech, setNewTech] = useState('')

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      addProject()
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: ''
      })
    }
  }

  const handleAddTechnology = () => {
    if (newTech.trim() && !newProject.technologies.includes(newTech.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()]
      })
      setNewTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(tech => tech !== techToRemove)
    })
  }

  return (
    <div className="space-y-6">

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">
                  پروژه {index + 1}
                </span>
              </div>
              
              <button
                onClick={() => deleteProject(project.id)}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

    
            <div className="space-y-4">
              
              <div>
                <Label htmlFor={`project-name-${project.id}`} required>
                  نام پروژه
                </Label>
                <Input
                  id={`project-name-${project.id}`}
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  className="mt-1"
                  placeholder="نام پروژه"
                />
              </div>

              
              <div>
                <Label htmlFor={`project-description-${project.id}`} required>
                  توضیحات
                </Label>
                <Textarea
                  id={`project-description-${project.id}`}
                  rows={4}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  className="mt-1"
                  placeholder="توضیحات کامل پروژه، مسئولیت‌های شما، تکنولوژی‌های استفاده‌شده..."
                />
              </div>

              
              <div>
                <Label htmlFor={`project-tech-${project.id}`}>
                  تکنولوژی‌ها
                </Label>
                <div className="mt-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tech}
                        <button
                          onClick={() => {
                            const newTechs = project.technologies.filter(t => t !== tech)
                            updateProject(project.id, { technologies: newTechs })
                          }}
                          className="mr-1 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id={`project-tech-${project.id}`}
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="افزودن تکنولوژی"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          if (newTech.trim()) {
                            updateProject(project.id, {
                              technologies: [...project.technologies, newTech.trim()]
                            })
                            setNewTech('')
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newTech.trim()) {
                          updateProject(project.id, {
                            technologies: [...project.technologies, newTech.trim()]
                          })
                          setNewTech('')
                        }
                      }}
                    >
                      افزودن
                    </Button>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`project-link-${project.id}`}>
                    لینک پروژه
                  </Label>
                  <Input
                    id={`project-link-${project.id}`}
                    type="url"
                    value={project.link || ''}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    leftIcon={<LinkIcon className="h-5 w-5" />}
                    className="mt-1"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor={`project-github-${project.id}`}>
                    لینک گیت‌هاب
                  </Label>
                  <Input
                    id={`project-github-${project.id}`}
                    type="url"
                    value={project.github || ''}
                    onChange={(e) => updateProject(project.id, { github: e.target.value })}
                    leftIcon={<Github className="h-5 w-5" />}
                    className="mt-1"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">
          افزودن پروژه جدید
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-project-name" required>
              نام پروژه
            </Label>
            <Input
              id="new-project-name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="نام پروژه"
            />
          </div>

          <div>
            <Label htmlFor="new-project-description" required>
              توضیحات
            </Label>
            <Textarea
              id="new-project-description"
              rows={4}
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              placeholder="توضیحات کامل پروژه..."
            />
          </div>

        
          <div>
            <Label htmlFor="new-project-tech">
              تکنولوژی‌ها
            </Label>
            <div className="mt-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(tech)}
                      className="mr-1 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="new-project-tech"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="افزودن تکنولوژی"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTechnology()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddTechnology}
                >
                  افزودن
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-project-link">
                لینک پروژه
              </Label>
              <Input
                id="new-project-link"
                type="url"
                value={newProject.link}
                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="new-project-github">
                لینک گیت‌هاب
              </Label>
              <Input
                id="new-project-github"
                type="url"
                value={newProject.github}
                onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddProject}
            leftIcon={<Plus className="h-4 w-4" />}
            disabled={!newProject.name || !newProject.description}
            fullWidth
          >
            افزودن پروژه
          </Button>
        </div>
      </div>


      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="space-y-1">
          <p className="text-sm text-blue-700">
            💡 پروژه‌های خود را با فرمت STAR توضیح دهید:
          </p>
          <ul className="text-sm text-blue-700 pr-4 space-y-1">
            <li>• <strong>Situation</strong>: موقعیت و مشکل</li>
            <li>• <strong>Task</strong>: وظیفه و هدف</li>
            <li>• <strong>Action</strong>: اقدامات انجام‌شده</li>
            <li>• <strong>Result</strong>: نتایج و دستاوردها</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectsForm