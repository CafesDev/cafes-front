import { useEffect, useState } from "react";
import { useCollaborators } from "../hooks/useCollaborators"
import { useField } from "../../hooks/useField";

function CreateUserForm({onSubmit}){

    const { tiposColaborador, licenciaturas } = useCollaborators()
    
    const nombreField = useField('')
    const apellidoPaternoField = useField('')
    const apellidoMaternoField = useField('')
    const correoPersonalField = useField('')
    const contrasenaField = useField('')
    const contrasenaConfField = useField('')
    const matriculaField = useField('')
    const telefonoField = useField('')
    const [licenciatura, setLicenciatura] = useState('')
    const [tipoColaborador, setTipoColaborador] = useState('')

    
    useEffect(() => {
      if (licenciaturas.length)
        setLicenciatura(licenciaturas[0].clave)
      if (tiposColaborador.length)
        setTipoColaborador(tiposColaborador[0].clave)
    }, [tiposColaborador, licenciaturas])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (contrasenaField.value != contrasenaConfField.value) return
        const data = {
            nombres: nombreField.value,
            apellido_paterno: apellidoPaternoField.value,
            apellido_materno: apellidoMaternoField.value,
            telefono: telefonoField.value,
            correo_personal: correoPersonalField.value,
            contrasena: contrasenaField.value,
            tipo: tipoColaborador,
            matricula: matriculaField.value,
            clave_licenciatura: licenciatura
        }

        console.log(data)

        if (onSubmit) onSubmit(data)


    }

    return(
        <form className="modal" id="colaboradorModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden= 'true' onSubmit={handleSubmit}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-3" id="exampleModalLabel">Crear Colaborador</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div className="mb-3 m-2">
                    <label htmlFor="respuesta1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombres" placeholder="Nombres del colaborador" {...nombreField}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta1" className="form-label">Apellido Paterno</label>
                    <input type="text" className="form-control" id="apellido_paterno"placeholder="Apellido Paterno del colaborador" {...apellidoPaternoField}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta1" className="form-label">Apellido Materno</label>
                    <input type="text" className="form-control" id="apellido_materno"placeholder="Apellido Materno del colaborador" {...apellidoMaternoField}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" {...contrasenaField}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta1" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-control" id="confContra" placeholder="Confirmar Contraseña" {...contrasenaConfField}/>
                  </div>
                </div>
                <div className="col">
                      <div className="mb-3 m-2">
                      <label htmlFor="exampleFormControlSelect1" className="form-label">Razon</label>
                      <select className="form-select fs-7 " id="exampleFormControlSelect1" onChange={(evt) => {setTipoColaborador(evt.target.value)}}>
                        {tiposColaborador.length?
                            tiposColaborador.map( (tipo, index) => {
                                return (
                                    <option key={tipo.id} selected={index == 0} value={tipo.clave}>{tipo.nombre}</option>
                                )
                            })
                            :
                            <option>No hay Razones</option>
                        }
                      </select>
                    </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta7" className="form-label" >Matricula</label>
                    <input type="text" className="form-control" id="matricula" placeholder="Matricula" {...matriculaField}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta7" className="form-label">Telefono</label>
                    <input type="text" className="form-control" id="telefono" placeholder="Telefono del colaborador" {...telefonoField} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="respuesta7" className="form-label">Correo Particular</label>
                    <input type="email" className="form-control" id="correo_personal" placeholder="Correo Particular del colaborador" {...correoPersonalField}/>
                  </div>
                  <div className="mb-3 m-2">
                      <label htmlFor="exampleFormControlSelect1" className="form-label">Licenciatura</label>
                      <select className="form-select fs-7 " id="licenciatura" onChange={(evt) => {setLicenciatura(evt.target.value)}}>
                        {
                            licenciaturas?
                            licenciaturas.map( (licenciatura, index) => {
                              // console.log(licenciaturas)
                                return (
                                    <option key={licenciatura.clave} selected={index == 0} value={licenciatura.clave}>{licenciatura.nombre}</option>
                                )
                            })
                            :
                            <option>No hay Licenciaturas</option>
                        }
                       </select>
                     
                    </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" id="cerrarBoton" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" id="guardarBoton"  className="btn btn-primary text-white" >Guardar Informacion</button>
            </div>
          </div>
        </div>
      </form>
    )
}

export default CreateUserForm