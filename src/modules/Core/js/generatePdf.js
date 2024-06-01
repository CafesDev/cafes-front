import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePdf = (data) => {
  const documentDefinition = {
    content: [
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['Matrícula', 'Nombre Completo', 'Razón', 'Correo Institucional'],
            ...data.map(collaborator => [collaborator.matricula, `${collaborator.nombres} ${collaborator.apellido_paterno} ${collaborator.apellido_materno}`, collaborator.tipo, `a${collaborator.matricula}@unison.mx`])
          ]
        }
      }
    ]
  };

  pdfMake.createPdf(documentDefinition).download("colaboradores.pdf");
};

export default generatePdf;
