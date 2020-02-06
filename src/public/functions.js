
var divCurr = $('#currentComb');
var divOrigen = $('#stackOrigen');

$(function () {
  $('#invertir').on('click', function () {
    var num = parseInt($('#invertidas').val());
    var lim = Math.floor(num/2);
    divCurr.text(divCurr.text() + " --> Inverse " + num + " cards");

    $( ".naipe" ).each(function(index,element) {
      if (index < lim ){
        index1 = index + 1
        $( ".naipes div:nth-child(" + num + ")" ).before( $( ".naipes div:nth-child(" + index1 + ")" ) );
        $( ".naipes div:nth-child(" + index1 + ")" ).before( $( ".naipes div:nth-child(" + num + ")" ) );
        num--  
      }
    })
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
    var num = parseInt($('#cortadas').val());
    
    divCurr.text(divCurr.text() + " --> Cut in card " + num);

    $( ".naipe" ).each(function(index,element) {
      console.log(index)
      if(index<num){
        $( ".naipes div:nth-child(1)" ).insertAfter( $( ".naipes div:nth-child(52)" ) );
        
      }
    })
  });
});

$(function () {
  $('#change').on('click', function () {
    var num = parseInt($('#cambiadas').val());
    var num1 = parseInt($('#cambiadas1').val()) + 1;

    
    divCurr.text(divCurr.text() + " --> Put card " + num + " in position " + num1);

    $( ".naipes div:nth-child(" + num1 + ")" ).before( $( ".naipes div:nth-child(" + num + ")" ) );
    
    
    
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

 $(function () {
  $('#apply_stack').on('click', function () {

    var stck = $('#stacks').val()
    divOrigen.text(stck).css( 'font-weight', 'bold' );
    divCurr.text("");

    if (stck == "Randomly Shuffled"){
      shuffle();
      
    }

    if (stck == "New Deck Order"){
      newdeck(0);
      
    }

    if (stck == "Mnemonica"){
      newdeck(2);
      
    }
  });
});

function shuffle() {
  $(".naipes").each(function(){
    var divs = $(this).find('div');
    for(var i = 0; i < divs.length; i++) $(divs[i]).remove();  

    
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
}

function newdeck(n){
 
    var myArray = $(".naipes div").sort(function (a, b) {
      a = parseInt($(a).attr('id').slice(n,n+2));
      b = parseInt($(b).attr('id').slice(n,n+2));
      console.log(a)
      return a - b;
      
    }).each(function() {
      var elem = $(this);
      elem.remove();
      $(elem).appendTo(".naipes");
    });
    
   

}

newdeck(0);