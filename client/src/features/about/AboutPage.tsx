import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage()
{
    const [validationErrors,setValidationErrors]=useState<string[]>([]);

function getValidationError(){
    agent.TestErrors.getValidationError()
    .then(()=>console.log("should not see this"))
    .catch(error=>setValidationErrors(error));
}


    return(

    <Container>
<Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>
    <ButtonGroup>
<Button variant='contained' onClick={()=>
    agent.TestErrors.get400Error().catch((error)=>console.log(error))}>
    400</Button>
<Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch((error)=>console.log(error))}>4001</Button>
<Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch((error)=>console.log(error))}>4002</Button>
<Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch((error)=>console.log(error))}>500</Button>
<Button variant='contained' onClick={()=>getValidationError()}>valid</Button>




    </ButtonGroup>
    {validationErrors.length>0 &&
    <Alert severity='error'>
        <AlertTitle>Valiadtion Errors</AlertTitle>
        <List>
            {validationErrors.map(x=>(

<ListItem key={x}>
    <ListItemText>{x}</ListItemText>
</ListItem>


    ))}
        </List>
        </Alert>}
    </Container>

);



}