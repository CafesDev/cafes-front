import { Modal, ModalField } from '../../../components/ui/Modal'
import '../../css/projectDetails/EditTareaForProyectoModal.css'
import { useField } from '../../../hooks/useField';
import { useTareasProyectos } from '../../hooks/useTareas';

export function EditTareaForProjectModal({ tarea, onCancel }) {

    const nombreField = useField(tarea.nombre)
    const descripcionField = useField(tarea.descripcion)
    const fechaInicioField = useField(tarea.fecha_inicio)
    const fechaFinField = useField(tarea.fecha_fin)
    const estadoField = useField(tarea.estado)

    console.log(tarea)

    const { updateTarea } = useTareasProyectos(tarea.id_proyecto)

    const date = new Date()
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    
    var formattedDate = year + '-' + month + '-' + day;

    const estados = ['Pendiente', 'Iniciada', 'Terminada']

    const handleSubmit = () => {
        const updateTareaObject = {}
        const keysAndFields = {'nombre': nombreField, 'descripcion': descripcionField, 'fecha_inicio': fechaInicioField, 'fecha_fin': fechaFinField, 'estado': estadoField}

        for(let key of Object.keys(keysAndFields)){
            if(tarea[key] != keysAndFields[key].value){
                updateTareaObject[key] = keysAndFields[key].value
            }
        }


        if(Object.keys(updateTareaObject).length == 0){
            return
        }

        updateTareaObject.id = tarea.id
        
        updateTarea(updateTareaObject)
    }

    return (
        <Modal
            title="Editar tarea"
            open={tarea != null}
            onCancel={onCancel ? onCancel : () => {}}
            cancelButton="Cerrar"
            onSubmit={handleSubmit}
        >
            <form>
                <div className="form-row">
                    <ModalField
                        labelName="Nombre"
                        inputElement={
                            <input
                                type="text"
                                name="nombre"
                                placeholder={tarea.nombre}
                                maxLength="20"
                                {...nombreField}
                            />
                        }
                    />

                </div>
                <div className="form-row">
                    <ModalField
                        labelName="Inicio"
                        inputElement={
                            <input
                                type="date"
                                name="fecha_inicio"
                                placeholder={tarea.fecha_inicio}
                                min={formattedDate}
                                {...fechaInicioField}
                            />
                        }
                    />
                    <ModalField
                        labelName="Fin"
                        inputElement={
                            <input
                                type="date"
                                name="fecha_fin"
                                placeholder={tarea.fecha_inicio}
                                min={formattedDate}
                                {...fechaFinField}
                            />
                        }
                    />

                </div>
                <ModalField
                    labelName="Estado"
                    inputElement={
                        <select
                            name="estado"
                            placeholder={tarea.estado}
                            maxLength="250"
                            style={{
                                width: "18rem"
                            }}
                            {...estadoField}
                        >
                            {
                                estados &&
                                estados.map(estado => {
                                    if (estado == tarea.estado) return <option key={`estado|${estado}`} disabled value={estado}>{estado}</option>
                                    return (
                                        <option key={`estado|${estado}`} value={estado}>{estado}</option>
                                    )
                                })
                            }

                        </select>
                    }
                />
                <ModalField
                    labelName="Descripcion"
                    inputElement={
                        <textarea
                            name="descripcion"
                            placeholder={tarea.descripcion}
                            maxLength="250"
                            style={{
                                width: "18rem"
                            }}
                            {...descripcionField}
                        />
                    }
                />
            </form>
        </Modal>
    )
}
