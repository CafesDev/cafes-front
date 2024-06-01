export function HomeIcon({height, width}){
    if (!width) width = 35
    if (!height) height = 35
    
    return (
    <svg width={width} height={height} viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0L0 15H5V35H15V25H25V35H35V14.85L40 15L20 0Z" fill="#F0EFE6"/>
    </svg>

    )
}

export function SolicitudeIcon({height, width}){
    if (!width) width = 35
    if (!height) height = 35
    
    return (
        <svg width={width} height={height} viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V45.7143H40V22.8571H17.1429V0H0ZM22.8571 0V17.1429H40L22.8571 0ZM5.71429 11.4286H11.4286V17.1429H5.71429V11.4286ZM5.71429 22.8571H11.4286V28.5714H5.71429V22.8571ZM5.71429 34.2857H28.5714V40H5.71429V34.2857Z" fill="#F0EFE6"/>
        </svg>
    )
}

export function CollaboratorsIcon({height, width}){
    if (!width) width = 35
    if (!height) height = 35
    
    return (
        <svg width={width} height={height} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.5 0C24.95 0 22.75 1.75 21.4 4.4C23.65 7.1 25 10.8 25 15.05C25 16.5 24.85 17.8 24.55 19.1C25.5 19.65 26.45 20.05 27.5 20.05C31.65 20.05 35 15.55 35 10.05C35 4.55 31.65 0.05 27.5 0.05V0ZM12.5 5C8.35 5 5 9.5 5 15C5 20.5 8.35 25 12.5 25C16.65 25 20 20.5 20 15C20 9.5 16.65 5 12.5 5ZM36.25 20.8C34.1 23.35 31.15 24.9 27.8 25C29.15 26.9 30 29.2 30 31.7V35H40V26.7C40 24.1 38.45 21.85 36.25 20.75V20.8ZM3.75 25.8C1.55 26.9 0 29.15 0 31.75V40.05H25V31.75C25 29.15 23.45 26.9 21.25 25.8C19 28.45 15.95 30 12.5 30C9.05 30 6 28.4 3.75 25.8Z" fill="#F0EFE6"/>
        </svg>
    )
}

export function AccountIcon({height, width}){
    if (!width) width = 35
    if (!height) height = 35
    
    return (
        <svg width={width} height={height} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C14.5 0 10 6.06841 10 13.5456C10 21.0227 14.5 27.0911 20 27.0911C25.5 27.0911 30 21.0227 30 13.5456C30 6.06841 25.5 0 20 0ZM9.55 27.0911C4.25 27.362 0 32.0759 0 37.9275V43.3458H40V37.9275C40 32.0759 35.8 27.362 30.45 27.0911C27.75 30.3962 24.05 32.5093 20 32.5093C15.95 32.5093 12.25 30.3962 9.55 27.0911Z" fill="#F0EFE6"/>
        </svg>
    )
}

export function CheckIcon({width, height, className}){
    if (!width) width = 35
    if (!height) height = 35
    if (!className) className = ''

    return (
        <svg className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>
    )
}

export function ProjectIcon({width, height, className}){
    if (!width) width = 35
    if (!height) height = 35
    if (!className) className = ''

    return (
        <svg className={className} width={width} height={height} viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33333 35H25.6667V40H9.33333V35ZM9.33333 25H32.6667V30H9.33333V25ZM9.33333 15H32.6667V20H9.33333V15ZM37.3333 5H27.58C26.6 2.1 24.0333 0 21 0C17.9667 0 15.4 2.1 14.42 5H4.66667C4.34 5 4.03667 5.025 3.73333 5.1C2.82333 5.3 2.00667 5.8 1.37667 6.475C0.956666 6.925 0.606667 7.475 0.373334 8.075C0.14 8.65 0 9.3 0 10V45C0 45.675 0.14 46.35 0.373334 46.95C0.606667 47.55 0.956666 48.075 1.37667 48.55C2.00667 49.225 2.82333 49.725 3.73333 49.925C4.03667 49.975 4.34 50 4.66667 50H37.3333C39.9 50 42 47.75 42 45V10C42 7.25 39.9 5 37.3333 5ZM21 4.375C21.9567 4.375 22.75 5.225 22.75 6.25C22.75 7.275 21.9567 8.125 21 8.125C20.0433 8.125 19.25 7.275 19.25 6.25C19.25 5.225 20.0433 4.375 21 4.375ZM37.3333 45H4.66667V10H37.3333V45Z" fill="#824389"/>
        </svg>
    )
}

export function CloseIcon({width, height, className}){
    if (!width) width = 35
    if (!height) height = 35
    if (!className) className = ''

    
    return (
        <svg className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
    )
}