import '../../css/projectDetails/ProjectDirectory.css'
import { useTareasProyectos } from '../../hooks/useTareas';
import { PenBox, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditTareaForProjectModal } from './EditTareaForProjectModal';
import CreateTareaForProjectModal from './CreateTareaForProjectModal';
import { EditAsignadosTareaModal } from './EditAsignadosTareaModal';
import { RemoveTareaModal } from './RemoveTareaModal';

function ProjectDirectory({ project }) {
  const [editingTarea, setEditingTarea] = useState(null)
  const [creatingTarea, setCreatingTarea] = useState(false)
  const [editAsignacionesTarea, setEditAsignacionesTarea] = useState(null)
  const [deletingTarea, setDeletingTarea] = useState(null)
  
  const { tareas } = useTareasProyectos(project.id)


  const handleCloseEditingTarea = () => {
    setEditingTarea(null)
  }

  const handleCloseDeletingTarea = () => {
    setDeletingTarea(null)
  }



  const handleCloseEditAsignacionesTarea = () => {
    console.log('settint edit asignaciones to null')
    setEditAsignacionesTarea(null)
  }

  
  return (
    <div className="project-directory">

      {
        editingTarea &&
        <EditTareaForProjectModal
          open={editingTarea}
          tarea={editingTarea}
          onCancel={handleCloseEditingTarea}
        />
      }

      {
        editAsignacionesTarea &&
        <EditAsignadosTareaModal 
          tareaId={editAsignacionesTarea.id}
          proyectoId={editAsignacionesTarea.id_proyecto}
          onClose={handleCloseEditAsignacionesTarea}
          open={editAsignacionesTarea != null}
        />
      }

      {
        creatingTarea &&
        <CreateTareaForProjectModal
          open={creatingTarea}
          proyecto={project}
          onClose={() => {setCreatingTarea(false)}}
        />
      }

      {
        deletingTarea &&
        <RemoveTareaModal
          open={deletingTarea != null}
          tarea={deletingTarea}
          onClose={handleCloseDeletingTarea}
          proyectoId={deletingTarea.id_proyecto}
          tareaId={deletingTarea.id}
        />
      }
      
        <header>
          <h5>Directorio del proyecto</h5>
        </header>

        <ul>
          {
            tareas &&
            tareas.map((tarea) => {

              return (
                <li key={tarea.id}>
                  <PenBox color="#833e78" className="edit-button" onClick={() => {setEditingTarea(tarea)}}/>
                  <aside>
                    <h6>{tarea.nombre}</h6>
                  </aside>
                  <Trash2 color="#FF8080" className="remove-tarea"
                    onClick={() => {setDeletingTarea(tarea)}}
                  />
                  <div className="colaboradores"
                    onClick={() => {setEditAsignacionesTarea(tarea)}}
                  >
                    {
                      tarea.colaboradores.map((colaborador, index, array) => {
                        if (index > 3) return <></>

                        if (index == 3) {
                          const rest = array.length - 4

                          return (
                            <figure key={`project-directory-rest|${tarea.id}`}>
                              +{rest}
                            </figure>
                          )
                          
                        }
                            
                        
                        return (
                          <figure key={`project-directory|${tarea.id}|${colaborador.matricula}`}>{colaborador.nombres.charAt(0)}</figure>
                        )
                      })
                    }
                  </div>
                </li>
              )
            })
          }
        </ul>

        <button 
          className="add-more-tareas"
          onClick={() => {setCreatingTarea(true)}}
        >
          Añadir mas <Plus color="#7A4685" size={15}/>
        </button>
        
    </div>
  );
}

export default ProjectDirectory;
