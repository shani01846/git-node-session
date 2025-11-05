import apiSlice from "../../app/apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        Login:builder.mutation({
            query:(userData)=>({
                url:"/authUser/login",
                method:"POST",
                body:userData
         }) 
        }),
        Register:builder.mutation({
            query:(userData)=>({
                url:"/authUser/register",
                method:"POST",
                body:userData

         }) 
        })
    })
})
export const {useLoginMutation,useRegisterMutation} = authApiSlice