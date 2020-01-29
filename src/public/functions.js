
var divCurr = $('#currentComb');


$(function () {
    $('#faroExt').on('click', function () {
      divCurr.text(divCurr.text() + " --> Faro Exterior");

      $( "#naipes div:nth-child(1)" ).before( $( "#naipes div:nth-child(2)" ) );
      

    });
  });

$(function () {
   $('#faroInt').on('click', function () {
     divCurr.text(divCurr.text() + " --> Faro Interior");
   });
 });

$(function () {
   $('#clear').on('click', function () {
     divCurr.text("");
   });
 });

 $(function () {
   $('#cut').on('click', function () {
    divCurr.text(divCurr.text() + " --> Cortar por 3");

    $( "#naipes div:nth-child(3)" ).before( $( "#naipes div:nth-child(6)" ) );

   });
 });



