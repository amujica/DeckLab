
var divCurr = $('#currentComb');

$(function () {
  $('#invertir').on('click', function () {
    divCurr.text(divCurr.text() + "--> Invertir");
    //Esto es en verdad poner carta n en m! con n=1 y m=2. Desarrollar eso con un selector
    var num = $('#invertidas').val();
    $( ".naipes div:nth-child(1)" ).before( $( ".naipes div:nth-child(2)" ) );
    console.log(num-1)
  });
});


$(function () {
    $('#faroExt').on('click', function () {
      divCurr.text(divCurr.text() + " --> Faro Exterior");

      $( ".naipes div:nth-child(1)" ).before( $( ".naipes div:nth-child(2)" ) );
      //Esto es en verdad poner carta n en m! con n=1 y m=2. Desarrollar eso con un selector

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

    $( ".naipes div:nth-child(3)" ).before( $( ".naipes div:nth-child(50)" ) );

   });
 });

 $(function () {
  $('#shuffle').on('click', function () {
    
    $(".naipes").each(function(){
      var divs = $(this).find('div');
      console.log(divs)
      for(var i = 0; i < divs.length; i++) $(divs[i]).remove();   //Borra el elemento del DOM    
          
      //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
      var i = divs.length;
      if ( i == 0 ) return false;
      while ( --i ) {
         var j = Math.floor( Math.random() * ( i + 1 ) );
         var tempi = divs[i];
         var tempj = divs[j];
         divs[i] = tempj;
         divs[j] = tempi;
         
       }
      for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
  });   

  });
 });

 