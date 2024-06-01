import { CirclePlus } from "lucide-react"
import '../css/Projects.css'

export default function ProjectsNavBar({sections, onSectionChange, currentSection, onCreateProject}){

    const handleSectionChange = (sectionName) => {

        if (onSectionChange) onSectionChange(sectionName)
    }

    const handleCreateProject = () => {
        if (onCreateProject) onCreateProject()
    }
    
    return (
        <div className="projects-nav">
            <div className="projects-nav-items">
                {Object.keys(sections).map( (sectionName, index) => {
                    return (
                        <span
                            key={sectionName + index}
                            className={`projects-section ${currentSection == sectionName? 'active' : ''}`}
                            onClick={() => handleSectionChange(sectionName)} 
                        >
                            {sectionName}
                        </span>
                    )
                })}
            </div>

            <button 
                className="create"
                onClick={handleCreateProject}
            >
                <CirclePlus size={15}/>
                Crear proyecto
            </button>
        </div>
    )
}