


import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function GroupedDemo() {
    const [selectedCity, setSelectedCity] = useState(null);
    const groupedCities = [
        {
            label: 'Germany',
            code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan',
            code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.label}</div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={groupedCities} optionLabel="label" 
                optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} className="w-full md:w-14rem" placeholder="Select a City" />
        </div>
    )
}
        

// import React, { useState, useEffect, useRef } from 'react';
// import { classNames } from 'primereact/utils';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
// import { 
//   useAddAppMutation,
//   useDeleteAppartmentMutation,
//   useUpdateAppartmentMutation,
//   useAppartmentListQuery
// } from "./AppartmentApiSlice";

// export default function AddAppartment() {
//   let emptyProduct = {
//     name: "",
//     size: 0,
//     price: 0,
//     beds: 0,
//     description: ""
//   };

//   const [products, setProducts] = useState([]);
//   const [productDialog, setProductDialog] = useState(false);
//   const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//   const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//   const [product, setProduct] = useState(emptyProduct);
//   const [selectedProducts, setSelectedProducts] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const toast = useRef(null);
//   const dt = useRef(null);

//   const [addAppartment, { data, isLoading, isSuccess, isError, error }] = useAddAppMutation();
//   const [deleteAppartment, { data2, isLoading2, isSuccess2, isError2, error2 }] = useDeleteAppartmentMutation();
//   const [updateAppartment, { data3, isLoading3, isSuccess3, isError3, error3 }] = useUpdateAppartmentMutation();
//   const [appartmentList, { data4, isLoading4, isSuccess4, isError4, error4 }] = useAppartmentListQuery();

//   const formatCurrency = (value) => {
//     return value.toLocaleString('en-US', { style: 'currency', currency: 'ILS' });
//   };

//   const openNew = () => {
//     setProduct(emptyProduct);
//     setSubmitted(false);
//     setProductDialog(true);
//   };

//   const hideDialog = () => {
//     setSubmitted(false);
//     setProductDialog(false);
//   };

//   const hideDeleteProductDialog = () => {
//     setDeleteProductDialog(false);
//   };

//   const hideDeleteProductsDialog = () => {
//     setDeleteProductsDialog(false);
//   };

//   const editProduct = (product) => {
//     updateAppartment({ product });
//     setProductDialog(true);
//   };

//   const confirmDeleteProduct = (product) => {
//     updateAppartment(product);
//     setDeleteProductDialog(true);
//   };

//   const deleteProduct = () => {
//     deleteAppartment(product.id);
//     setProduct(emptyProduct);
//     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//   };

//   const findIndexById = (id) => {
//     let index = -1;

//     for (let i = 0; i < products.length; i++) {
//       if (products[i].id === id) {
//         index = i;
//         break;
//       }
//     }

//     return index;
//   };

//   const createId = () => {
//     let id = '';
//     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < 5; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     return id;
//   };

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };

//   const confirmDeleteSelected = () => {
//     setDeleteProductsDialog(true);
//   };

//   const deleteSelectedProducts = () => {
//     let _product_id = products.filter((val) => selectedProducts.includes(val));
//     deleteAppartment(_product_id);
//     setDeleteProductsDialog(false);
//     setSelectedProducts(null);
//     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
//   };

//   const leftToolbarTemplate = () => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
//         <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
//       </div>
//     );
//   };

//   const rightToolbarTemplate = () => {
//     return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
//   };

//   const priceBodyTemplate = (rowData) => {
//     return formatCurrency(rowData.price);
//   };

//   const ratingBodyTemplate = (rowData) => {
//     return <Rating value={rowData.rating} readOnly cancel={false} />;
//   };

//   const actionBodyTemplate = (rowData) => {
//     return (
//       <>
//         <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
//         <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
//       </>
//     );
//   };

//   const header = (
//     <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//       <h4 className="m-0">Manage Products</h4>
//       <IconField iconPosition="left">
//         <InputIcon className="pi pi-search" />
//         <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
//       </IconField>
//     </div>
//   );

//   const productDialogFooter = (
//     <>
//       <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
//     </>
//   );

//   return (
//     <div>
//       <Toast ref={toast} />
//       <div className="card">
//         <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

//         <DataTable
//           ref={dt}
//           value={products}
//           selection={selectedProducts}
//           onSelectionChange={(e) => setSelectedProducts(e.value)}
//           dataKey="id"
//           paginator
//           rows={10}
//           rowsPerPageOptions={[5, 10, 25]}
//           globalFilter={globalFilter}
//           header={header}
//         >
//           <Column selectionMode="multiple" exportable={false}></Column>
//           <Column field="name" header="Name" sortable></Column>
//           <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
//           <Column field="beds" header="Beds" sortable></Column>
//           <Column field="description" header="Description"></Column>
//           <Column body={actionBodyTemplate} exportable={false}></Column>
//         </DataTable>
//       </div>

//       <Dialog
//         visible={productDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Product Details"
//         modal
//         className="p-fluid"
//         footer={productDialogFooter}
//         onHide={hideDialog}
//       ></Dialog>
//     </div>
//   );
// }
