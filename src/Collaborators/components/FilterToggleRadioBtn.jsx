

function FilterToggleRadioBtn(){

    return (
        <div className="table-filter btn-group col-3 rounded p-0" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="users-radiobtn" id="active-users" autocomplete="off"/>
        <label className="btn"  for="active-users">Activos</label>

        <input type="radio" className="btn-check" name="users-radiobtn" id="inactive-users" autocomplete="off" />
        <label className="btn"  for="inactive-users">Inactivos</label>

        <input type="radio" className="btn-check" name="users-radiobtn" id="all-users" autocomplete="off" />
        <label className="btn" for="all-users">Todos</label>
      </div>
    )
}

export default FilterToggleRadioBtn