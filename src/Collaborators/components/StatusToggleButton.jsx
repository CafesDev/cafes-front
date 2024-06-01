import '../css/StatusToggleButton.css'
import { useState, useEffect } from 'react'

function StatusToggleButton({onStatusChange, options}){

    const [currentOption, setCurrentOption] = useState(0)       
    const handleStatusChange = (newStatus) => {
        if (onStatusChange){
            onStatusChange(newStatus)
        }
        setCurrentOption(newStatus)
    }

    return (
        <div className="table-filter btn-group col-3 rounded p-0" role="group" aria-label="Basic radio toggle button group">
            {...options.map((option, index) => {

                return (
                    <OptionForToggleButton 
                        key={index} 
                        optionId={option.optionId}
                        checked={currentOption == index}
                        handleChange={() => {handleStatusChange(index)
                        }}
                    >
                        {option.text}
                    </OptionForToggleButton>
                )
            })}
        </div>
    )
}

function OptionForToggleButton({children, optionId, checked, handleChange}){
    return (
       <>
        <input type="radio" className="btn-check" name="users-radiobtn" id={optionId} autocomplete="off" checked={checked} onChange={handleChange}/>
        <label className="btn" for={optionId}>{children}</label>
       </>
    )
}

export default StatusToggleButton