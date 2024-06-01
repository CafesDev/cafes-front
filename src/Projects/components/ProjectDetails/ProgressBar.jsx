import '../../css/projectDetails/ProgressBar.css'
import { useTareasProyectos } from '../../hooks/useTareas'

function ProgressBar({ project }) {
  const { tareas, colaboradores } = useTareasProyectos(project.id)

  const tareasCompletadas = tareas.filter(tarea => tarea.estado === 'Terminada')

  const date = new Date()
  const formattedDate = date.toLocaleDateString('es-MX', {day: "numeric", month: "long"})

  
  return (
    <div className="progress-bar">
 
      <header>
        <h6>Progreso de actividades</h6>
        <p>Tareas terminadas {tareasCompletadas.length} de {tareas.length}</p>
      </header>
      <main>
        <div className="bar">
          <div className="progress" style={{ width: `${(tareasCompletadas.length / tareas.length) * 100}%` }}></div>
        </div>
      </main>
    {/* <footer>
      <span className="date">{formattedDate}</span>
          <section className="workers">
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
    </footer> */}
    </div>
  );
}

export default ProgressBar;
