let template_string = (element) => {
    return `
    <div class="col-lg-2 col-md-2 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4 rounded">
        <div class="product-img position-relative overflow-hidden rounded text-center">
            <img class="img-fluid product-image-<%= element['article_id']%>" style="width:100%; height:250px"
            src="https://drive.google.com/uc?export=view&id=${element["image"]}"
            alt="${element["image"].slice(0, 30) + " ..." + "not found"}" />
            <div class="product-action">
            <button class="btn btn-outline-dark btn-square addtocart" href=""><i
                class="fa fa-shopping-cart"></i></button>
            <button class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></button>
          </div>
        </div>
        <div class="text-center py-4 product-content overflow-hidden" style="background-color: #FFF8DE;">
        <a class="h6 text-decoration-none text-truncate product-name-${element["article_id"]
        }"
            href="/detail/${element["article_id"]}">
        <small>${element["productDisplayName"]}</small>
      </a>
      <div class="d-flex align-items-center justify-content-center mt-2">
        <h5 class="product-price-${element["article_id"]} red-text">
          ${element["price"].toLocaleString()} <small>vnd</small>
        </h5>
      </div>
        </div>
    </div>
    </div>`;
};

let schema = {
    "price-all": [Infinity, Infinity],
    "price-lt-100": [0, 100000],
    "price-bt-100-500": [100000, 500000],
    "price-bt-500-1000": [500000, 1000000],
    "price-gt-1000": [1000000, Infinity],
};
let all_active_price = new Set();

$(".price-filtering.custom-control-input").on("change", function () {
    $(this).each(function () {
        $(".product-shop").empty();
        if ($(this).is(":checked")) {
            // $('.checkbox:not(.price-all input[type="checkbox"])').prop('checked', true);
            if ($(this).attr("id")) {
                all_active_price.add($(this).attr("id"));
            }
        } else {
            // $('.price-filtering').prop('checked', false);
            if ($(this).attr("id")) {
                all_active_price.delete($(this).attr("id"));
            }
        }
    });

    let summary_range = new Set();
    all_active_price.forEach((element) => {
        summary_range.add(schema[element][0]);
        summary_range.add(schema[element][1]);
    });

    let sortedArray = Array.from(summary_range).sort(function (a, b) {
        return a - b;
    });

    $.ajax({
        url: '/getproductsbyfilteringprice',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            minimum_limit: sortedArray[0],
            upper_limit: sortedArray[sortedArray.length - 1],
        }),
        success: function (data) {
            data.forEach((element) => {
                $(".product-shop").append(template_string(element));
            });
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});








