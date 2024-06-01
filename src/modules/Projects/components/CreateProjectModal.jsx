import { useRef } from 'react'
import { useCollaborators } from '../../Collaborators/hooks/useCollaborators'
import { useSolicitudes } from '../../Requests/hooks/useSolicitudes'
import '../css/CreateProjectModal.css'
import { Modal, ModalField } from '../../../modules/Core/components/ui/Modal'
import { useProjects } from '../hooks/useProjects'

export function CreateProjectModal({ open, onCancel, onSubmit }){

    const { createProject, isLoadingCreation } = useProjects()
    const { collaborators } = useCollaborators()
    const { acceptedSolicitudes } = useSolicitudes()
    const formRef = useRef()

    const handleSubmit = async () => {
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        await createProject(data)
        if (onSubmit) onSubmit(data)
        
    }
    const handleCancel = () => {
        if (onCancel) onCancel()
    }
    const date = new Date()
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    
    var formattedDate = year + '-' + month + '-' + day;
    
    return (
        <Modal 
            title="Crear proyecto" 
            open={open}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            disableSubmitButton={isLoadingCreation}
        >
                <form className="create-project" ref={formRef}>
                    <div className="form-row">
                        <ModalField 
                            labelName="Nombre" 
                            inputElement={<input name="nombre" placeholder="Ingresa el nombre del proyecto" type="text"/>}
                        />
                        <ModalField 
                            labelName="Fecha limite" 
                            inputElement={<input name="fecha_limite" placeholder="Ingresa la fecha limite" type="date" min={formattedDate}/>}
                        />
                    </div>
                    <div className="form-row">
                        <ModalField labelName="Responsable" inputElement={
                            <select name="id_responsable">
                                <option disabled>Selecciona a un colaborador</option>
                                {
                                    collaborators &&
                                    collaborators.map(collaborator => {
                                        return (
                                            <option key={collaborator.matricula} value={collaborator.matricula}> {`${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`} </option>
                                        )
                                    })
                                }
                            </select>
                        }/>
                        <ModalField labelName="Solicitud" inputElement={
                            <select name="id_solicitud">
                                <option disabled>Selecciona a una solicitud</option>
                                {
                                    acceptedSolicitudes &&
                                    acceptedSolicitudes.map(solicitud => {
                                        return (
                                            <option key={solicitud.id} value={solicitud.id}> {solicitud.nombre} </option>
                                        )
                                    })
                                }
                            </select>
                        }/>
                    </div>
                 </form>
        </Modal>
    )
}