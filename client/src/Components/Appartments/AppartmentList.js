import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useAppartmentListQuery, useCheckAvailableMutation } from "./AppartmentApiSlice";
import { useAddToBasketMutation } from "../Baskets/BaketApiSlice";
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import '../../App.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


export default function AppartmentList() {
  const toast = useRef(null);

  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [visible, setVisible] = useState({});

  const [layout, setLayout] = useState('grid');
 const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // כשהקומפוננטה נטענת
    setShowDialog(true);
  }, []);

  const { data: products = [], error, isError, isSuccess, isLoading } = useAppartmentListQuery();
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [addToCart, { data2, isSuccess: isSuccess2, isError: isError2 }] = useAddToBasketMutation();
  const [checkAvailable, { data3, isSuccess3 }] = useCheckAvailableMutation();
  useEffect(() => {
    if (isSuccess2)
      toast.current.show({ severity: 'success', summary: 'added to basket', detail: '🏠', life: 3000 });
    if (isError2)
      toast.current.show({ severity: 'error', summary: 'error in adding to basket', detail: '🏠', life: 3000 });
  }, [isError2, isSuccess2])

  if (isError) {

    alert(JSON.stringify.error);

    return <p>error</p>
  }
  if (isLoading) {

    return <p>loading</p>
  }

  const dateTemplate = (date) => {
    if (date.day > 10 && date.day < 15) {
      return (
        <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
      );
    }

    return date.day;
  }
  const addToCartBtn = (product) => {
    console.log(product);
    addToCart({ item: { idAppartment: product._id, sDate: date[0], eDate: date[1] } });
    //toast.current.show({ severity: 'success', summary: 'added to basket', detail: '🏠', life: 3000 });

  }

  const checkAvailbeBtn = async () => {
    const filtered = []
    for (let i = 0; i < products.length; i++) {
      const result = await checkAvailable({ id: products[i]._id, sDate: new Date(date2[0]), eDate: new Date(date2[1]) })

      if (result.data == true)
        filtered.push(products[i])
    }
    // products.filter( async(e)=>{return  await checkAvailable({id:e._id,sDate:new Date(date2[0]),eDate:new Date(date2[1])})})
    setFilteredProducts(filtered)

  }
  // const listItem = (product, index) => (

  //   <div className="col-12" key={product._id}>
  //     <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
  //       <img
  //         className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
  //         src={`http://localhost:2012/images/${product.img}`}
  //         alt={product.img}
  //         style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain' }}
  //       />
  //       <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
  //         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
  //           <div className="text-2xl font-bold text-900">{product.name}</div>
  //           {/* <Rating value={product.description} readOnly cancel={false} /> */}
  //           <div className="flex align-items-center gap-3">
  //             <span className="flex align-items-center gap-2">
  //               <i className="pi pi-tag"></i>
  //               <span className="font-semibold">{product.city}</span>
  //             </span>
  //           </div>
  //         </div>
  //         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
  //           <span className="text-2xl font-semibold">${product.price} per night</span>
  //           <div className="card flex justify-content-center">

  //             <FloatLabel>
  //               <Calendar selectionMode="range"
  //                 inputId="birth_date" value={date} onChange={(e) => setDate(e.value)}
  //                 minDate={date2 ? new Date(date2[0]) : new Date(2025, 6, 15)}
  //                 maxDate={date2 ? new Date(date2[1]) : new Date(2025, 6, 15)}

  //               />
  //               <label htmlFor="birth_date">select dates</label>
  //             </FloatLabel>
  //           </div>
  //           <Button
  //             icon="pi pi-shopping-cart"
  //             className="p-button-rounded"
  //             disabled={!date || !date[0] || !date[1]}
  //             onClick={addToCartBtn}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const gridItem = (product, index) => (
    <div className="col-12 sm:col-6 lg:col-4 p-2" key={product._id}>
      <div className="p-4 border-1 surface-border surface-card border-round">
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag"></i>
            <span className="font-semibold">{product.city}</span>
          </div>
          {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img
            className="w-9 shadow-2 border-round"
            src={`http://localhost:2012/images/${product.img}`}
            alt={product.img}
            style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain' }}
          />
          <div className="text-2xl font-bold">{product.name}</div>
          <Rating value={product.rating} readOnly cancel={false} />
        </div>
        <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold">${product.price}</span>
          <div className="card flex justify-content-center">
            <FloatLabel>
              <Calendar selectionMode="range"
                inputId="birth_date" value={date} onChange={(e) => setDate(e.value)}
                minDate={date2 ? new Date(date2[0]) : new Date(1900, 6, 5)}
                maxDate={date2 ? new Date(date2[1]) : new Date(1900, 6, 7)} />
              <label htmlFor="birth_date">select dates</label>
            </FloatLabel>
          </div>
          <div className="card flex justify-content-center">
            <Button label="" icon="pi pi-external-link" onClick={() => { setVisible({ ...visible, [product._id]: true }) }} />
            <Dialog header={`${product.price}$/night`} visible={!!visible[product._id]} onHide={() => { setVisible({ ...visible, [product._id]: false }); }}
              style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
              <div className="m-0">
                <h1>{product.name}</h1>
                <h2>{product.city}</h2>
                <div ><img
                  className="w-9 shadow-2 border-round"
                  src={`http://localhost:2012/images/${product.img}`}
                  alt={product.img}
                  style={{ maxWidth: '300px', maxHeight: '150px', objectFit: 'contain' }}
                /></div>
                <p>size: {product.size}m²</p>
                <p>beds: {product.beds}</p>
                <p>description: {product.description}</p>
              </div>
            </Dialog>
          </div>
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-rounded"
            onClick={(e) => addToCartBtn(product)}
            disabled={!date || !date[0] || !date[1]}
          />
        </div>
      </div>
    </div>
  );

  const itemTemplate = (product, layout, index) => {

    if (!product) return null;
    // if (layout === 'list') return listItem(product, index);
    if (layout === 'grid') return gridItem(product, index);
  };

  // const listTemplate = (products, layout) => (
  //   <div className="grid grid-nogutter">
  //     {filteredProducts.map((product, index) => itemTemplate(product, layout, index))}
  //   </div>
  // );

  const header = () => (
    <div className="flex justify-content-end">
      <div className="page-wrapper">

        <div className="card search-bar">
  <div className="search-content">
    <Calendar
      placeholder="Select dates"
      minDate={new Date(2025, 6, 16)}
      selectionMode="range"
      value={date2}
      onChange={(e) => setDate2(e.value)}
      dateTemplate={dateTemplate}
    />
    <Button
      icon="pi pi-search"
      severity="success"
      aria-label="Search"
      disabled={!date2 || !date2[0] || !date2[1]}
      onClick={checkAvailbeBtn}
      label="Search"
    />
  </div>
</div>
</div>

      {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /> */}
    </div>
  );

  return (

    <div className="card">

 <Dialog
        header="ברוך הבא"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "50vw" }}
      >
        <p>יש לבחור תאריך למעלה </p>
      </Dialog>
      <Toast ref={toast} />
      <div className="grid">


        <DataView

          value={filteredProducts ? filteredProducts : products}
          itemTemplate={(product, index) => itemTemplate(product, layout, index)}
          layout={layout}
          header={header()}
        /></div>
    </div>
  );
}
