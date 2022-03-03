import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


interface Props{
darkMode:boolean;
handleChange:()=>void;



}
const navStyles={
    textDecoration:'none',
    color:'inherit',typography:'h6',
    "&:hover":{
        color:'grey.500'
    },
    "&.active":{
        color:'text.secondary'
    },
}

export default function Header({darkMode,handleChange}:Props){
   const leftMenu=[{name:"About",href:"/about"},{name:"Contact",href:"/contact"},{name:"Home",href:"/"}]
   const rightMenu=[
   {name:"Products",href:"/cataloge"},{name:"Login",href:"/login"},{name:"Register",href:"/register"}]
return(

<AppBar position="static" sx={{mb:4}}>
<Toolbar sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    
<Box display="flex" alignItems="center"><Typography   component={NavLink} to="/" sx={navStyles}>Store</Typography>

<Switch
checked={darkMode}
onChange={handleChange}
inputProps={{ 'aria-label': 'controlled' }}
/></Box>
<List sx={{display:'flex'}}>
  {leftMenu.map((item,index) => (
    <ListItem
      key={index}
      component={NavLink}
      to={item.href}
      sx={navStyles}
     
    >
      {item.name}
    </ListItem>
  ))}
<IconButton sx={{color:'inherit'}}>

    <Badge badgeContent={4} color='secondary'>

        <ShoppingCart/>
    </Badge>
</IconButton>
<Box display="flex" alignItems="center">
{rightMenu.map((item,index) => (
    <ListItem
      key={index}
      component={NavLink}
      to={item.href}
      sx={navStyles}
     
    >
      {item.name}
    </ListItem>
  ))}
  </Box>
</List>


</Toolbar>


</AppBar>


);


}