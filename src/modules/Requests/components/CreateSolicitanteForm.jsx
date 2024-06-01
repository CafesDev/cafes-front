import { useState, useEffect } from "react"
import { getMunicipios } from "../services/municipios";

function CreateSolicitanteForm({onSubmit}){
    const [nombre, setNombre] = useState("");
    const [apPaterno, setApPaterno] = useState("");
    const [municipio, setMunicipio] = useState("");
    // const [pais, setPais] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [telefono, setTelefono] = useState("");
    const [apMaterno, setApMaterno] = useState("");
    const [domicilio, setDomicilio] = useState("");
    // const [estado, setEstado] = useState("");

    const [municipios, setMunicipios] = useState([])
    useEffect(() => {
        getMunicipios().then(data => {
            setMunicipios(data)
            setMunicipio(data[0].id)
        })
    }, [])
    
    

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            nombres: nombre,
            apellido_paterno: apPaterno,
            apellido_materno: apMaterno,
            domicilio: domicilio,
            id_municipio: municipio,
            telefono: telefono.replaceAll('-',''),
            correo_electronico: correoElectronico
        }


        if (onSubmit) onSubmit(data)
    }
    return (
        <form className="modal" id="solicitanteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-3" id="exampleModalLabel">Crear Solicitante</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Columna 1 */}
                            <div className="col">
                                {/* Respuesta 1 */}
                                <div className="mb-3 m-2">
                                    <label htmlFor="respuesta1" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="Nombres del Solicitante" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Apellido Paterno</label>
                                    <input type="text" className="form-control" id="apPaterno" placeholder="Apellido Paterno del Solicitante" value={apPaterno} onChange={(e) => setApPaterno(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Municipio</label>
                                    {/* <input type="text" className="form-control" id="correoInst" placeholder="Municipio del Solicitante" value={municipio} onChange={(e) => setMunicipio(e.target.value)} /> */}
                                    <select className="form-select fs-7 " value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
                                        {municipios.map((municipio) => (
                                            <option key={municipio.id} value={municipio.id}>{municipio.Municipio}</option>
                                        ))}
                                    </select>

                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Pais</label>
                                    <input type="text" className="form-control" id="Contra" placeholder="Pais del Solicitante" value={pais} onChange={(e) => setPais(e.target.value)} />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Correo Electronico</label>
                                    <input type="text" className="form-control" id="confContra" placeholder="Correo Electronico del Solicitante" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="respuesta7" className="form-label">Telefono</label>
                                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" id="telefono" placeholder="Telefono del Solicitante" value={telefono} onChange={(e) => {
                                        if (e.target.value.length === 3 && telefono.length < 3) {
                                            e.target.value = e.target.value + '-'
                                        }
                                        if (e.target.value.length === 7 && telefono.length < 7) {
                                            e.target.value = e.target.value + '-'
                                        }

                                        setTelefono(e.target.value)
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta1" className="form-label">Apellido Materno</label>
                                    <input type="text" className="form-control" id="apMaterno" placeholder="Apellido Materno del Solicitante" value={apMaterno} onChange={(e) => setApMaterno(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="respuesta7" className="form-label">Domicilio</label>
                                    <input type="text" className="form-control" id="telefono" placeholder="Domicilio del Solicitante" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="respuesta7" className="form-label">Estado</label>
                                    <input type="text" className="form-control" id="correoPartic" placeholder="Estado del Solicitante" value={estado} onChange={(e) => setEstado(e.target.value)} />
                                </div> */}
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
    )
}

export default CreateSolicitanteForm