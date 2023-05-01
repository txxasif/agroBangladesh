import axios from "axios";
export  async function uploadPhoto(formData){
    return await axios.post('https://api.cloudinary.com/v1_1/dupffxzyk/image/upload',formData);
}
export async function createUserHelper(form){
    return await axios.post('/api/registration',form);
}
export async function loginUserHelper(data){
    return await axios.post('/api/login',data);
}