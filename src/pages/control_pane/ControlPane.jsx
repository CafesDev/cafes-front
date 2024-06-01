import Collaborators from "../../Collaborators/pages/Collaborators.jsx";
import NavBar from "../../components/NavBar.jsx";
import Requests from "../../Requests/pages/Requests.jsx";
import Home from "../../components/Home.jsx";
import Projects from "../../Projects/pages/Projects.jsx";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LogoutModal from '../../components/LogoutModal.jsx';


function ControlPane(){
    const queryClient = new QueryClient()
    
    const [currentPage, setCurrentPage] = useState(0)
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const pageComponents = [Home, Collaborators, Requests, Projects]
    const changePage = (newPage) => {
        if (newPage === 4) { // Asume que 4 es el índice para Account/Logout
            setShowLogoutModal(true);
        } else {
            setCurrentPage(newPage);
        }
    };
    const PageComponent = pageComponents[currentPage]
  
    const handleToken = () => {
        const token = sessionStorage.getItem('token');
        console.log("Token:", token); // Verifica qué está obteniendo aquí
        if (!token) {
            console.log("Redireccionando porque no hay token");
            window.location.pathname = '/';
        }
    };
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log("No hay token, redireccionando...");
            window.location.pathname = '/';
        } else {
            console.log("Token encontrado: ", token);
        }
    }, []);

    const handleLogoutConfirm = () => {
        sessionStorage.removeItem('token'); // Limpia el token de sesión
        setShowLogoutModal(false); // Oculta el modal
        window.location.pathname = '/'
    };

    
    const handleCancel = () => {
        setShowLogoutModal(false); // Simplemente oculta el modal
    };

    // console.log('Control-pane')
    
    return (
        <QueryClientProvider client={queryClient}>
                    <NavBar onPageChange={changePage}/>
                        <main
                            className="main-component"
                        >
                            {currentPage < pageComponents.length && <PageComponent />}
                            {showLogoutModal && (
                                <LogoutModal
                                    show={showLogoutModal}
                                    onLogoutConfirm={handleLogoutConfirm}
                                    onCancel={handleCancel}
                                />
                            )}
                        </main>
        </QueryClientProvider>
    );
    
}

export default ControlPane