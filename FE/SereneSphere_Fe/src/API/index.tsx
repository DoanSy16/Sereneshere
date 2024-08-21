import axios from 'axios';
const URL ='http://192.168.102.199:8080';
// const URL ='http://localhost:8080';
const API = axios.create({baseURL:URL});
// const API = axios.create({baseURL:'http://localhost:8080'})
const JonParse =(data:any)=> {
return JSON.parse(JsonStringify(data));
}
const JsonStringify =(data:any)=>{
return JSON.stringify(data);
}
export {API,JonParse,JsonStringify,URL}