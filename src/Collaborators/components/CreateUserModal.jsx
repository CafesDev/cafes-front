import { useRef } from 'react'
import '../css/CreateUserModal.css'

function CreateUserModal({open, onSave, onCancel}){

    let nombresInput = useRef()
    let apellido_paternoInput = useRef()
    let apellido_maternoInput = useRef()
    let tipoInput = useRef()
    let matriculaInput = useRef()
    let telefonoInput = useRef()
    let correo_particularInput = useRef()
    let correo_institucionalInput = useRef()
    let carreraInput = useRef()
    let contrasenaInput = useRef()
    let conf_contrasenaInput = useRef()

    const licenciaturas = [
        {
            clave: 'FIN',
            nombre: 'Licenciatura en finanzas'
        },
        {
            clave: 'ISI',
            nombre: 'Ingenieria en sistemas de la informacion'
        },
        {
            clave: 'MER',
            nombre: 'Licenciatura en mercadotecnia'
        },
        {
            clave: 'NI',
            nombre: 'Licenciatura en negocios internacionales'
        }
    ]

    const tipos = [
        {
            clave: 'COR',
            nombre: 'Coordinador'
        },
        {
            clave: 'PP',
            nombre: 'Practicante'
        },
        {
            clave: 'PSS',
            nombre: 'Prestador de servicio social'
        },
        {
            clave: 'VOL',
            nombre: 'Voluntario'
        },

    ]
    
    if (!onSave) onSave = (data) => {console.log(data)}
    if (!onCancel) onCancel = (data) => {console.log(data)}

    return (
        <dialog className="create-user" open={open}>
                <header>
                    <h2>Crear colaborador</h2>
                </header>
            <main>
                <div className="renglon6-3">
                    <div className="input-control">
                        <label htmlFor="nombres">Nombre</label>
                        <input id="nombres" name="nombres" type="text" placeholder="Introduce los nombres del colaborador" ref={nombresInput}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="tipo">Razón</label>
                        <select id="tipo" name="tipo" ref={tipoInput}>
                            {tipos.map((tipo) => (
                                <option value={tipo.clave} key={tipo.clave}>{tipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="renglon6-3">
                    <div className="input-control">
                        <label htmlFor="apellido_paterno">Apellido paterno</label>
                        <input id="apellido_paterno" name="apellido_paterno" type="text" placeholder="Introduce el apellido paterno del colaborador" ref={apellido_paternoInput}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="matricula">Matrícula</label>
                        <input id="matricula" name="matricula" type="number" placeholder="Ingresa la matrícula" ref={matriculaInput}/>
                    </div>
                </div>
                <div className="renglon6-3">
                    <div className="input-control">
                        <label htmlFor="apellido_materno">Apellido materno</label>
                        <input id="apellido_materno" name="apellido_materno" type="text" placeholder="Introduce el apellido materno del colaborador" ref={apellido_maternoInput}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono" name="telefono" type="number" placeholder="Ingresa el teléfono" ref={telefonoInput}/>
                    </div>
                </div>
                <div className="renglon5-5">
                    <div className="input-control">
                        <label htmlFor="correo_institucional">Correo institucional</label>
                        <input id="correo_institucional" name="correo_institucional" type="email" placeholder="Ingresa el correo institucional" ref={correo_institucionalInput}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="correo_particular">Correo particular</label>
                        <input id="correo_particular" name="correo_particular" type="email" placeholder="Ingresa el correo particular" ref={correo_particularInput}/>
                    </div>
                </div>
                <div className="renglon5-5">
                    <div className="input-control">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input id="contrasena" name="contrasena" type="password" placeholder="Ingresa la contraseña" ref={contrasenaInput}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="carrera">Carrera o licenciatura</label>
                        <select id="carrera" name="carrera" ref={carreraInput}>
                            {licenciaturas.map((licenciatura) => (
                                <option value={licenciatura.clave} key={licenciatura.clave}>{licenciatura.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="renglon5-5">
                    <div className="input-control">
                        <label htmlFor="conf-contrasena">Confirmación de contraseña</label>
                        <input id="conf-contrasena" name="conf-contrasena" type="password" placeholder="Ingresa la confirmación de la contraseña" ref={conf_contrasenaInput}/>
                    </div>
                </div>

                <div className="buttons">
                    <button className="cancel" onClick={() => {
                        const collaborator = {
                            matricula: matriculaInput.current.value,
                            nombres: nombresInput.current.value,
                            apellido_materno: apellido_maternoInput.current.value,
                            apellido_paterno: apellido_paternoInput.current.value,
                            telefono: telefonoInput.current.value,
                            correo_institucional: correo_institucionalInput.current.value,
                            correo_personal: correo_particularInput.current.value,
                            contrasena: contrasenaInput.current.value,
                            tipo: tipoInput.current.value,
                            clave_licenciatura: carreraInput.current.value
                        }

                        onCancel(collaborator)
                    }}>Cancelar</button>

                    <button className="save" onClick={() => {
                        const collaborator = {
                            matricula: matriculaInput.current.value,
                            nombres: nombresInput.current.value,
                            apellido_materno: apellido_maternoInput.current.value,
                            apellido_paterno: apellido_paternoInput.current.value,
                            telefono: telefonoInput.current.value,
                            correo_institucional: correo_institucionalInput.current.value,
                            correo_personal: correo_particularInput.current.value,
                            contrasena: contrasenaInput.current.value,
                            tipo: tipoInput.current.value,
                            clave_licenciatura: carreraInput.current.value
                        }


                        console.log(collaborator, JSON.stringify(collaborator))
                        onSave(collaborator)
                    }}>Guardar</button>
                </div>
            </main>
        </dialog>
    )
}

export default CreateUserModal