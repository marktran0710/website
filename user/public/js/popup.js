const popupContainer = document.getElementById('popupContainer');
const myForm = document.getElementById('myForm');
const errorContainer = document.getElementById('errorContainer');


// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the element to attach the event listener to
    const myForm = document.getElementById('myForm');
    const closePopupButton = document.getElementById('closePopup');

    // Check if the element exists
    if (myForm) {
        // Attach the event listener
        myForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Check if all required fields are filled
            if (myForm.checkValidity() && (button1.checked || button2.checked)) {

                // Get the value of the checked input
                var paymentValue;
                if (button1.checked) {
                    paymentValue = button1.value;
                } else if (button2.checked) {
                    paymentValue = button2.value;
                }

                // Display the selected value
                popupContainer.style.display = 'block';
                // Get the form element
                var form = document.getElementById('myForm');
                var inputs = form.getElementsByTagName('input');
                var inputValues = {};
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    inputValues[input.name] = input.value;
                }

                // Re-set payment value
                inputValues['payment'] = paymentValue;
                const orderCart = JSON.parse(localStorage.getItem('orderCart'));
                $.post("/checkout",
                    { orderCart: orderCart, userInfo: inputValues })
                    .done(function (response) {
                        window.location.href = "/myorders"
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.status == 403) {
                            window.location.href = "/login"
                        }
                        if (jqXHR.status == 500) {
                            window.location.href = "/cart"
                        }

                    })
            } else {
                // If required fields are not filled, display validation messages
                errorContainer.textContent = 'Please select payment method';
                errorContainer.style.display = 'block';
                myForm.reportValidity();
            }
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', function () {
            popupContainer.style.display = 'none';
        });
    }

});




