import React, { useMemo } from 'react';
import '../../css/projectDetails/UrgentTasks.css';
import { useTareasProyectos } from '../../hooks/useTareas';

function UrgentTasks({ project }) {
  const { tareas, isLoading, updateTarea } = useTareasProyectos(project.id);

  const urgentTasks = useMemo(() => {
    if (isLoading || tareas.length === 0) return [];

    const sortedTareas = tareas.sort(
      (a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin)
    );
    return sortedTareas.slice(0, 5);
  }, [tareas, isLoading]);

  if (isLoading) {
    return <div>Cargando tareas...</div>;
  }

  return (
    <div className="urgent-tasks">
      <header>
        <h5>Tareas Urgentes</h5>
      </header>
      <div>
        {urgentTasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.estado === 'Terminada'}
              onChange={() => {
                updateTarea({
                  ...task,
                  estado: task.estado === 'Terminada' ? 'Pendiente' : 'Terminada',
                });
              }}
            />
            <label
              htmlFor={`task-${task.id}`}
              style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
            >
              {task.nombre}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrgentTasks;