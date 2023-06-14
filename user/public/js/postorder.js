$('.post-order').click(function (e) {
    let orderCart = {};
    let items = [];
    $('.cart-body tr').map(function () {
        var item = {};
        item.id = $(this).attr('data-id');
        item.name = $(this).find('.product-name').text().trim();
        item.price = $(this).find('.product-price').val();
        item.image = $(this).find('.product-image').attr('src');
        items.push(item);
    });
    let subTotal = $('.cart-subtotal').text();
    // { products: items, total: total}
    orderCart = { products: [...items], total: subTotal }
    localStorage.setItem('orderCart', JSON.stringify(orderCart));
});
