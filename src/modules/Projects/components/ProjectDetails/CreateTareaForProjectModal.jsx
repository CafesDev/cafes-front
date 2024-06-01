import { useCollaborators } from "../../../Collaborators/hooks/useCollaborators";
import { Modal, ModalField } from "../../../Core/components/ui/Modal";
import { useRef } from "react";
import { useTareasProyectos } from "../../hooks/useTareas";

export default function CreateTareaForProjectModal({proyecto, open, onClose}){

    const { createTarea } = useTareasProyectos(proyecto.id)
    const { collaborators } = useCollaborators()
    const form = useRef(null)
    
    const date = new Date()
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;


    const handleSubmit = () => {
        const formData = new FormData(form.current)
        const data = Object.fromEntries(formData.entries())
        data.id_proyecto = proyecto.id
        createTarea(data)

        onClose? onClose() : () => {}
    }

    return(
        <Modal
            title="Crear tarea"
            open={open? true : false}
            onSubmit={handleSubmit}
            onCancel={onClose? onClose : () => {}}
        >
            <form
                style={{
                    minWidth: "15rem"
                }}
                ref={form}
            >
                <div className="form-row">
                    <ModalField 
                        labelName="Nombre de tarea"
                        inputElement={
                            <input 
                                name="nombre" 
                                placeholder="Escribe el nombre de la tarea"
                                style={{
                                    minWidth: "15rem"
                                }}
                            />
                        }
                    />
                    <ModalField 
                        labelName="Colaborador asignado"
                        inputElement={
                            <select 
                                name="id_colaborador"
                            >
                                <option disabled>Selecciona a un colaborador</option>
                                {
                                    collaborators &&
                                    collaborators.map(collaborator => (
                                        <option key={collaborator.matricula} value={collaborator.matricula}>{`${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`}</option>
                                    ))
                                }
                            </select>
                        }
                    />
                </div>
                <div className="form-row">
                    <ModalField
                        labelName="Fecha de inicio"
                        inputElement={
                            <input 
                                name="fecha_inicio" 
                                type="date"
                                min={formattedDate}
                                style={{
                                    minWidth: "15rem"
                                }}
                            />
                        }
                    />
                    <ModalField
                        labelName="Fecha de finalizacion"
                        inputElement={
                            <input 
                                name="fecha_fin" 
                                type="date"
                                min={formattedDate}
                                style={{
                                    minWidth: "15rem"
                                }}
                            />
                        }
                    />
                </div>
                <ModalField
                    labelName="Descripcion"
                    inputElement={
                        <textarea 
                            name="descripcion" 
                            rows="5"
                            style={{
                                width: "40rem"
                            }}
                        />
                    }
                />

            </form>

        </Modal>
    )
}