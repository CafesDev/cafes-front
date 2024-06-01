import { CheckIcon, CloseIcon } from "../../components/ui/Icons"
import '../css/PendingSolicitude.css'

function PendingSolicitude({solicitud, onAccept, onReject}){
    if (!onAccept)
        onAccept = () => console.log('solicitud ',solicitud.id, ' aceptada')

    if (!onReject)
        onReject = () => console.log('solicitud ',solicitud.id, ' rechazada')
    
    return (
        <div className="card-container">
            <div className="card">
                <header>
                    <span className="icon">{solicitud.nombre_solicitante[0]}</span>
                    <aside>
                        <span className="nombre-solicitante">{solicitud.nombre_solicitante}</span>
                        <span className="organizacion">{solicitud.organizacion}</span>
                        
                    </aside>
                    <div className="interaction">
                        <button onClick={() => onAccept()}><CheckIcon height={20} className="accept"/></button>
                        <button onClick={() => onReject()}><CloseIcon height={20} className="reject"/></button>
                    </div>
                </header>
                <main>
                    <h6>{solicitud.nombre}</h6>
                    <p>{solicitud.descripcion}</p>
                </main>
            </div>
        </div>
    )
}

export default PendingSolicitude