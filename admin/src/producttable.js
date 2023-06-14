export const productColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "image",
        headerName: "Title",
        width: 280,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={"https://drive.google.com/uc?export=view&id=" + params.row.image} alt="avatar" />
                    {params.row.productDisplayName}
                </div>
            );
        },
    },
    {
        field: "articleType",
        headerName: 'Product Type',
        width: 250
    },
    {
        field: "subCategory",
        headerName: "Sub Category",
        width: 180
    },
    {
        field: "mastercategories",
        headerName: "Master Category",
        width: 180
    },
    {
        field: "color",
        headerName: "Color",
        width: 180,
    },
    {
        field: "price",
        headerName: "Price",
        width: 180,
    }
];


//temporary data
// export const productRows = [
//     {
//         id: 1,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this is product is mobile phone",
//         category: "mobile",
//         price: 20000,
//         stock: 35,
//     },
//     {
//         id: 2,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG1vYmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
//         description: "this is product is mobile phone",
//         category: "mobile",
//         price: 60000,
//         stock: 25,
//     },
//     {
//         id: 3,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1582807129843-8a00296ccb37?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1vYmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
//         description: "this is product is mobile phone",
//         category: "mobile",
//         price: 2000,
//         stock: 35,
//     },
//     {
//         id: 4,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this leptop is premium  ",
//         category: "leptop",
//         price: 35000,
//         stock: 22,
//     }, {
//         id: 5,
//         productTitle: "Snow",
//         img: "https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938__340.jpg",
//         description: "this is product description",
//         category: "mobile",
//         price: 2000,
//         stock: 35,
//     }, {
//         id: 6,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this is apple premium leptop ",
//         category: "computer",
//         price: 2000,
//         stock: 61,
//     },
//     {
//         id: 7,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this is product description",
//         category: "mobile",
//         price: 2000,
//         stock: 65,
//     },
//     {
//         id: 8,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this leptop is premium ",
//         category: "computer",
//         price: 2000,
//         stock: 15,
//     },
//     {
//         id: 9,
//         productTitle: "Snow",
//         img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         description: "this is product description",
//         category: "mobile",
//         price: 2000,
//         stock: 5,
//     },
//     {
//         id: 10,
//         productTitle: "Snow",
//         img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
//         description: "this leptop is premium ",
//         category: "computer",
//         price: 2000,
//         stock: 35,
//     },
// ];