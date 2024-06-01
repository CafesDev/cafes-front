import '../../css/ui/Table.css'


export function Table({headers, data}){

    if (!headers || !data) return <></>
   
    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead className="">
                    <tr>
                    {headers.map((header) => {
                        return (
                            <th scope="col">{header.title}</th>
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={Math.floor(Math.random() * 500)}>
                                    {headers.map((header) => {
                                        return (
                                            <td key={header.accessKey}> {header.accessKey? item[header.accessKey] : header.accessFunction(item) } </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}