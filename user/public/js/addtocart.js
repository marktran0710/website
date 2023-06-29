// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

// $('.addtocart').on('click', function () {

//     var userId;
//     const button = $(this);
//     const productId = button.closest(".product-item").attr("data-id");

//     if (!getCookie('userId')) {
//         const uuidv4 = uuid.v4();
//         document.cookie = `userId=${uuidv4}`;
//         userId = uuidv4;
//     }

//     $.post("/cart",
//         {
//             productId: productId,
//             userId: getCookie('userId')
//         },
//         function (data, status) {
//             Toastify({
//                 text: `Added product: ${productId}`,
//                 className: "error",
//                 style: {
//                     background: "linear-gradient(to right, #00b09b, #96c93d)",
//                 },
//                 duration: 3000
//             }).showToast();
//             localStorage.setItem("cart", JSON.stringify(data))
//         });

//     // Calculate the total items clicked
//     const cart = $('#cart');
//     const cartTotal = cart.attr('data-totalitems');
//     const newCartTotal = parseInt(cartTotal) + 1;

//     button.addClass('sendtocart');
//     setTimeout(function () {
//         button.removeClass('sendtocart');
//         cart.addClass('shake').attr('data-totalitems', newCartTotal);
//         setTimeout(function () {
//             cart.removeClass('shake');
//         }, 500)
//     }, 1000);

//     //Update real time quanlity value of the products in cart
//     $(document).ready(function () {
//         $(".product-quantity").change(function () {
//             alert("The text has been changed.");
//         });
//     });

// })
//Update real time quanlity value of the products in cart
$(document).ready(function () {
    $.get('/getnumberitemsincart', function (response) {
        // Handle the response data
        $(".numberItemsInCart").text(response.products);
    })
        .fail(function (error) {
            // Handle any errors
            $(".numberItemsInCart").text(0);
        });

});

$('.addtocart').on('click', function () {
    const button = $(this);
    const productId = button.attr("data-id");
    let value = $(".numberItemsInCart").text();
    let number = parseInt(value);
    number++;
    $(".numberItemsInCart").text(number);

    $.post("/additemtocart",
        {
            productId: productId
        },
        function (data, status) {
            Toastify({
                text: `Added product: ${productId}`,
                className: "error",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                duration: 3000
            }).showToast();
        });
})