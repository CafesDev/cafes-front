import { MoreVertical } from "lucide-react"
import { useCollaborators } from "../../../Collaborators/hooks/useCollaborators"
import '../../css/projectDetails/ProjectView.css'
import { useTareasProyectos } from "../../hooks/useTareas"

export default function ProjectView({project}){

    const { getCollaboratorById } = useCollaborators()

    const collaborator = getCollaboratorById(project.id_responsable)

    const { colaboradores } = useTareasProyectos(project.id)

    const date = new Date(project.fecha_limite)
    const formattedDate = date.toLocaleDateString('es-MX', {day: "numeric", month: "long"})

    return (
        <div className="project-view-container" key={project.id}>
            <header>
                <figure></figure>
                <section>
                    <h4>{project.nombre}</h4>
                    <p>Sin organizacion</p>
                </section>
                <div>
                    <MoreVertical/>
                </div>
            </header>
            <main>
                <h6><strong>Responsable: </strong>{ collaborator? `${collaborator.nombres} ${collaborator.apellido_paterno}`: '' }</h6>
            </main>
            <footer>
                <span className="date">{formattedDate}</span>
                <section className="workers">
                    <strong>Colaboradores</strong>
                    <ul className="colaboradores-iniciales">
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

        </div>
    )
    
}