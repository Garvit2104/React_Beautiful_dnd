import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { LayerCategory } from '../Types/LayerTypes';
import "./DragDrop.css";
import { Category } from '@mui/icons-material';

interface Props {
    layers: LayerCategory[];
  }

const AccordionUsage : React.FC<Props> =({layers}) => {
  return (
        <div>
            {layers.map((category)=>(
                <Accordion key={category.CategoryOrder} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}   aria-controls="panel1a-content" id="panel1a-header"
                    >
                        <Typography>{category.CategoryName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Droppable droppableId = {`category-${category.CategoryOrder}`}>
                            {(provided) =>(
                                <div 
                                    ref ={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="drag-list"
                                >
                                {category.Layers.map((layer, index) =>(
                                    <Draggable
                                        key = {layer.LayerId}
                                        draggableId = {`layer-${layer.LayerId}`} 
                                        index = {index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="layer-item"
                                                    style={{
                                                    ...provided.draggableProps.style,
                                        }}
                                            >
                                                {layer.LayerName}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </AccordionDetails>
                </Accordion>
            ))}


        </div>
      
        
  )
}
export default AccordionUsage;