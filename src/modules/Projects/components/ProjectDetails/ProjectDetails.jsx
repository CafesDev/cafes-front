import React from 'react';
import { X } from "lucide-react";
import '../../css/projectDetails/ProjectDetails.css';
import UrgentTasks from './UrgentTasks';
import ProjectDirectory from './ProjectDirectory';
import SupportMaterials from './SupportMaterials';
import ProjectCalendar from './ProjectCalendar';
import Contributors from './Contributors';
import ProgressBar from './ProgressBar';
import ProjectView from './ProjectView';

export function ProjectDetails({ project, onClose }) {
  if (!project) return <></>;

  const handleCloseProject = () => {
    if (onClose) onClose();
  }

  return (
    <div className="project-details-container">
      <div className="exit" onClick={handleCloseProject}>
        <X />
      </div>
      <div className="project-details-content" style={{height: '100%'}}>
        <div className='project-details-item'><ProjectView project={project} /></div>
        <div className='project-details-item'><UrgentTasks project={project} /></div>
        <div className='project-details-item'><SupportMaterials project={project} /></div>
        <div className='project-details-item'><ProjectCalendar project={project} /></div>
        <div className='project-details-item five'><ProjectDirectory project={project} /></div>
        <div className='project-details-item six'><Contributors project={project} /></div>
        <div className='project-details-item'><ProgressBar project={project} /></div>
      </div>
    </div>
  );
}
