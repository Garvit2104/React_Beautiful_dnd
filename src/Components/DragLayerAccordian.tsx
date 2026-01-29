import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { LayerCategory } from '../Types/LayerTypes';

interface Props {
    layers: LayerCategory[];
  }

const AccordionUsage : React.FC<Props> =({layers}) => {
  return (
        <Droppable droppableId="column_1">
            {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="drag-list"
            >
            {layers.map((layer, index) => (
            <Draggable
              draggableId={`left-${layer.CategoryOrder}`}  
              index={index}
              key={layer.CategoryOrder}
            >
            return(
                <Accordion className='layer-accordinan'
                    key={item.CategoryName}
                    >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    className='layer-head'
                    >
                        {layer.CategoryName}
                </AccordionSummary>
                <AccordionDetails>
                {layers.Layers.map((item, index) => (
                <Draggable
                    draggableId={`left-${layer.CategoryOrder}`} 
                    key={item.LayerId}
                >
                    {layer.LayerName}
                </Draggable>
            
            </AccordionDetails>

)
))}

    
  

      </Accordion>
      
        
  );
}
