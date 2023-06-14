const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
var paymentInputs = document.querySelectorAll('[name="payment"][status="toggle"]');

// Loop through the radio inputs and find the checked one
for (var i = 0; i < paymentInputs.length; i++) {
    if (paymentInputs[i].checked) {
        console.log(paymentInputs[i]);
        var checkedValue = paymentInputs[i].value;
        break; // Exit the loop once the checked input is found
    }
}


$('.toggle').hide();
$('input[status="toggle"]').on('change', function () {
    var toggleValue = $(this).data('toggle-value');
    $('.toggle').hide();
    $('.toggle[data-toggle-id="' + toggleValue + '"]').show();
});

const subTotal = localStorage.getItem('cart-subtotal-checkout');
$(".cart-subtotal-checkout").text(subTotal);
$(".cart-total-money-checkout").text((parseInt(subTotal) + 30000).toLocaleString());


if (window.location.href.includes('/cart')) {
    $('.btn-proceed-checkout').removeClass('disabled-link');
    if ($('.align-middle.cart-body tr').length <= 0) {
        $('.btn-proceed-checkout').addClass('disabled-link');
    }
}


