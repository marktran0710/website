$('.pagination-page').click(function (e) {
    e.preventDefault()
    $('.pagination-content').find('.active').removeClass('active');
    $(this).addClass('active');

    $('.featured-products').empty();
    let page = parseInt($(this).text()) || 1;

    $.get(`/pagination?page=${page}`)
        .done(function (response) {
            response.forEach(element => {
                $('.featured-products').append(
                    `<div class="col-lg-2 col-md-2 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4 rounded" data-id="${element['article_id']}">
                    <div class="product-img rounded position-relative overflow-hidden">
                      <div class="w-100 text-center">
                        <img style="width:100%;height: 250px;" class="img-fluid product-image-${element['article_id']} "
                          src = "https://drive.google.com/uc?export=view&id=${element['image']}" alt = "aaaa" />
                      </div >
                      <div class="product-action">
                      <button class="btn btn-outline-dark btn-square addtocart " data-id="${element['article_id']} href=""><i
                          class="fa fa-shopping-cart"></i></button>
                      <button class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></button>
                    </div>
                    </div >
                    <div class="text-center py-4 product-content overflow-hidden" style="background-color: #FFF8DE;">
                        <a class="h6 text-decoration-none text-truncate product-name-<%= element['article_id']%>" 
                            href="/detail/${element['article_id']}">
                            <small>${element['productDisplayName']}</small>
                        </a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5 class="product-price-${element['article_id']} red-text">
                                ${element['price']} <small>vnd</small>
                            </h5>
                        </div>
                    </div>
                    </div >
                    </div > `)
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "/login"
            }
            if (jqXHR.status == 404) {
                window.location.href = "/home"
            }

        });

    // fetch(`http://'localhost':8080/pagination?page=${page}`)
    //     .then(response => {
    //         if (response.status != 200) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         data.forEach(element => {
    //             $('.featured-products').append(
    //                 `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    //                 <div class="product-item bg-light mb-4 rounded" data-id="${element['article_id']}">
    //                 <div class="product-img rounded position-relative overflow-hidden">
    //                   <div class="w-100 text-center">
    //                     <img style="width:75%;height: 250px;" class="img-fluid product-image-${element['article_id']} "
    //                       src = "https://drive.google.com/uc?export=view&id=${element['image']}" alt = "aaaa" />
    //                   </div >
    //                   <div class="product-action">
    //                   <button class="btn btn-outline-dark btn-square addtocart" href=""><i
    //                       class="fa fa-shopping-cart"></i></button>
    //                   <button class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></button>
    //                 </div>
    //                 </div >
    //                 <div class="text-center py-4">
    //                     <a class="h6 text-decoration-none text-truncate product-name-<%= element['article_id']%>" 
    //                         href="/detail/${element['article_id']}">
    //                         <small>${element['productDisplayName']}</small>
    //                     </a>
    //                     <div class="d-flex align-items-center justify-content-center mt-2">
    //                         <h5 class="product-price-${element['article_id']} red-text">
    //                             ${element['price']} <small>vnd</small>
    //                         </h5>
    //                     </div>
    //                 </div>
    //                 </div >
    //                 </div > `)
    //         });
    //     }).catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);;
    //     });
})

