import React from 'react';
import { useTareasProyectos } from '../../hooks/useTareas';
import '../../css/projectDetails/Contributors.css'

function Contributors({ project }) {

  const { colaboradores } = useTareasProyectos(project.id)
  
  return (
    <div className="contributors">

        <h5>Contribuyentes</h5>
        
        <ul>

          {
            colaboradores &&
            colaboradores.map((colaborador) => {

              return (
                <li
                  key={`contribuyentes-${colaborador.matricula}`}
                >
                  <figure>{colaborador.nombres.charAt(0)}</figure>
                  <aside>
                    <h6>{colaborador.nombres}</h6>
                    <p>Redaccion de mensaje</p>
                  </aside>
                </li>
              )
            })
          }

        </ul>

      
    </div>
  );
}

export default Contributors;
