// Collaborators.js
import { SquarePen } from 'lucide-react';
import { useRef } from "react";
import StatusToggleButton from "../components/StatusToggleButton";
import clipboardImage from "../../assets/img/logo.png";
import '../../css/App.css';
import plusIcon from '../../assets/icons/addicon.svg';
import downloadPdf from '../../assets/icons/pdfdescargar.svg';
import useCollaborators from "../hooks/useCollaborators";
import { useState } from "react";
import '../css/Collaborators.css'
import 'bootstrap';
import CreateUserForm from "../components/CreateUserForm";
import EditarCollaboratorModal from "../components/EditarCollaboratorModal";
import { putColaborador } from '../../Collaborators/services/colaboradores';
import { worker } from '../../services/pdfCreation';


const Collaborators = () => {
  const optionsForStatus = [
    { optionId: "active-users", text: "Activos" },
    { optionId: "inactive-users", text: "Inactivos" },
    { optionId: "all-users", text: "Todos" },
  ];

  const { collaborators, createCollaborator, refreshCollaborators, activeCollaborators } = useCollaborators();
  console.log(activeCollaborators)
  const [currentStatus, setCurrentStatus] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const tableRef = useRef(null)

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState(null);

  const handleEdit = (collaborator) => {
    setCollaboratorToEdit(collaborator);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };


  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  const handlePdfDownload = () => {
    let element = tableRef.current
    let opt = {
      margin: 1,
      filename: 'Colaboradores.pdf'
    }
    let pdf = worker.from(element).set(opt).save()
  };

  const handleSubmit = (data) => {
    console.log('Data: ', data)
    createCollaborator(data)
  }

  return (
    <section className="" style={{width: '70vw'}}>
      {editModalOpen && (
        <EditarCollaboratorModal
          open={editModalOpen}
          collaborator={collaboratorToEdit}
          onCancel={closeEditModal}
          onSave={(updatedData) => {
            // Call your API to update the collaborator data here
            putColaborador(updatedData).then(() => {
              // After successful update, refresh the collaborators
              refreshCollaborators();
              closeEditModal();
            });
          }}
        />
      )}
      <div className="colorfix row align-items-center mb-5">
        <img className="col col-1" src={clipboardImage} alt="Clipboard" />
        <h1 className="col col-11 fs-2 fw-bold text-start">
          CAFES/Colaboradores
        </h1>
      </div>
      <div className="colorfix row justify-content-between">
        <StatusToggleButton
          onStatusChange={handleStatusChange}
          options={optionsForStatus}
        />
        <div className="col-3">
          <button
            id="boton-colab" className="border border-0 px-3 py-2 rounded-pill text-white" data-bs-toggle="modal" data-bs-target="#colaboradorModal">
            <img className="addMoreIcon pe-2 text-white" src={plusIcon} alt="Add" />
            Registrar Colaborador
          </button>
        </div>
      </div>
      <div id="tabla-colab" className="row" ref={tableRef}>
        <table className="usersTable table table-hover mt-5 border-top lh-lg ">
          <thead className=" border-bottom border-dark-subtle ">
            <tr>
              <th scope="col">Matrícula</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Razón</th>
              <th scope="col">Correo Institucional</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {
            collaborators &&
            collaborators
              .filter((item) => {
                if (currentStatus === 0) {
                  return item.estado === "Activo";
                } else if (currentStatus === 1) {
                  return item.estado === "Inactivo";
                } else {
                  return true;
                }
              })
              .map((collaborator) => (
                <tr
                  className="border-bottom border-dark-subtle"
                  key={collaborator.matricula}
                >
                  <td scope="row" className="">
                    {collaborator.matricula}
                  </td>
                  <td>{`${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`}</td>
                  <td>{collaborator.tipo}</td>
                  <td>{`a${collaborator.matricula}@unison.mx`}</td>
                  <button className="btn btn-outline-secondary" onClick={() => handleEdit(collaborator)}>
                    <SquarePen />

                  </button>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end ">
          <button
            id="boton-pdf"
            className="border border-0 ps-2 py-2 rounded-3 text-white mb-3"
            onClick={handlePdfDownload}
          >
            <img className="addMoreIcon pe-2 text-white" src={downloadPdf} alt="Download PDF" />
          </button>
        </div>
      </div>
      <div className="position-absolute">
        <CreateUserForm onSubmit={handleSubmit}></CreateUserForm>
      </div>
    </section>
  );
};

export default Collaborators;
