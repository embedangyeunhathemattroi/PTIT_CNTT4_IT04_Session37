import {createAsyncThunk, createSlice} from "@reduxjs/toolkit" 
import  axios  from "axios";
import {  API_GetALL_Students } from "../../apis/apis";
import type { Student } from "../../utils/types";
export const getStudents = createAsyncThunk("getStudents",async ()=>{
    try {
        const res = await axios.get(API_GetALL_Students)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const addStudent = createAsyncThunk("addStudent",async (newStudent:Student)=>{
    try {
        const res = await axios.post('http://localhost:8080/students',newStudent)
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const deleteStudent = createAsyncThunk("deleteStudent",async (id:string)=>{
    try {
        await axios.delete(`http://localhost:8080/students/${id}`,)
        return id
    } catch (error) {
        console.log(error)
    }
})
export const editStudent = createAsyncThunk("editStudent",async (data:Student)=>{
    try {
        const res = await axios.put(`http://localhost:8080/students/${data.id}`,data)
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const studentSlice = createSlice({
    name:"student",
    initialState:{
        students:[],
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getStudents.pending,()=>{
            console.log("Đang tải dữ liệu");
            
        })
        .addCase(getStudents.fulfilled,(state, action)=>{
            state.loading =true,
            state.students = action.payload
        })
        .addCase(getStudents.rejected,()=>{
            console.log("Lỗi lấy dữ liệu");
            
        })
        .addCase(addStudent.pending,()=>{
            console.log("Đang tải dữ liệu");
            
        })
        .addCase(addStudent.fulfilled,(state, action)=>{
            state.students.push(action.payload)
            console.log(state.students);
        })
        .addCase(addStudent.rejected,()=>{
            console.log("Lỗi lấy dữ liệu");
            
        })
        .addCase(deleteStudent.pending,()=>{
            console.log("Đang tải dữ liệu");
            
        })
        .addCase(deleteStudent.fulfilled,(state, action:any)=>{
            const idx = state.students.findIndex((i:Student)=>i.id === action.payload.id)
            console.log("idx",idx);
            state.students.splice(idx,1)
            console.log(state.students);
            
        })
        .addCase(deleteStudent.rejected,()=>{
            console.log("Lỗi lấy dữ liệu");
        })
        .addCase(editStudent.pending,()=>{
            console.log("Đang tải dữ liệu");
            
        })
        .addCase(editStudent.fulfilled,(state, action:any)=>{
          console.log(action.payload);
          const idx = state.students.findIndex((i:Student)=>i.id === action.payload.id)
            console.log("idx",idx);
          state.students[idx] = action.payload
            console.log(state.students);
            
            
        })
        .addCase(editStudent.rejected,()=>{
            console.log("Lỗi lấy dữ liệu");
        })
    }
})
export default studentSlice.reducer