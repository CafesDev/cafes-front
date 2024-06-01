import { useState } from 'react'
import clipboardImage from '../../../assets/img/logo.png';
import ProjectsNavBar from '../components/ProjectsNavBar';
import ListOfDevelopmentProjects from '../components/ListOfDevelopmentProjects'
import ProjectHistoryTable from '../components/ProjectsHistoryTable';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { ProjectDetails } from '../components/ProjectDetails/ProjectDetails';

const sections = {
    'Proyectos en desarrollo': ListOfDevelopmentProjects,
    'Historial de proyectos': ProjectHistoryTable
}

function Projects() {

    const [currentSection, setCurrentSection] = useState(Object.keys(sections)[0])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [currentProject, setCurrentProject] = useState(null)
    
    const handleSectionChange = (newSectionKey) => {
        setCurrentSection(newSectionKey)
    }

    const handleCreateProject = () => {
        setIsModalOpened(!isModalOpened)
    }

    const handleCloseModal = () => {
        setIsModalOpened(false)
    }

    const handleSelectProject = (project) => {
        setCurrentProject(project)
    }
    
    const handleCloseProject = () => {
        setCurrentProject(null)
    }
      
      
    const ViewProjectComponent = sections[currentSection]

    if (currentProject){
        return (
            <ProjectDetails project={currentProject} onClose={handleCloseProject}/>
        )
    }

  return (
        <>
            <div style={{width: '70vw'}}>
                <div className="row align-items-center mb-5">
                    <img className="col col-1" src={clipboardImage} />
                    <h1 className="col col-11 fs-2 fw-bold text-start">
                        CAFES / Proyectos
                    </h1>
                        <main>
                            <ProjectsNavBar 
                                onSectionChange={handleSectionChange} 
                                sections={sections} 
                                currentSection={currentSection}
                                onCreateProject={handleCreateProject}
                            />
                            <ViewProjectComponent onSelectProject={handleSelectProject}/>
                        </main>
                </div>
            </div>
            <CreateProjectModal 
                open={isModalOpened}
                title="Crear proyecto"
                onCancel={handleCloseModal}
                onSubmit={handleCloseModal}
            />
        </>
    )
}

export default Projects;