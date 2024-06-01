import { Modal, ModalField } from '../../components/ui/Modal'
import { useField } from '../../hooks/useField'
import { useCollaborators } from '../../Collaborators/hooks/useCollaborators'
import { useProjects } from '../hooks/useProjects'

export function EditProjectModal({ project, onCancel }){

    const { updateProject } = useProjects()

    const nombreField = useField(project.nombre)
    const responsableField = useField(project.id_responsable)

    const handleSubmit = () => {
        if (nombreField.value == project.nombre && responsableField.value == project.id_responsable) return false

        const data = {
            nombre: nombreField.value,
            id_responsable: responsableField.value
        }

        console.log(data)

        data.id = project.id
        console.log(data)

        updateProject(data)
    }
    

    const { collaborators } = useCollaborators()

    return (
        <Modal
            open={true}
            title="Editar proyecto"
            onSubmit={handleSubmit}
            onCancel={onCancel? onCancel :  () => {}}

        >
            <form>
                <ModalField
                    labelName="Nombre"
                    inputElement={
                        <input
                            name="nombre"
                            type="text"
                            placeholder="Escribe el nombre"
                            {...nombreField}
                        />
                    }
                />

                <ModalField
                    labelName="Responsable"
                    inputElement={
                        <select
                            name="id_responsable"
                            {...responsableField}
                        >

                            {collaborators && 
                            collaborators
                                .filter(collaborator => {
                                    return collaborator.matricula !== project.id_responsable
                                })
                                .map((collaborator) => {
                                return (
                                    <option selected={collaborator.matricula == project.id_responsable} key={collaborator.matricula} value={collaborator.matricula}>{ ` ${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}` }</option>
                                )
                            })}

                        </select>
                    }
                />
            </form>
        </Modal>
    )
}