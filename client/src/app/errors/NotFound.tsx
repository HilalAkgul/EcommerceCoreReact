import {Paper,Link, Button, Container, Divider, Typography } from "@mui/material";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height:4000}}>
<Typography gutterBottom variant='h3'>oops-we could find what you are looking for?</Typography>
<Divider/>
<Button href="/cataloge">Go back to shop</Button>
        </Container>
    )
}