import React from 'react';
import clipboardImage from '../../../assets/img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateSolicitanteForm from '../components/CreateSolicitanteForm.jsx';
import CreateSolicitudeForm from '../components/CreateSolicitudForm.jsx';
import plusIcon from '../../../assets/icons/addicon.svg';
import '../../../modules/Core/css/App.css';
import PendingSolicitude from '../components/PendingSolicitude.jsx';
import { useSolicitudes } from '../hooks/useSolicitudes.js';
import useSolicitantes from '../hooks/useSolicitantes.js';
import { useOrganizations } from '../hooks/useOrganizations.js';
import { useMunicipios } from '../hooks/useMunicipios.js';

const Requests = () => {

    const {solicitudes, refreshSolicitudes, acceptOrRejectSolicitud, createSolicitude} = useSolicitudes()
    const { solicitantes, createSolicitante } = useSolicitantes()
    const { municipios } = useMunicipios()
    const { organizations } = useOrganizations()

    const handleSolicitanteSubmit = (newSolicitante) => {
        console.log(newSolicitante)
        createSolicitante(newSolicitante).then(data => console.log(data))
    }
    
    const handleSolicitudSubmit = (newSolicitud) => {
        console.log(newSolicitud)
        createSolicitude(newSolicitud).then(data => console.log(data))
    }

    // console.log(solicitudes)
    // console.log(solicitantes)

    if(!municipios || !organizations) return <></>

    return (
        <div className="row" style={{width: '70vw'}}>
            <div className="row">
                <div className="row align-items-center mb-5">
                    <img className="col col-1" src={clipboardImage} />
                    <h1 className="col col-11 fs-2 fw-bold text-start">
                        CAFES / Solicitudes
                    </h1>
                </div>
            </div>
            <div className="row py-4">
                <div className="col col-3 me-4">
                    <div>
                        <h3 className="fw-bold fs-4 text-start">Solicitudes Pendientes</h3>
                    </div>
                    <div className="col">
                        {solicitudes.filter(item => item.estado == 'Espera').map(item => (
                            <PendingSolicitude 
                                key={item.id}
                                solicitud={item}
                                onAccept={() => {acceptOrRejectSolicitud({idSolicitud: item.id, estado: 'Aceptada'})}}
                                onReject={() => {acceptOrRejectSolicitud({idSolicitud: item.id, estado: 'Rechazada'})}}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="col col-8">
                    <div className="d-flex justify-content-end">
                        <button id="boton-colab" className="border border-0 px-3 py-2 rounded-pill text-white mb-3" data-bs-toggle="modal" data-bs-target="#solicitudModal"><img className="addMoreIcon pe-2 text-white" src={plusIcon} />
                            Crear Solicitud
                        </button>
                    </div>
                    <div className="bg-light border border-transparent rounded-4 pt-3 p-5 ms-4 mb-4">
                        <h3 className="text-start">Solicitudes Aceptadas</h3>
                        <table className="requestsTable table table-hover mt-5 border-top lh-lg ">
                            <thead className="rounded-pill">
                                <tr>
                                    <th scope="col">Solicitud</th>
                                    <th scope="col">Organizacion</th>
                                    <th scope="col">Solicitante</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solicitudes.map(solicitud => {

                                    const organizacion = organizations.find(organization => organization.id == solicitud.id_organizacion)

                                    return (
                                        <tr className="border-bottom border-dark-subtle" key={solicitud.id}>
                                            <th scope="row" className="fw-normal">{solicitud.nombre}</th>
                                            <td >{organizacion.nombre_organizacion}</td>
                                            <td>{solicitud.nombre_solicitante}</td>
                                            <td>{solicitud.fecha}</td>
                                            <td>{solicitud.estado}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button id="boton-colab" className="border border-0 px-3 py-2 rounded-pill text-white mb-3" data-bs-toggle="modal" data-bs-target="#solicitanteModal"><img className="addMoreIcon pe-2 text-white" src={plusIcon} />
                            Crear Solicitante
                        </button>
                    </div>
                    <div className="bg-light border border-transparent rounded-4 pt-3 p-5 ms-4">
                        <h3 className="text-start">Solicitantes</h3>
                        <table className="requestsTable table table-hover mt-5 border-top lh-lg ">
                                <thead className=" border-bottom border-dark-subtle ">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Domicilio</th>
                                        <th scope="col">Municipio</th>
                                        <th scope="col">Télefono</th>
                                        <th scope="col">Correo Electrónico</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitantes.map(solicitante => {
                                        
                                        const municipio = municipios.find(municipio => municipio.id == solicitante.id_municipio)


                                        return (
                                            <tr className="border-bottom border-dark-subtle" key={solicitante.id}>
                                                <th scope="row" className="fw-normal">{`${solicitante.nombres} ${solicitante.apellido_paterno} ${solicitante.apellido_materno}`}</th>
                                                <td>{solicitante.domicilio}</td>
                                                <td>{`${municipio.Municipio}, ${municipio.Estado}`}</td>
                                                <td>{solicitante.telefono}</td>
                                                <td>{solicitante.correo_electronico}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Crear Solicitud */}
            <div>
        {/* Modal */}
       <CreateSolicitudeForm onSubmit={handleSolicitudSubmit} solicitantes={solicitantes}></CreateSolicitudeForm>
       <CreateSolicitanteForm onSubmit={handleSolicitanteSubmit} ></CreateSolicitanteForm>
               
            </div> 


    </div>
                
    );
};
export default Requests;