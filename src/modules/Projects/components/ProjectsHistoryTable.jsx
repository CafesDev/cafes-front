import '../css/ProjectsHistoryTable.css'
import { Table } from "../../../modules/Core/components/ui/Table"
import { useProjects } from '../hooks/useProjects'
import { useCollaborators } from '../../Collaborators/hooks/useCollaborators'
import { useSolicitudes } from '../../Requests/hooks/useSolicitudes'
import downloadPdf from '../../../assets/icons/pdfdescargar.svg'
import { useRef } from 'react'
import { worker } from '../../../modules/Core/services/pdfCreation'
import { useOrganizations } from '../../Requests/hooks/useOrganizations'

export default function ProjectHistoryTable() {

    const { projects } = useProjects()
    const { getCollaboratorById } = useCollaborators()
    const { getRequestById, getTipoServicioById } = useSolicitudes()
    const { getOrganizationById } = useOrganizations()
    const tableRef = useRef(null)

    const  handlePdfDownload = () => {
        let element = tableRef.current
        let opt = {
          margin: 1,
          filename: 'Proyectos.pdf',
          jsPDF: {
            orientation: 'l'
          }
        }
        let pdf = worker.from(element).set(opt).save()
    }


    const headers = [
        {
            title: "Nombre",
            accessKey: "nombre"
        },
        {
            title: "Responsable",
            accessFunction: (project) => {
                const collaborator = getCollaboratorById(project.id_responsable)
                if(collaborator)
                    return `${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`
                else
                    return ''
            }
        },
        {
            title: "Organizacion",
            accessFunction: (project) => {
                const request = getRequestById(project.id_solicitud)
                if(request){
                    const organizacion = getOrganizationById(request.id_organizacion)
                    if (!organizacion) return 'No se encontró la organizacion'
                    return organizacion.nombre_organizacion
                }
                else
                    return ''
            }
        },
        {
            title: "Estado",
            accessKey: "estado"
        },
        {
            title: "Fecha Límite",
            accessFunction: (project) => {
                const date = new Date(project.fecha_limite)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        },
        {
            title: "Tipo de servicio",
            accessFunction: (project) => {
                const request = getRequestById(project.id_solicitud)
                if (!request) return ''
                const serviceType = getTipoServicioById(request.tipo_servicio)
                if (!serviceType) return 'No se encontró el tipo de servicio'   
                return serviceType.nombre
            }
        }
    ]
    
    return (
        <main className="table-content" ref={tableRef}>
            <Table headers={headers} data={projects}/>
            <button
                id="boton-pdf"
                className="border border-0 ps-2 py-2 rounded-3 text-white mb-3"
                onClick={handlePdfDownload}
          >
            <img className="addMoreIcon pe-2 text-white" src={downloadPdf} alt="Download PDF" />
          </button>
        </main>
    )
}