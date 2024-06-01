import '../css/NavBar.css'
import { HomeIcon, AccountIcon, CollaboratorsIcon, SolicitudeIcon, ProjectIcon } from './ui/Icons'
import { useState } from 'react'

function NavBar({onPageChange, changePage}){
    const pages = [
        {name: "Home", icon: HomeIcon},
        {name: "Collaborators", icon: CollaboratorsIcon},
        {name: "Solicitude", icon: SolicitudeIcon},
        {name: "Projects", icon: ProjectIcon},
        {name: "Account", icon: AccountIcon},
    ]
    const [currentPage, setCurrentPage] = useState(0)

    
    
    const handleChangePage = (newPage) => {
        if (onPageChange) onPageChange(newPage)
        setCurrentPage(newPage)
    }

    return (
        <nav>
            <ul>
                {pages.map((page, index) => {
                    return (
                    <NavBarOption 
                        Icon={page.icon}
                        key={index} 
                        active={index == currentPage}
                        setPage={() => handleChangePage(index)}
                    />
                    )
                })}
            </ul>
        </nav>
    )
}

function NavBarOption({Icon, active, setPage}){
    return (
        <li className={active?"active":""} onClick={setPage}>
            <Icon height={40} width={40}/>
        </li>
    )
}



export default NavBar