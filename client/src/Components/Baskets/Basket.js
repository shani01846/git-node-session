
// import { ProductService } from './service/ProductService';
// import { getAllItems} from '../../../../server/Controllers/userControl';
// import deleteItem from "./DeleteItem"
import 'primeicons/primeicons.css';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useGetBasketQuery, useDeleteFromBasketMutation, useDeleteBasketMutation } from './BaketApiSlice';
import { useLazyGetAppByIdQuery } from '../Appartments/AppartmentApiSlice';
import { useAddBookingMutation } from "../Appartments/AppartmentApiSlice";
import { data } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';


const Basket = () => {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const { data: products = [], isLoading, isError } = useGetBasketQuery()
    const [deleteItem, { data2, isLoading2, isError2 }] = useDeleteFromBasketMutation()
    const [addBooking, { data3, isLoading3, isError3 }] = useAddBookingMutation()
    const [deleteBasket, { data4, isLoading4, isError4 }] = useDeleteBasketMutation()

    // const [getAppartment] = useLazyGetAppByIdQuery()
    // const [appInfo, setAppInfo] = useState({})
    // const [Data,setData]=useState()
    // const getAppartmentFunc = async () => {
    //     let newAppInfo = { ...appInfo }
    //     for (let i = 0; i < products.length; i++) {
    //         if (!newAppInfo[[products[i].idAppartment]]) {
    //             let result = await getAppartment(products[i].idAppartment)
    //             newAppInfo[products[i].idAppartment] = result.data
    //         }
    //     }
    //     setAppInfo(newAppInfo)
    // }
    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'booking confirmed', detail: '🏠', life: 3000 });
    }
    const book = () => {
console.log("gfd");
        for (let i = 0; i < products.items.length; i++) {
             console.log(products.items[i]);
            // alert({ id: products.items[i].idAppartment, sDate: products[i].sDate, eDate: products[i].eDate })
            addBooking({ id: products.items[i].idAppartment, sDate: products.items[i].sDate, eDate: products.items[i].eDate })
        }

        deleteBasket()
        showSuccess()
    }
    const bookDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => setVisible(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => { setVisible(false); book() }} />
        </React.Fragment>
    );
    // console.log(products[0].idAppartment)
    // useEffect(() => {
    //     // if (!products || products.length === 0) 
    //     //return;
    //     getAppartmentFunc()
     // }
    //     , [products])

    const deleteItemBtn = (id) => {
        deleteItem({ itemId: id })
    }

    // const itemTemplate = (data) => {
    //     return (

    //         <div className="col-12">
    //             <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
    //                 <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"  src={`http://localhost:2012/images/${appInfo[data.idAppartment]?.img}`}
    //         alt={data.name}
    //         style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
    //                 <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center lg:align-items-start gap-3">
    //                         <div className="flex flex-column gap-1">
    //                             <div className="text-2xl font-bold text-900">{appInfo[data.idAppartment]?.name||"טוען.."}</div>
    //                             <div className="text-700">{appInfo[data.idAppartment]?.description||"טוען.."}</div>
    //                         </div>
    //                         <div className="flex flex-column gap-2">
    //                             {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
    //                             <span className="flex align-items-center gap-2">
    //                                 <i className="pi pi-tag product-category-icon"></i>
    //                                 <span className="font-semibold">{appInfo[data.idAppartment]?.city||"טוען.."}</span>
    //                             </span>
    //                         </div>
    //                     </div>

    //                     <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
    //                         <span className="text-2xl font-semibold">all together ${(appInfo[data.idAppartment]?.price*((new Date(data.eDate)-new Date(data.sDate))/86400000)).toFixed(2)||"טוען.."}</span>
    //                         <Button icon="pi pi-trash" onClick={()=>deleteItemBtn(data._id)}></Button>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    const itemTemplate = (data) => {
       // console.log(data);
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:2012/images/${data.idAppartment.img}`}
                        alt={data.name}
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data?.idAppartment.name || "טוען.."}</div>
                                <div className="text-700">{data?.idAppartment.description || "טוען.."}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data?.idAppartment.city || "טוען.."}</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">all together ${data?.idAppartment.price * ((new Date(data.eDate) - new Date(data.sDate)) / 86400000).toFixed(2) || "טוען.."}</span>
                            <Button icon="pi pi-trash" onClick={() => deleteItemBtn(data._id)}></Button>

                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <>
            {/* <video src="http://localhost:2012/images/m.mp4"></video> */}

            <div className="card flex flex-wrap justify-content-center gap-3">
                <Toast ref={toast} />
                {products?.items?.length > 0 && (<Button type="button" label="book now" icon="pi pi-shopping-bag "
                    outlined badge={products.items.length} badgeClassName="p-badge-danger" onClick={() => setVisible(true)} />)}
                <Dialog footer={bookDialogFooter} header="Booking Procces" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <p className="m-0">are you sure?</p>
                </Dialog>
            </div>
            <div className="card">
                <DataScroller value={products.items}
                    itemTemplate={itemTemplate}
                    rows={5} inline scrollHeight="500px"
                    header="Scroll Down to Load More" />
            </div></>
    )
}

export default Basket