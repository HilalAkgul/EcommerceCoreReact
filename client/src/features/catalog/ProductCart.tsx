import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

import { Product } from "../../app/models/product";
import { Avatar, CardHeader} from '@mui/material';

interface ProductItem{
product:Product;
key:number;


}

export default function ProductCart({product}:ProductItem){

    return(
    <>
      <Card>
          <CardHeader avatar={
<Avatar sx={{bgcolor:'secondary.main'}}>
{product.name.charAt(0).toUpperCase()}
    
</Avatar>

          }
          
          title={product.name}/>
              
       
      <CardMedia
        sx={{height:140,backgroundSize:'contain',bgcolor:'primary.main'}}
        image={product.pictureUrl}
        title={product.name}
  


      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add Cart</Button>
        <Button component={Link} to={`/cataloge/${product.id}`}  size="small">View</Button>
      </CardActions>
    </Card>
   
    
    </>
    );

        }