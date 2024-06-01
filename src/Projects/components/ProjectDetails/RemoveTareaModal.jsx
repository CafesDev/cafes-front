import { useTareasProyectos } from "../../hooks/useTareas"
import { Modal } from "../../../components/ui/Modal"

export function RemoveTareaModal({tareaId, proyectoId, onClose, open=false}){

    const { deleteTarea } = useTareasProyectos(proyectoId)

    const handleSubmit = () => {
        deleteTarea(tareaId)
        // console.log('deleting tarea')
        onClose? onClose() : () => {}

    }

    return(
        <Modal
            title="Eliminar tarea"
            onSubmit={handleSubmit}    
            onCancel={onClose? onClose : () => {}}
            saveButton="Aceptar"
            open={open}
        >
            <p>¿Estás seguro de que quieres eliminar esta tarea?</p>

        </Modal>
    )

}