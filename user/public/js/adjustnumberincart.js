if (window.location.href.includes('/cart')) {
    calculteCartMoney();

}

function calculteCartMoney() {
    const values = $(".cart-total input.product-total").map(function () {
        return $(this).val();
    }).get();

    const sum = values.reduce((accumulator, currentValue) => {
        // Remove commas and convert to number
        const num = Number(currentValue.replace(/,/g, ''));
        return accumulator + num;
    }, 0);

    $(".cart-subtotal").text((sum).toLocaleString());

    $(".cart-total-money").text((sum + 30000).toLocaleString());

    localStorage.setItem('cart-subtotal-checkout', sum);

}

function updateOutput(productId) {
    const quantity = $(`input.product-quantity[data-id=${productId}]`).val();
    let price = $(`input.product-price[data-id=${productId}]`).val();
    price = Number(price.replace(/,/g, ''));
    $(`input.product-total[data-id=${productId}]`).val((Number(quantity) * price).toLocaleString());

    calculteCartMoney();
}

function removeItemInCart(productId) {

    $.post("/removeitemincart",
        { productId })
        .done(function (response) {
            // window.location.href = "/cart"
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "/login"
            }
            if (jqXHR.status == 404) {
                window.location.href = "/home"
            }

        });

    $(`tr.rounded[data-id=${productId}]`).remove();
    calculteCartMoney();

    const childCount = $('.cart-table .cart-body tr').children().length;
    if (childCount == 0) {
        $('.btn-proceed-checkout').addClass('disabled-link');

        $(".numberItemsInCart").text(0);
        $('.align-middle.cart-body')
            .append(`
            <p class="font-italic text-danger m-0 p-2">Please add the item to the cart.</p>
            `);
    }
}
