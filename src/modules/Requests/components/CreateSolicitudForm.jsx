import { useState, useEffect } from "react";
import { useOrganizations } from "../hooks/useOrganizations";
import useSolicitudes from "../hooks/useSolicitudes";

function CreateSolicitudeForm({onSubmit, solicitantes}){

    const [nombre, setNombre] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [organizacion, setOrganizacion] = useState("");
    const [tipoServicio, setTipoServicio] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");
    const [descripcion, setDescripcion] = useState("")
    

    const { organizations } = useOrganizations()
    const { tiposServicio } = useSolicitudes()

    useEffect(() => {
        setTimeout(() => {
            // console.log(solicitantes[0].id)
            setSolicitante(solicitantes[0].id)
        }, 1000)
    }, []);
    
    // console.log(solicitantes)

    const handleSubmit = (evt) => {
        evt.preventDefault()

        const newSolicitud = {
                id_solicitante: solicitante,
                nombre: nombre,
                tipo_servicio: tipoServicio,
                id_organizacion: organizacion,
                descripcion: descripcion,
                fecha: fechaLimite
            }
        
        console.log(newSolicitud)

        if (onSubmit) onSubmit(newSolicitud)
    }

    return (<>
        <form className="modal" id="solicitudModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-3" id="exampleModalLabel">Crear Solicitud</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3 m-2">
                                    <label htmlFor="respuesta1" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="Nombres de la Solicitud" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-3 m-2">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">Solicitante</label>
                                    <select className="form-select fs-7 " id="exampleFormControlSelect1" value={solicitante} onChange={(e) => setSolicitante(e.target.value)}>
                                        <option disabled selected hidden>Seleccione al Solicitante</option>
                                        {solicitantes.map((solicitante) => (
                                            <option key={solicitante.id} value={solicitante.id}>{solicitante.nombres} {solicitante.apellido_paterno} {solicitante.apellido_materno}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Organizacion</label>
                                    <select className="form-select fs-7 " value={organizacion} onChange={(e) => setOrganizacion(e.target.value)}>
                                        {organizations.map((organizacion) => (
                                            <option key={organizacion.id} value={organizacion.id}>{organizacion.nombre_organizacion}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Municipio</label>
                                    <input type="text" className="form-control" id="correoInst" placeholder="Municipio del Solicitante" value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
                                </div> */}
                            </div>

                            <div className="col">
                                <div className="mb-3 m-2">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">Tipo de Servicio</label>
                                    <select className="form-select fs-7 " id="exampleFormControlSelect1" value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
                                        <option disabled selected hidden>Tipo de Servicio</option>
                                        {tiposServicio.map((tipo) => (
                                            <option key={tipo.clave} value={tipo.clave}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta7" className="form-label">Fecha Limite</label>
                                    <input type="date" className="form-control" id="matricula" placeholder="Fecha Limite" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="respuesta7" className="form-label">Telefono</label>
                                    <input type="text" className="form-control" id="telefono" placeholder="Telefono del Solicitante" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                </div> */}
                                {/* <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Correo Electronico</label>
                                    <input type="text" className="form-control" id="Contra" placeholder="Correo Electronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
                                </div> */}
                                
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                <textarea 
                                    style={{borderRadius: '8px', padding: '1rem'}}
                                    value={descripcion}
                                    onChange={(e) => {setDescripcion(e.target.value)}}
                                >

                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="cerrarBoton" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="guardarBoton" className="btn btn-primary text-white">Guardar Informacion</button>
                    </div>
                </div>
            </div>
            
        </form>
    </>
    )
}

export default CreateSolicitudeForm