import React from "react";
import { SelectedLayer } from "../Types/LayerTypes";
import "./table.css";
interface Props {
    layers: SelectedLayer[];
}
const DroppedLayerTable: React.FC<Props> = ({layers}) =>{
    if(layers.length === 0){
        return <div>No layers selected yet.</div>;
    }
    return (
        <table className="layer-table">
            <thead>
                <tr>
                    <th> # </th>
                    <th>Layer Id</th>
                    <th>Layer Name</th>
                </tr>
            </thead>
            <tbody>
                {layers.map((item, index) =>(
                    <tr key={item.LayerId}>
                        <td>{index + 1}</td>
                        <td>{item.LayerId}</td>
                        <td>{item.LayerName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default DroppedLayerTable;