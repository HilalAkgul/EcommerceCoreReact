import { LineAxisOutlined } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import history from "history/browser";

const sleep=()=>new Promise(resolve=>setTimeout(resolve,1000));

axios.defaults.baseURL='http://localhost:5217/';


const responseBody=(response:AxiosResponse)=>response.data;

axios.interceptors.response.use(async response=>{
await sleep();
    return response
},(error:AxiosError)=>{
    
 const {data,status}=error.response!;
 switch (status) {
     case 400:
         if(data.errors){

            const modelStateErrors:string[]=[];
            for(const key in data.errors){
            if(data.errors[key]){
                modelStateErrors.push(data.errors[key]);
            }


            }
            throw modelStateErrors.flat();
         }
         toast.error(data.title);
         break;
         case 401:
            toast.error(data.title);
            
            break;
            case 500:
                history.push(
                   { pathname: '/server-error'},
                    {
                        some: data.error,
                      }
                );
                break;
 
     default:
         break;
 }
    return Promise.reject(error.response);
})


const requests={
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.get(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.get(url,body).then(responseBody),
    delete:(url:string)=>axios.get(url).then(responseBody)

}
//üstteki bu demekmişfunction responseBodyFn(response:AxiosResponse){
  //  return response.data
//

const Catalog={

list:()=>requests.get('api/products'),
details:(id:string|undefined)=>requests.get('api/products/'+id)

}


const TestErrors={

get400Error:()=>requests.get('buggy/bad-request'),
get401Error:()=>requests.get('buggy/unauthorized'),
get404Error:()=>requests.get('buggy/not-found'),
get500Error:()=>requests.get('buggy/server-error'),
getValidationError:()=>requests.get('buggy/validation-error'),


}

const agent={

    Catalog,
    TestErrors
}

export default agent;