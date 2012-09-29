$(document).ready( function(){

  $('#birthday_form').submit(function(ev) {
    ev.preventDefault();

    // Send the birthday date and receive the answer
    $.ajax({
      url: "/birthday",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
        $("#mainarea").html(data);
      }
    });

    // Start the countdown
    getUpdate();
  });

});


function getUpdate() {
  $.ajax({
    url: "/countdown",
    data: { month: $("#month_input").val(), day: $("#day_input").val() },
    dataType: "html",
    success: function(data){
      $("#countdown").html(data);
    }
  });

  setTimeout(getUpdate, 1000);
}
