import apiSlice from "../../app/apiSlice";

const BasketApiSlice=apiSlice.injectEndpoints({

    endpoints:(build)=>({
GetBasket:build.query({
    query:()=>({
        url:'/basket',
        method:"GET"
    }),
    providesTags:["Baket"]
}),
AddToBasket:build.mutation({
    query:(item)=>({
        url:`/basket`,
        method:"PUT",
        body:item
    }),
    invalidatesTags:["Baket"]
}),
DeleteFromBasket:build.mutation({
    query:(id)=>({
        url:"/basket",
        method:"DELETE",
        body:id
}),
invalidatesTags:["Baket"]

}),
deleteBasket:build.mutation({
    query:()=>({
        url:"/basket/deleteBasket",
        method:"DELETE",
}),
invalidatesTags:["Baket"]

})
    })
})
export const{useGetBasketQuery,useAddToBasketMutation,useDeleteFromBasketMutation,useDeleteBasketMutation}=BasketApiSlice
export default BasketApiSlice.reducer