
import { useEffect, useState } from 'react';
import {Button } from "@mui/material";
import { Product } from "../../app/models/product"; 
import ProductList from "./ProductList";

import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';




export default function Cataloge(){
      const [products,setProduct]= useState<Product[]>([]);
const [loading,setLoading]=useState(true);
      useEffect(() => {
            agent.Catalog.list()
        .then(data=>setProduct(data))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
      }, [])


      
  
     
  
  
      
      if(loading) return <LoadingComponent message='...' />
return(
     
<>

<ProductList products={products}/>
      <Button variant='contained' >Add Product</Button>
</>


);


}