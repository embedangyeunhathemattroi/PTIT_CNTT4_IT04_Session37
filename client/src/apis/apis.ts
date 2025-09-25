import axios from "axios"
import type { Student } from "../utils/types";
export const API_GetALL_Students="http://localhost:8080/students"
export const Api_addStudent= async(newStudent:Student)=>{
    const res = await axios.post("http://localhost:8080/students", newStudent);
    return res.data
}
