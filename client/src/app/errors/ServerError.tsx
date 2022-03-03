import { Button, Divider,Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate} from "react-router-dom";

export default function ServerError(){
const navigate=useNavigate();
const state=useLocation();

    return(
        <Container component={Paper}>
        {
            state?.pathname?(
<>
                <Typography variant='h5' color='error' gutterBottom>{state.pathname}</Typography>
        <Divider/>
                <Typography>{state.hash||'Internal server error'}</Typography>
            </>
            ):(
                <Typography variant='h5'>
        
                </Typography>
            )}
       <Button onClick={()=>navigate('/cataloge')}>go abckto server</Button>
        </Container>
    )
}
