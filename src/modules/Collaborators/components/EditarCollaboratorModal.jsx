import React, { useState, useEffect } from 'react';
import { Modal, ModalField } from '../../Core/components/ui/Modal';
import { getTiposColaborador } from "../services/tiposColaborador";
import { getLicenciaturas } from "../services/licenciaturas";

const EditarCollaboratorModal = ({ open, collaborator, onSave, onCancel }) => {
    const [editData, setEditData] = useState(collaborator || {});
    const [licenciaturas, setLicenciaturas] = useState([]);
    const [tiposColaborador, setTiposColaborador] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        console.log("Received collaborator:", collaborator);
        if (collaborator) {
            setEditData(collaborator);
        }
    }, [collaborator]);

    useEffect(() => {
        getTiposColaborador()
            .then(setTiposColaborador)
            .catch(error => console.error("Error cargando los tipos de colaborador", error));

        getLicenciaturas()
            .then(setLicenciaturas)
            .catch(error => console.error("Error cargando las licenciaturas", error));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden.');
            return;
        }
        setPasswordError(''); 

        const updatedData = {
            ...editData,
            ...(password && { contrasena: password }) 
        };
    
        onSave(updatedData);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    return (
        <Modal
            open={open}
            title="Editar Colaborador"
            onSubmit={handleSubmit}
            onCancel={onCancel}
        >
            <form onSubmit={handleSubmit}>
                <ModalField labelName="Nombre" inputElement={
                    <input
                        type="text"
                        name="nombres"
                        value={editData.nombres || ''}
                        onChange={handleChange}
                    />
                } />
                 <ModalField labelName="Nueva Contraseña" inputElement={
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                } />
                <ModalField labelName="Confirmar Nueva Contraseña" inputElement={
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                } />
                 {passwordError && <div style={{ color: 'red', marginTop: '10px' }}>{passwordError}</div>}

                <ModalField labelName="Apellido Paterno" inputElement={
                    <input
                        type="text"
                        name="apellido_paterno"
                        value={editData.apellido_paterno || ''}
                        onChange={handleChange}
                    />
                } />
                <ModalField labelName="Apellido Materno" inputElement={
                    <input
                        type="text"
                        name="apellido_materno"
                        value={editData.apellido_materno || ''}
                        onChange={handleChange}
                    />
                } />
                <ModalField labelName="Correo Particular" inputElement={
                    <input
                        type="email"
                        name="correo_personal"
                        value={editData.correo_personal || ''}
                        onChange={handleChange}
                    />
                } />
                <ModalField labelName="Teléfono" inputElement={
                    <input
                        type="text"
                        name="telefono"
                        value={editData.telefono || ''}
                        onChange={handleChange}
                    />
                } />
                <ModalField labelName="Razón" inputElement={
                    <select
                        name="tipo"
                        value={editData.tipo || ''}
                        onChange={handleChange}
                    >
                        {tiposColaborador.map((tipo, index) => (
                            <option key={`${tipo.id}-${index}`} value={tipo.clave}>{tipo.nombre}</option>
                        ))}
                    </select>
                } />
                <ModalField labelName="Licenciatura" inputElement={
                    <select
                        name="clave_licenciatura"
                        value={editData.clave_licenciatura || ''}
                        onChange={handleChange}
                    >
                        {licenciaturas.map((licenciatura, index) => (
    <option key={`${licenciatura.clave}-${index}`} value={licenciatura.clave}>{licenciatura.nombre}</option>
))}
                    </select>
                } />
            </form>
        </Modal>
    );
};

export default EditarCollaboratorModal;
