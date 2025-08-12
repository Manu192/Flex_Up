import { commonAPI } from "./commonapi"
import {serverURL}  from  "./serverURL"



// These API calls are for the profile
export const addprofileAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverURL}/profile`,reqbody)
}

export const getprofileAPI = async ()=>{
    return await commonAPI("GET", `${serverURL}/profile`,'')
}

export const updateProfileAPI = async (id, updatedData) => {
  return await commonAPI("PUT", `${serverURL}/profile/${id}`, updatedData);
};


export const deleteprofileAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/profile/${id}`, '');
};

//Now we write the API calls for the workouts

export const addworkoutAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverURL}/workouts`,reqbody)
}

export const getallworkoutAPI = async ()=>{
    return await commonAPI("GET", `${serverURL}/workouts`,'')
}

export const getaworkoutAPI = async (id)=>{
    return await commonAPI("GET", `${serverURL}/workouts/${id}`,'')
}


export const updateworkoutAPI = async (id, updatedData) => {
  return await commonAPI("PUT", `${serverURL}/workouts/${id}`, updatedData);
};


export const deleteworkoutAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/workouts/${id}`, '');
};
