import axios from 'axios';

let productInputs = []
let subCategories = []
let masterCategories = []
let productTypes = [
    {
        "_id": "642898a5b44c2c7f7e17d108",
        "name": "Vest top"
    },
    {
        "_id": "642898a5b44c2c7f7e17d109",
        "name": "Bra"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10a",
        "name": "Underwear Tights"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10b",
        "name": "Socks"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10c",
        "name": "Leggings/Tights"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10d",
        "name": "Sweater"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10e",
        "name": "Top"
    },
    {
        "_id": "642898a5b44c2c7f7e17d10f",
        "name": "Trousers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d110",
        "name": "Hair clip"
    },
    {
        "_id": "642898a5b44c2c7f7e17d111",
        "name": "Umbrella"
    },
    {
        "_id": "642898a5b44c2c7f7e17d112",
        "name": "Pyjama jumpsuit/playsuit"
    },
    {
        "_id": "642898a5b44c2c7f7e17d113",
        "name": "Bodysuit"
    },
    {
        "_id": "642898a5b44c2c7f7e17d114",
        "name": "Hair string"
    },
    {
        "_id": "642898a5b44c2c7f7e17d115",
        "name": "Unknown"
    },
    {
        "_id": "642898a5b44c2c7f7e17d116",
        "name": "Hoodie"
    },
    {
        "_id": "642898a5b44c2c7f7e17d117",
        "name": "Sleep Bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d118",
        "name": "Hair/alice band"
    },
    {
        "_id": "642898a5b44c2c7f7e17d119",
        "name": "Belt"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11a",
        "name": "Boots"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11b",
        "name": "Bikini top"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11c",
        "name": "Swimwear bottom"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11d",
        "name": "Underwear bottom"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11e",
        "name": "Swimsuit"
    },
    {
        "_id": "642898a5b44c2c7f7e17d11f",
        "name": "Skirt"
    },
    {
        "_id": "642898a5b44c2c7f7e17d120",
        "name": "T-shirt"
    },
    {
        "_id": "642898a5b44c2c7f7e17d121",
        "name": "Dress"
    },
    {
        "_id": "642898a5b44c2c7f7e17d122",
        "name": "Hat/beanie"
    },
    {
        "_id": "642898a5b44c2c7f7e17d123",
        "name": "Kids Underwear top"
    },
    {
        "_id": "642898a5b44c2c7f7e17d124",
        "name": "Shorts"
    },
    {
        "_id": "642898a5b44c2c7f7e17d125",
        "name": "Shirt"
    },
    {
        "_id": "642898a5b44c2c7f7e17d126",
        "name": "Cap/peaked"
    },
    {
        "_id": "642898a5b44c2c7f7e17d127",
        "name": "Pyjama set"
    },
    {
        "_id": "642898a5b44c2c7f7e17d128",
        "name": "Sneakers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d129",
        "name": "Sunglasses"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12a",
        "name": "Cardigan"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12b",
        "name": "Gloves"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12c",
        "name": "Earring"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12d",
        "name": "Bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12e",
        "name": "Blazer"
    },
    {
        "_id": "642898a5b44c2c7f7e17d12f",
        "name": "Other shoe"
    },
    {
        "_id": "642898a5b44c2c7f7e17d130",
        "name": "Jumpsuit/Playsuit"
    },
    {
        "_id": "642898a5b44c2c7f7e17d131",
        "name": "Sandals"
    },
    {
        "_id": "642898a5b44c2c7f7e17d132",
        "name": "Jacket"
    },
    {
        "_id": "642898a5b44c2c7f7e17d133",
        "name": "Costumes"
    },
    {
        "_id": "642898a5b44c2c7f7e17d134",
        "name": "Robe"
    },
    {
        "_id": "642898a5b44c2c7f7e17d135",
        "name": "Scarf"
    },
    {
        "_id": "642898a5b44c2c7f7e17d136",
        "name": "Coat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d137",
        "name": "Other accessories"
    },
    {
        "_id": "642898a5b44c2c7f7e17d138",
        "name": "Polo shirt"
    },
    {
        "_id": "642898a5b44c2c7f7e17d139",
        "name": "Slippers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13a",
        "name": "Night gown"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13b",
        "name": "Alice band"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13c",
        "name": "Straw hat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13d",
        "name": "Hat/brim"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13e",
        "name": "Tailored Waistcoat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d13f",
        "name": "Necklace"
    },
    {
        "_id": "642898a5b44c2c7f7e17d140",
        "name": "Ballerinas"
    },
    {
        "_id": "642898a5b44c2c7f7e17d141",
        "name": "Tie"
    },
    {
        "_id": "642898a5b44c2c7f7e17d142",
        "name": "Pyjama bottom"
    },
    {
        "_id": "642898a5b44c2c7f7e17d143",
        "name": "Felt hat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d144",
        "name": "Bracelet"
    },
    {
        "_id": "642898a5b44c2c7f7e17d145",
        "name": "Blouse"
    },
    {
        "_id": "642898a5b44c2c7f7e17d146",
        "name": "Outdoor overall"
    },
    {
        "_id": "642898a5b44c2c7f7e17d147",
        "name": "Watch"
    },
    {
        "_id": "642898a5b44c2c7f7e17d148",
        "name": "Underwear body"
    },
    {
        "_id": "642898a5b44c2c7f7e17d149",
        "name": "Beanie"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14a",
        "name": "Giftbox"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14b",
        "name": "Sleeping sack"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14c",
        "name": "Dungarees"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14d",
        "name": "Outdoor trousers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14e",
        "name": "Wallet"
    },
    {
        "_id": "642898a5b44c2c7f7e17d14f",
        "name": "Swimwear set"
    },
    {
        "_id": "642898a5b44c2c7f7e17d150",
        "name": "Swimwear top"
    },
    {
        "_id": "642898a5b44c2c7f7e17d151",
        "name": "Flat shoe"
    },
    {
        "_id": "642898a5b44c2c7f7e17d152",
        "name": "Garment Set"
    },
    {
        "_id": "642898a5b44c2c7f7e17d153",
        "name": "Ring"
    },
    {
        "_id": "642898a5b44c2c7f7e17d154",
        "name": "Waterbottle"
    },
    {
        "_id": "642898a5b44c2c7f7e17d155",
        "name": "Wedge"
    },
    {
        "_id": "642898a5b44c2c7f7e17d156",
        "name": "Long John"
    },
    {
        "_id": "642898a5b44c2c7f7e17d157",
        "name": "Outdoor Waistcoat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d158",
        "name": "Pumps"
    },
    {
        "_id": "642898a5b44c2c7f7e17d159",
        "name": "Flip flop"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15a",
        "name": "Braces"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15b",
        "name": "Bootie"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15c",
        "name": "Fine cosmetics"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15d",
        "name": "Heeled sandals"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15e",
        "name": "Nipple covers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d15f",
        "name": "Chem. cosmetics"
    },
    {
        "_id": "642898a5b44c2c7f7e17d160",
        "name": "Soft Toys"
    },
    {
        "_id": "642898a5b44c2c7f7e17d161",
        "name": "Hair ties"
    },
    {
        "_id": "642898a5b44c2c7f7e17d162",
        "name": "Underwear corset"
    },
    {
        "_id": "642898a5b44c2c7f7e17d163",
        "name": "Bra extender"
    },
    {
        "_id": "642898a5b44c2c7f7e17d164",
        "name": "Underdress"
    },
    {
        "_id": "642898a5b44c2c7f7e17d165",
        "name": "Underwear set"
    },
    {
        "_id": "642898a5b44c2c7f7e17d166",
        "name": "Sarong"
    },
    {
        "_id": "642898a5b44c2c7f7e17d167",
        "name": "Leg warmers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d168",
        "name": "Blanket"
    },
    {
        "_id": "642898a5b44c2c7f7e17d169",
        "name": "Hairband"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16a",
        "name": "Tote bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16b",
        "name": "Weekend/Gym bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16c",
        "name": "Cushion"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16d",
        "name": "Backpack"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16e",
        "name": "Earrings"
    },
    {
        "_id": "642898a5b44c2c7f7e17d16f",
        "name": "Bucket hat"
    },
    {
        "_id": "642898a5b44c2c7f7e17d170",
        "name": "Flat shoes"
    },
    {
        "_id": "642898a5b44c2c7f7e17d171",
        "name": "Heels"
    },
    {
        "_id": "642898a5b44c2c7f7e17d172",
        "name": "Cap"
    },
    {
        "_id": "642898a5b44c2c7f7e17d173",
        "name": "Shoulder bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d174",
        "name": "Side table"
    },
    {
        "_id": "642898a5b44c2c7f7e17d175",
        "name": "Accessories set"
    },
    {
        "_id": "642898a5b44c2c7f7e17d176",
        "name": "Headband"
    },
    {
        "_id": "642898a5b44c2c7f7e17d177",
        "name": "Baby Bib"
    },
    {
        "_id": "642898a5b44c2c7f7e17d178",
        "name": "Keychain"
    },
    {
        "_id": "642898a5b44c2c7f7e17d179",
        "name": "Dog Wear"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17a",
        "name": "Washing bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17b",
        "name": "Sewing kit"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17c",
        "name": "Cross-body bag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17d",
        "name": "Moccasins"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17e",
        "name": "Towel"
    },
    {
        "_id": "642898a5b44c2c7f7e17d17f",
        "name": "Wood balls"
    },
    {
        "_id": "642898a5b44c2c7f7e17d180",
        "name": "Zipper head"
    },
    {
        "_id": "642898a5b44c2c7f7e17d181",
        "name": "Mobile case"
    },
    {
        "_id": "642898a5b44c2c7f7e17d182",
        "name": "Pre-walkers"
    },
    {
        "_id": "642898a5b44c2c7f7e17d183",
        "name": "Toy"
    },
    {
        "_id": "642898a5b44c2c7f7e17d184",
        "name": "Marker pen"
    },
    {
        "_id": "642898a5b44c2c7f7e17d185",
        "name": "Bumbag"
    },
    {
        "_id": "642898a5b44c2c7f7e17d186",
        "name": "Eyeglasses"
    },
    {
        "_id": "642898a5b44c2c7f7e17d187",
        "name": "Wireless earphone case"
    },
    {
        "_id": "642898a5b44c2c7f7e17d188",
        "name": "Stain remover spray"
    },
    {
        "_id": "642898a5b44c2c7f7e17d189",
        "name": "Clothing mist"
    }
]

const fetchSubCategories = async () => {
    try {
        const responseSubCategories = await axios.get('http://localhost:8080/subcategories');
        subCategories = responseSubCategories.data; // Update the state with the fetched data

        const responseMasterCategories = await axios.get('http://localhost:8080/mastercategories');
        masterCategories = responseMasterCategories.data; // Update the state with the fetched data

        // const responseProductTypes = await axios.get('http://localhost:8080/producttypes');
        // productTypes = responseProductTypes.data; // Update the state with the fetched data
        // console.log(productTypes)

        productInputs = [
            {
                id: 1,
                label: "Product Name",
                type: "text",
                placeholder: "Ex: Vest top",
                name: 'productDisplayName'
            },
            {
                id: 2,
                label: "Description",
                type: "text",
                placeholder: "Ex: Product is so cute",
                name: 'detail_desc'
            },
            {
                id: 3,
                label: "Type",
                type: "text",
                value: [...productTypes],
                name: 'articleType'
            },
            {
                id: 4,
                label: "Price (vnd)",
                type: "number",
                placeholder: "1000",
                name: 'price'
            },
            {
                id: 5,
                label: "Sub Category",
                type: "text",
                value: [...subCategories],
                name: 'subCategory'
            },
            {
                id: 6,
                label: "Master Category",
                type: "text",
                value: [...masterCategories],
                name: 'mastercategories'
            },
            {
                id: 7,
                label: "Color",
                type: "text",
                placeholder: "Blue",
                name: 'color'
            }
        ];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchSubCategories();

export const orderInputs = [
    {
        id: 1,
        label: "OrderId",
        type: "text",
        name: 'orderId',
        disabled: true
    },
    {
        id: 2,
        label: "UserId",
        type: "text",
        name: "userId",
        disabled: true
    },
    {
        id: 3,
        label: "CartId",
        type: "text",
        name: "cartId",
        disabled: true
    },
    {
        id: 4,
        label: "Address",
        name: "address",
        type: "text"
    },
    {
        id: 5,
        label: "Shipping",
        name: "shipping",
        value: [{ _id: 1, shipping: 'processing' }, { _id: 2, shipping: 'delivered' }],
        type: "text",
    },
    {
        id: 6,
        label: "Payment",
        type: "text",
        name: "payment",
        value: [{ _id: 1, payment: 'cash' }, { _id: 2, payment: 'bank' }],
        placeholder: "Elton St. 216 NewYork",
    },
    {
        id: 7,
        label: "Total",
        name: "total",
        type: "text",
        disabled: true
    },
    {
        id: 8,
        label: "Disabled",
        name: "disabled",
        type: "text",
        value: [{ _id: 1, disabled: true }, { _id: 2, disabled: false }],
        default: false
    },
];

export const userInputs = [
    {
        id: 1,
        label: "Username",
        type: "text",
        placeholder: "john_doe",
    },
    {
        id: 2,
        label: "Name and surname",
        type: "text",
        placeholder: "John Doe",
    },
    {
        id: 3,
        label: "Email",
        type: "mail",
        placeholder: "john_doe@gmail.com",
    },
    {
        id: 4,
        label: "Phone",
        type: "text",
        placeholder: "+1 234 567 89",
    },
    {
        id: 5,
        label: "Password",
        type: "password",
    },
    {
        id: 6,
        label: "Address",
        type: "text",
        placeholder: "Elton St. 216 NewYork",
    },
    {
        id: 7,
        label: "Country",
        type: "text",
        placeholder: "USA",
    },
];

export { productInputs }
