import '../../css/ui/Modal.css'

export function Modal({
    open, title, children, onSubmit, onCancel, cancelButton=true, saveButton=true,
    disableSubmitButton
}){

    const handleSubmit = () => {
        if(onSubmit){
            onSubmit()
        }
    }
    const handleCancel = () => {
        if(onCancel){
            onCancel()
            
        }
    }
    
    return (
        <div className= "modal-wrapper" hidden={!open}>
        <div className="modal-background" onClick={handleCancel}>
        </div>
            <dialog 
                    open={open}
                    aria-modal="true"
                    className="dialog-modal"
                >
                    <header>
                        <h3>{title && title}</h3>
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        {cancelButton && <button className="cancel" onClick={handleCancel}>{typeof cancelButton == 'string'? cancelButton : 'Cancelar'}</button>}
                        {saveButton && <button className="save" disabled={disableSubmitButton} onClick={handleSubmit}>{typeof saveButton == 'string'? saveButton : 'Guardar'}</button>}
                    </footer>
                </dialog>
        </div>
    )
}

export function ModalField({labelName, inputElement}){
    if (!inputElement) return <></>
    
    return (
        <label className="modal-field">
            <span className="label-text">{labelName && labelName}</span>
            <div className="input-container">
                {inputElement}
            </div>
        </label>
    )
}