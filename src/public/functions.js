
var divCurr = $('#currentComb');
var divOrigen = $('#stackOrigen');

$(function () {
  $('#invertir').on('click', function () {
    var num = $(".ui-selected .naipeImg").length
    
    

    console.log(num)
    var lim = Math.floor(num/2);
    divCurr.text(divCurr.text() + " --> Inverse " + num + " cards");

    $( ".naipe" ).each(function(index,element) {
      if (index < lim ){
        index1 = index + 1
        $( ".tapete div:nth-child(" + num + ")" ).before( $( ".tapete div:nth-child(" + index1 + ")" ) );
        $( ".tapete div:nth-child(" + index1 + ")" ).before( $( ".tapete div:nth-child(" + num + ")" ) );
        num--  
      }
    })
    
    setTimeout(() => {  
      $(".ui-selected").each(function(index,element) {
        element.classList.remove("ui-selected");
      })
     }, 1500);
    
    
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
 


/* $(function () {
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
});*/

$(function () {
  $('#change').on('click', function () {
    var num = parseInt($('#cambiadas').val());
    var num1 = parseInt($('#cambiadas1').val()) + 1;

    
    divCurr.text(divCurr.text() + " --> Put card " + num + " in position " + num1);

    $( ".tapete div:nth-child(" + num1 + ")" ).before( $( ".tapete div:nth-child(" + num + ")" ) );
    
    
    
  });
});


 $(function () {
  $('#shuffle').on('click', function () {
    
    $(".tapete").each(function(){
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

 /*$(function () {
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
});*/

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

function newdeck(){
 
    var myArray = $(".naipes div").sort(function (a, b) {
      a = parseInt($(a).attr('id'));
      b = parseInt($(b).attr('id'));
      //console.log(a)
      return a - b;
      
    }).each(function() {
      var elem = $(this);
      elem.remove();
      $(elem).appendTo(".naipes");
    });
    
   

}

function sortDom(selectorArray) {
  while (selectorArray.length) {
      let $el = $(selectorArray.pop());
      $el.parent().prepend($el);
  }
}
 

$('#apply_stack').on('click', function () {
  var stck = $('#stacks').val()
    divOrigen.text(stck).css( 'font-weight', 'bold' );
    divCurr.text("");

    if (stck == "New Deck Order"){
      sortDom(['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', 
  '#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20',
  '#21', '#22', '#23', '#24', '#25', '#26', '#27', '#28', '#29', '#30', '#31', '#32', '#33', 
  '#34', '#35', '#36', '#37', '#38', '#39', '#40', '#41', '#42', '#43', '#44', 
  '#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',]);
      
    }

    if (stck == "Randomly Shuffled"){
      shuffle();
      
    }
    if (stck == "Mnemonica"){
      sortDom(['#17', '#02', '#33', '#16', '#04', '#34', '#52', '#05', '#44', '#51', 
  '#12', '#37', '#25', '#08', '#47', '#48', '#09', '#26', '#38', '#11',
  '#50', '#45', '#06', '#23', '#35', '#27', '#15', '#03', '#32', '#18', '#40', '#29', '#21', 
  '#43', '#13', '#24', '#46', '#10', '#39', '#49', '#07', '#36', '#14', '#22', 
  '#42', '#41', '#20', '#28', '#30', '#19', '#01', '#31', ]);
      
    }
  
});
$( function() {
  $( ".selectable" ).selectable();
} );
//https://codepen.io/codesnips/pen/QNYoyv
//http://www.tutorialspark.com/jqueryUI/jQuery_UI_Selectable_Interaction.php



$(function () {
  $('#cut').on('click', function () {
    var num = $(".ui-selected .naipeImg").length
    console.log(num)
    
    
    //$(".ui-selected").each(obj, function() {
    //}
    
    divCurr.text(divCurr.text() + " --> Cut in card " + num);

    
    $( ".naipe" ).each(function(index,element) {
      
      if(index<num){
        $( ".tapete div:nth-child(1)" ).insertAfter( $( ".tapete div:nth-child(52)" ) );
        
      }
    })

    setTimeout(() => {  
      $(".ui-selected").each(function(index,element) {
        element.classList.remove("ui-selected");
      })
     }, 1500);
  });
});


sortDom(['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', 
  '#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20',
  '#21', '#22', '#23', '#24', '#25', '#26', '#27', '#28', '#29', '#30', '#31', '#32', '#33', 
  '#34', '#35', '#36', '#37', '#38', '#39', '#40', '#41', '#42', '#43', '#44', 
  '#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',]);