import '../../css/projectDetails/EditAsignadosTareaModal.css'
import { Modal, ModalField } from "../../../Core/components/ui/Modal";
import { useCollaborators } from '../../../Collaborators/hooks/useCollaborators';
import { X, PlusCircle } from 'lucide-react'
import { useTareasProyectos } from '../../hooks/useTareas';
import { useField } from '../../../Core/hooks/useField';

export function EditAsignadosTareaModal({tareaId, proyectoId, onClose, open}){

    console.log(tareaId, proyectoId)
    const { activeCollaborators } = useCollaborators()
    const { unassignTareaToColaborador, assignTareaToColaborador, tareas } = useTareasProyectos(proyectoId)
    const tarea = tareas.find(tarea => tarea.id == tareaId)
    const selectField = useField(activeCollaborators[0].matricula)

    const handleAddColaboradorToTarea = () => {
        console.log(selectField.value)
        const asignacion = {
            id_colaborador: selectField.value,
            id_tarea: tarea.id
        }

        assignTareaToColaborador(asignacion)
    }
    
    return (
        <Modal
            title="Asignados"
            open={open}
            saveButton={false}
            cancelButton="Cerrar"
            onCancel={onClose? onClose : () => {}}
            
        >
            <main className="edit-asignados-modal">

                <section className="asignados">
                    <h5>Colaboradores asignados</h5>
                    <ul>
                        {
                            tarea.colaboradores &&
                            tarea.colaboradores
                            .map((colaborador) => {
                                return (
                                    <li
                                        key={`asignados|${colaborador.matricula}`}
                                    >
                                        <figure>{colaborador.nombres.charAt(0)}</figure>
                                        <aside>
                                            <h6>{colaborador.nombres} {colaborador.apellido_paterno} {colaborador.apellido_materno}</h6>
                                            <p>{colaborador.matricula}</p>
                                        </aside>
                                        <X 
                                            className="remove"
                                            onClick={() => {
                                                const asignacion = {
                                                    id_colaborador: colaborador.matricula,
                                                    id_tarea: tarea.id
                                                }
                                                unassignTareaToColaborador(asignacion)

                                                
                                            }}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>

                <div className="asignar">
                    <ModalField
                        labelName="Asignar colaborador"
                        inputElement={
                            <select
                                name="colaborador" 
                                {...selectField}
                            >
                                {
                                    activeCollaborators &&
                                    activeCollaborators
                                    .filter((collaborator) => {
                                        const isColaboradorAlreadyInTask = tarea.colaboradores.find(colaboradorInTarea => colaboradorInTarea.matricula == collaborator.matricula)
                                        if(isColaboradorAlreadyInTask) return false

                                        return true
                                    })
                                    .map(collaborator => {
                                        return (
                                            <option key={`select|${collaborator.matricula}`} value={collaborator.matricula}>{collaborator.nombres} {collaborator.apellido_paterno} {collaborator.apellido_materno}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        }
                    />

                    <button onClick={handleAddColaboradorToTarea}>
                        <PlusCircle/>
                    </button>
                </div>
                
            </main>
        </Modal>
    )
}