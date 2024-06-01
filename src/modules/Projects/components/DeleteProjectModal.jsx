import { useProjects } from '../hooks/useProjects'
import { Modal } from '../../Core/components/ui/Modal'

export function DeleteProjectModal({open, onCancel, projectId}){

    const { deleteProject } = useProjects()
    
    const handleSubmit = () => {
        deleteProject(projectId)
    }

    return (
        <Modal
            title="Eliminar proyecto"
            open={open}
            onSubmit={handleSubmit}
            onCancel={onCancel? onCancel : () => {}}
            saveButton="Aceptar"
        >
            <p>¿Está seguro que desea eliminar el proyecto?</p>
        </Modal>
    )
}