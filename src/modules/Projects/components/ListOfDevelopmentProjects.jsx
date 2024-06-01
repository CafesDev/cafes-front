import { useProjects } from "../hooks/useProjects"
import DevelopmentProject from "./DevelopmentProject"

export default function ListOfDevelopmentProjects({onSelectProject}) {
  const { projects } = useProjects()

  const handleSelectProject = (project) => {
    if (onSelectProject) onSelectProject(project)
  }
  
    return (
        <ul className="development-projects-list">
            {   
                projects &&
                projects
                    .filter((project) => project.estado != 'Terminado')

                    .map((project) => {                        
                        return (
                            <li key={project.id}>
                                <DevelopmentProject project={project} key={project.id} onSelectProject={handleSelectProject}/>
                            </li>
                        )
                    })
            }
        </ul>
    )
}