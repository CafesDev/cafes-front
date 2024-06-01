import ControlPane from "../pages/control_pane/ControlPane"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export default function ControlPaneProviders(){

    const queryClient = new QueryClient()

    return (
        <>

        <QueryClientProvider client={queryClient}>
            <ControlPane/>
        </QueryClientProvider>
        
        </>
    )
} 