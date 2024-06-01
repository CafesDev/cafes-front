import { MoreVertical, Pencil, Trash2, ChevronRight } from "lucide-react"
import { useCollaborators } from "../../Collaborators/hooks/useCollaborators"
import { useTareasProyectos } from "../hooks/useTareas"
import { useState } from "react"
import { EditProjectModal } from "./EditProjectModal"
import { useSolicitudes } from "../../Requests/hooks/useSolicitudes"
import { DeleteProjectModal } from "./DeleteProjectModal"

export default function DevelopmentProject({project, onSelectProject}){

    const { getCollaboratorById } = useCollaborators()
    const [areOptionsShown, setOptionsShown] = useState(false)
    const [editingProject, setEditingProject] = useState(false)
    const { getRequestById } = useSolicitudes()
    const [deletingProject, setDeletingProject] = useState(null)

    const request = getRequestById(project.id_solicitud)

    const collaborator = getCollaboratorById(project.id_responsable)

    const date = new Date(project.fecha_limite)
    const formattedDate = date.toLocaleDateString('es-MX', {day: "numeric", month: "long"})

    const handleSelectProject = (project) => {
        if (onSelectProject) onSelectProject(project)
    }

    const { colaboradores } = useTareasProyectos(project.id)

    return (
       <>
        <div className="development-project-container" key={project.id}>
            <header>
                <figure></figure>
                <section>
                    <h4>{project.nombre}</h4>
                    <p>Sin organizacion</p>
                </section>
                <div>
                    <button
                        onClick={() => {setOptionsShown(!areOptionsShown)}}
                    >
                        <MoreVertical/>
                    </button>
                </div>
            </header>
            <main
                onClick={() => {setOptionsShown(false)}}
            >
                <h6><strong>Responsable: </strong>{ collaborator? `${collaborator.nombres} ${collaborator.apellido_paterno}`: '' }</h6>
                <aside>
                    <strong>Descripcion: </strong>
                    <p>{request && request.descripcion}</p>
                </aside>
                <section onClick={() => {onSelectProject(project)}}>
                    <p>Más sobre el proyecto</p>
                    <ChevronRight/>
                </section>
            </main>
            <footer>
                <span className="date">{formattedDate}</span>
                <section className="workers">
                    <strong>Colaboradores</strong>
                    <ul>
                    {
                            colaboradores &&
                            colaboradores.map((colaborador, index, array) => {
                                const letter = colaborador.nombres.charAt(0) 

                                if (index > 4) return 

                                if (index == 4){
                                    const rest = array.length - 4

                                    return (
                                        <li key={colaborador.matricula} className="rest">
                                            <figure>
                                                +{rest}
                                            </figure>
                                        </li>
                                    )
                                }
                                return (

                                    <li key={colaborador.matricula}>
                                        <figure>
                                            {letter}
                                        </figure>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
            </footer>

            <section className="project-options" hidden={!areOptionsShown}>
                <button className="delete"
                    onClick={() => {setDeletingProject(project.id)}}
                >
                
                    Eliminar
                    <Trash2/>
                </button>
                
                <button className="edit"
                    onClick={() => {setEditingProject(true)}}
                >
                    Editar
                    <Pencil/>
                </button>
                
            </section>
        </div>
        {editingProject &&
            <EditProjectModal
                project={project}
                onCancel={() => {setEditingProject(false)}}
            />
        }
        {
            deletingProject &&
            <DeleteProjectModal
                open={deletingProject != null}
                projectId={deletingProject}
                onCancel={() => {setDeletingProject(null)}}
            />
        }
       </>
    )
    
}