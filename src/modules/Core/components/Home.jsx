import '../css/Home.css'
import lupa from "../../../assets/icons/lupa.svg";
import { useCollaborators } from '../../Collaborators/hooks/useCollaborators'
import { ChevronRight, User2 } from 'lucide-react';
import { useSolicitudes } from '../../Requests/hooks/useSolicitudes';
import useSolicitantes from '../../Requests/hooks/useSolicitantes'
import imagen from '../../../assets/img/chambiador.png'

function Home() {

  const { collaborators } = useCollaborators()
  const { solicitudes } = useSolicitudes()
  const { solicitantes } = useSolicitantes()
  const username = sessionStorage.getItem('username');
 
  
  const arrowClick = () => {
    alert('Redirigir a la ventana "Collaborators.jsx" / Mostrar colaboradores');
  };
  const colaboradorClick = () => {
    alert('Mostrar colaborador')
  };
  const requestClick = () => {
    alert('Redirigir a la ventana "Requests.jsx" / Mostrar solicitudes pendientes')
  };
 const solicitudClick = () => {
    alert('Mostrar respectiva solicitud ')
  };

  // console.log(solicitudes)

  return (

    <div
      className="home-container"
      style={{
        height: '100vh',
        width: '70vw',
        // backgroundColor: 'red'
      }}
    >
    {/* PRIMER DIV: BIENVENIDA */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '3rem 1rem',
        }}
      >
        <h2>Panel de Control</h2>
        <div 
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <p style={{ margin: '0'}}>Fecha Actual: {new Date().toLocaleDateString()}</p>
          <figure style={{margin: 0, display: 'grid', placeItems: 'center'}}>
            <img src={lupa}
              style={{
                padding: '0',
                margin: '0',
              }}
            />
          </figure>
        </div>
      </header>

      <main
        className="home-content"
        // style={{
        //   display: 'grid',
        //   gridTemplateColumns: 'repeat(5, 1fr)',
        //   gap: '2rem'
        // }}
      >
        <section
          className="welcome-message"
          style={{
            gridColumn: '1 / 6',
            display: 'flex',
            backgroundColor: 'white',
            alignItems: 'center',
            padding: '1rem 3rem',
            borderRadius: '1rem'
          }}
        >
          <main
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <h3>¡Bienvenid@ {username}!</h3>
            <p
              style={{margin: 0, padding: 0}}
            >
              Tienes solicitudes pendientes en la plataforma.
            </p>
            <p
              style={{margin: 0, padding: 0}}
            >
              Puedes desocupar pendientes en la pestaña correspondiente a la derecha
            </p>
          </main>
          <figure
            style={{
              width: '10rem',
              height: '10rem',
              backgroundColor: 'white',
              marginLeft: 'auto'
            }}
          >
            <img  
              src={imagen}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </figure>
        </section>
        
        <section className="colaboradores"
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            gridColumn: '1 / 3'
          }}

          >          
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',

            }}          
          >
            <h5>Colaboradores</h5>
            <button
              style={{
                border: 'none'
              }}
            >
              Más
              <ChevronRight/>
            </button>
          </header>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              backgroundColor: 'transparent',
              overflow: 'hidden',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {
              collaborators &&
              collaborators.map((collaborator, index) => {

                if(index > 2) return <></>

                return (
                  
                  <li
                  key={collaborator.matricula}
                  style={{
                    backgroundColor: '#f0efe7',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    border: '3px solid #2c2539'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: '100%',
                      padding: '1rem',
                      backgroundColor: '#2c2539',
                      
                    }}
                  >
                    <User2 
                      style={{
                        color: 'white',
                        width: 'min(5rem, 10rem)',
                        height: 'min(5rem, 100%)',
                      }}
                    />
                  </div>

                  <aside
                    style={{
                      backgroundColor: '#f0efe7',
                      padding: '1rem',
                      height: '100%',
                      flexGrow: 1,
                      alignSelf: 'stretch',
                      textAlign: 'start'
                    }}
                  >
                      <h6>{`${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`}</h6>
                      <p 
                        style={{
                          paddingLeft: 0,
                          margin: 0,
                          display: 'block'
                        }}
                      >
                        {collaborator.tipo}
                      </p>
                  </aside>
                  
                </li>
                )
              })
            }

          </ul>



          
        </section>
        <section className="Solicitudes"
          style={{
            gridColumn: '3/6',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',

          }}
        >
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',

            }}          
          >
            <h5>Solicitudes pendientes</h5>
            <button
              style={{
                border: 'none'
              }}
            >
              Más
              <ChevronRight/>
            </button>
          </header>
          <ul
            style={{
              listStyle: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              height: '90%',
              marginTop: '1rem',
              padding: 0

            }}
          >
            { 
              solicitudes &&
              solicitudes.map((solicitud, index) => {
                if (index > 4) return <></>

                const date = new Date(solicitud.fecha)

                const formattedDate = date.toLocaleDateString('en-MX', { month: 'short', day: '2-digit', year: 'numeric' });
                
                // console.log(solicitud)

                const solicitante =  solicitantes.find(solicitante => solicitante.id == solicitud.id_solicitante)

                return (
                  <li
                  style={{
                    margin: 0,
                    padding: '1rem',
                    borderBottom: '2px solid #F0EFE6',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <p
                    style={{
                      display: 'flex', 
                      alignItems: 'center',
                      padding: 0,
                      margin: 0,
                      gap: '1rem'
                    }}
                  ><strong>{solicitud.nombre}</strong> - {formattedDate}
                  </p>
                  <div
                    style={{
                      backgroundColor: '#8d397b',
                      display: 'grid',
                      placeItems: 'center',
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '1.2rem',
                      color: 'white',
                      marginLeft: 'auto',
                      fontSize: '1.2rem',
                      fontWeight: '600'
                    }}
                  >
                    {solicitante && solicitante.nombres.charAt(0)}
                    </div>
                </li>
                )
              }) 
            }

          </ul>
        </section>
        
      </main>
  </div>
  
  );
}

export default Home;
