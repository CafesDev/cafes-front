import '../../css/projectDetails/Calendar.css'
import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useTareasProyectos } from '../../hooks/useTareas'

function ProjectCalendar({ project, markers=[] }) {

  const [date , setDate] = useState(new Date())

  const { tareas } = useTareasProyectos(project.id)

  if (markers.length == 0){
    markers = getTareasDays()
  }

  const pastDate = new Date(date.getFullYear(), date.getMonth(), 0)
  const nextDate = new Date(date.getFullYear(), date.getMonth() + 2, 0)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

  let month = date.toLocaleDateString('es-MX',{month: 'long'})
  month = month.charAt(0).toUpperCase() + month.slice(1)

  
  function getNumberOfDays(date){
    let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return days
  }

  function getTareasDays(){
    let tareasDays = tareas.map((tarea) => {
      return {
        fecha_inicio: new Date(tarea.fecha_inicio),
        fecha_fin: new Date(tarea.fecha_fin)
      }
    })

    return tareasDays
  }

  
  function renderDays(){
    const numberOfRenderedDays = 35
    const days = []
    const today = new Date()
    const tareasDays = getTareasDays()

    //Padding left of days
    for(let i = 0; i < firstDay.getDay()-1; i++){
      days.unshift(
        <span className="not-active-month">{pastDate.getDate() + - i}</span>
      )
    
    }

    //Current month days
    for(let i = 1; i <= getNumberOfDays(date); i++){

      const currentDate = new Date(date.getFullYear(), date.getMonth(), i)

      const isToday = currentDate.toDateString() === today.toDateString()

      const marker = markers.find((marker) => {
        const markerInicioDate = new Date(marker.fecha_inicio)
        const markerFinDate = new Date(marker.fecha_fin)

        return markerInicioDate.toDateString() === currentDate.toDateString() || markerFinDate.toDateString() === currentDate.toDateString()

      })
      
      
      const isIntermediate = markers.find((tareas) => {
        const tareasInicioDate = new Date(tareas.fecha_inicio)
        const tareasFinDate = new Date(tareas.fecha_fin)
        
        const isAfterTareasInicio = tareasInicioDate < currentDate
        
        const isBeforeTareasFin = currentDate < tareasFinDate

        
        return isAfterTareasInicio && isBeforeTareasFin
      })


      days.push(
        <span 
          className={`${isToday? 'today' : ''}  ${marker? 'marker' : ''} ${isIntermediate? 'intermediate' : ''}`} 


          key={`previous-month-${i}`}
        >
          {i}
        </span>
      )
    }

    for (let i = 1; days.length < numberOfRenderedDays; i++){
      // console.log(days.length)
      days.push(
        <span className="not-active-month" key={`next-month-${i}`}>{i}</span>
      )
    }

    return days
  }

  renderDays()
  return (
    <div className="project-calendar">
      <header>
        <button
          onClick={() => {
            setDate(new Date(date.setMonth(date.getMonth() - 1)))
          }}
        >
          <ChevronLeft/>
        </button>
          <h5>{month}</h5>
        <button
          onClick={() => {
            setDate(new Date(date.setMonth(date.getMonth() + 1)))
          }}
        >
          <ChevronRight/>
        </button>
      </header>
      <main>
        <section className="day-names">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mie</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sab</span>
          <span>Dom</span>
        </section>
        <section className="days">
          {renderDays()}
        </section>
      </main>
      <footer>
        {date.getFullYear()}
      </footer>
    </div>
  );
}


export default ProjectCalendar;
