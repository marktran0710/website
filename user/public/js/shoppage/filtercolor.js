let all_active_colors = new Set()

$('.color-filtering.custom-control-input').on('change', function () {
    $(this).each(function () {
        $('.product-shop').empty();
        if ($(this).is(":checked")) {
            if ($(this).attr("id")) {
                all_active_colors.add($(this).attr("id"));
            }
        } else {
            if ($(this).attr("id")) {
                all_active_colors.delete($(this).attr("id"));
            }
        }
    });

    fetchRequest(
        '/getproductsbyfilteringcolor',
        'POST',
        all_active_colors
    )
});
