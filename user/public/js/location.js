function myFunction() {
  $.getJSON("../location.json", function (data) {
    let country_value = $("select[id='inputCountry']").val();

    if (country_value) {
      $("select[id='inputState']").prop("disabled", false);

      country_pos = data.findIndex((element) => element["country"] == country_value)
      $("select[id='inputState']").empty();
      data[country_pos]["states"].forEach((state) => {
        $("select[id='inputState']").append(`<option>${state}</option>`);
      })
    }


  });

}
