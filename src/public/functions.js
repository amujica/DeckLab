
var divCurr = $('#currentComb');
var divOrigen = $('#stackOrigen');
var divDestino = $('#stackDestino');

var newdeckorder = ['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', 
'#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20',
'#21', '#22', '#23', '#24', '#25', '#26', '#27', '#28', '#29', '#30', '#31', '#32', '#33', 
'#34', '#35', '#36', '#37', '#38', '#39', '#40', '#41', '#42', '#43', '#44', 
'#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',]

var mnemonica = ['#17', '#02', '#33', '#16', '#04', '#34', '#52', '#05', '#44', '#51', 
'#12', '#37', '#25', '#08', '#47', '#48', '#09', '#26', '#38', '#11',
'#50', '#45', '#06', '#23', '#35', '#27', '#15', '#03', '#32', '#18', '#40', '#29', '#21', 
'#43', '#13', '#24', '#46', '#10', '#39', '#49', '#07', '#36', '#14', '#22', 
'#42', '#28', '#20', '#41', '#30', '#19', '#01', '#31', ]

var newdeckorder1 = ['#13', '#12', '#11', '#10', '#09', '#08', '#07', '#06', '#05', '#04', 
'#03', '#02', '#01', '#40', '#41', '#42', '#43', '#44', '#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',
'#27', '#28', '#29', '#30', '#31', '#32', '#33', '#34', '#35', '#36', '#37', '#38', '#39', 
'#26', '#25', '#24', '#23', '#22', '#21', '#20',
'#19', '#18', '#17', '#16', '#15', '#14', 

]

/*
  FUNCIONES PRIVADAS -------------------------------------------------------------------------------

*/

function fromNaipesToArray (){
  
  var arr = new Array();
  $( ".naipe" ).each(function(index,element) {
  
    index1 = index +1
    var n =  $( ".tapete div:nth-child(" + index1 + ")" ).attr('id')
    arr.push('#' + n);
    
  })
  
  return arr
}


function sortDom(selectorArray) {
  
  for(var i = 1; i <= selectorArray.length; i++){
    let $el = $(selectorArray[selectorArray.length-i]);
    $el.parent().prepend($el);

  }
}

function checkCurrDeck (){
  var arr = fromNaipesToArray()

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] !== mnemonica[i]) {
      return;
    }
  }   
  divDestino.text("Mnemonica").css( 'font-weight', 'bold' );
  
}

function disableButtons (){
      $('#cut').prop("disabled",true);
     $('#invertir').prop("disabled",true);
     $('#faroExtPar').prop("disabled",true);
     $('#faroIntPar').prop("disabled",true);
     $('#faroExt').prop("disabled",false);
     $('#faroInt').prop("disabled",false);
     $('#antifaroInt').prop("disabled",false);
     $('#antifaroExt').prop("disabled",false);

}

function timeoutSelected(){
  setTimeout(() => {  
    $(".ui-selected").each(function(index,element) {
      element.classList.remove("ui-selected");
    })
   }, 1500);
}

     
/*
  ORIGIN STACK -----------------------------------------------------------------------------

*/

$('#apply_stack').on('click', function () {
  var stck = $('#stacks').val()
  divOrigen.text(stck).css( 'font-weight', 'bold' );
  divCurr.text("");
    
    $(".ui-selected").each(function(index,element) {
      element.classList.remove("ui-selected");
    })

    if (stck == "New Deck Order"){
      sortDom(newdeckorder);
    }

    if (stck == "Randomly Shuffled"){
      shuffle();
    }
    if (stck == "Mnemonica"){
      sortDom(mnemonica);  
    }

    if (stck == "New Deck Order 1"){
      sortDom(newdeckorder1);
    }
});

/*
  OPERACIONES -------------------------------------------------------------------------------------

  Funciones a las que se llama cuando se hace click en un botón
*/

//------------------------------RANDOM SHUFFLE---------------------------


  $('#shuffle').on('click', function () {
    
    $(".tapete").each(function(){
      var divs = $(this).find('div');
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



//---------------------------- INVERTIR--------------------------


  $('#invertir').on('click', function () {

    var num = $(".ui-selected .naipeImg").length
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
     timeoutSelected()
     disableButtons()
     checkCurrDeck()

  });


//---------------------------- CORTAR --------------------------


  $('#cut').on('click', function () {
    var num = $(".ui-selected .naipeImg").length

    divCurr.text(divCurr.text() + " --> Cut in card " + num);

    $( ".naipe" ).each(function(index,element) {
      
      if(index<num){
        $( ".tapete div:nth-child(1)" ).insertAfter( $( ".tapete div:nth-child(52)" ) );
        
      }
    })

     timeoutSelected()
     disableButtons()
     checkCurrDeck()

  });


//---------------------------- FARO EXTERIOR --------------------------


  $('#faroExt').on('click', function () {

    divCurr.text(divCurr.text() + " --> Faro Exterior");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,26);
    var otherhalf = arr.slice(26,53);

    for (var i = 0; i < (arr.length/2); i++) {
      arr[2*i] = half[i]
      arr[2*i+1] = otherhalf[i]
    }
    
    sortDom(arr)
    
  });




//---------------------------- FARO INTERIOR --------------------------

  $('#faroInt').on('click', function () {
    divCurr.text(divCurr.text() + " --> Faro Interior");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,26);
    var otherhalf = arr.slice(26,53);

    for (var i = 0; i < (arr.length/2); i++) {
      arr[2*i] = otherhalf[i]
      arr[2*i+1] = half[i]
    }
    
    sortDom(arr)
    
  });




//---------------------------- FARO EXTERIOR PARCIAL --------------------------


  $('#faroExtPar').on('click', function () {
    

    var num = $(".ui-selected .naipeImg").length

    divCurr.text(divCurr.text() + " --> Faro Exterior Parcial (" + num + ")");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,num);
    var otherhalf = arr.slice(num,53);

    for (var i = 0; i < num; i++) {
      arr[2*i] = half[i]
      arr[2*i+1] = otherhalf[i]
    }

    timeoutSelected()

    disableButtons()
    sortDom(arr)
    
  });




//---------------------------- FARO INTERIOR PARCIAL--------------------------


  $('#faroIntPar').on('click', function () {

    var num = $(".ui-selected .naipeImg").length

    divCurr.text(divCurr.text() + " --> Faro Interior Parcial (" + num + ")");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,num);
    var otherhalf = arr.slice(num,53);

    for (var i = 0; i < num; i++) {
      arr[2*i] = otherhalf[i]
      arr[2*i+1] = half[i]
    }

    timeoutSelected()
    disableButtons()
    sortDom(arr)
    
  });



//---------------------------- ANTIFARO EXT--------------------------

  $('#antifaroExt').on('click', function () {

    divCurr.text(divCurr.text() + " --> Antifaro");
    var newarr = new Array();
    var arr = fromNaipesToArray()

    for (var i = 0; i < (arr.length/2); i++) {
      newarr.push(arr[2*i])
    }

    for (var i = 0; i < (arr.length/2); i++) {
      newarr.push(arr[2*i+1])
    }
  
    sortDom(newarr)
    
  });

//---------------------------- ANTIFARO INT--------------------------

$('#antifaroInt').on('click', function () {

  divCurr.text(divCurr.text() + " --> Antifaro");
  var newarr = new Array();
  var arr = fromNaipesToArray()

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i +1])
  }

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i])
  }

  sortDom(newarr)
  
});

//---------------------------- CLEAR LAST OPERATION --------------------------

$('#clearLast').on('click', function () {

  divCurr.text(divCurr.text() + " --> Antifaro");
  var newarr = new Array();
  var arr = fromNaipesToArray()

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i +1])
  }

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i])
  }

  sortDom(newarr)
  
});

/*
  BOTONES CURRENT COMBINATION ------------------------------------------------------------

*/
$(function () {
   $('#clear').on('click', function () {
     divCurr.text("");
   });
 });
 

/*
  SELECTABLE ------------------------------------------------------------
//https://codepen.io/codesnips/pen/QNYoyv
//http://www.tutorialspark.com/jqueryUI/jQuery_UI_Selectable_Interaction.php
*/

$( function() {
  $( ".selectable" ).selectable({
    selected: function() {

   

    }

    
    
  });
  
} );

$( function() {
  $( ".selectable" ).selectable({
    unselected: function() {
      
      var num = $(".ui-selected .naipeImg").length

      if (num==0){
        disableButtons()
      }

    }

  });
  
} );

$( function() {
  $( ".selectable" ).selectable({
    stop: function() {

      var num = $(".ui-selected .naipeImg").length
      
      if (num>0 && num<52){
        $('#cut').prop("disabled",false);
      }

      if (num>=52){
        $('#cut').prop("disabled",true);
      }

      if(num>1){
        $('#invertir').prop("disabled",false);
      }

      if (num>1 && (num<26)){
        $('#faroExtPar').prop("disabled",false);
        $('#faroIntPar').prop("disabled",false);
      }

      if (num>=26){
        $('#faroExtPar').prop("disabled",true);
        $('#faroIntPar').prop("disabled",true);
      }

      if (num>1){
        $('#faroExt').prop("disabled",true);
        $('#faroInt').prop("disabled",true);
        $('#antifaroExt').prop("disabled",true);
        $('#antifaroInt').prop("disabled",true);
      }

      if (num==0){
        disableButtons()
      }



      var firstCard =  $(".naipe ")[0]
      if (!firstCard.classList.contains("ui-selected") &&  $(".naipe ").hasClass("ui-selected")){
        alert("Please select the first card among the selected ones. If you want to make an operation on some cards which are not in top, first cut the deck");
        $(".ui-selected").each(function(index,element) {
          element.classList.remove("ui-selected");
        })
      }
      

    }

  });
  
} );


//Nada más empezar...
sortDom(['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', 
  '#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20',
  '#21', '#22', '#23', '#24', '#25', '#26', '#27', '#28', '#29', '#30', '#31', '#32', '#33', 
  '#34', '#35', '#36', '#37', '#38', '#39', '#40', '#41', '#42', '#43', '#44', 
  '#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',]);

  $('#cut').prop("disabled",true);
  $('#invertir').prop("disabled",true);
  $('#faroExtPar').prop("disabled",true);
  $('#faroIntPar').prop("disabled",true);
  $('#faroExt').prop("disabled",false);
  $('#faroInt').prop("disabled",false);

  
  
/*
FUNCIONES ANTIGUAS

function newdeck(){
 
    var myArray = $(".naipes div").sort(function (a, b) {
    a = parseInt($(a).attr('id'));
    b = parseInt($(b).attr('id'));
    
    return a - b;
      
    }).each(function() {
      var elem = $(this);
      elem.remove();
      $(elem).appendTo(".naipes");
    });

}

$(function () {
  $('#change').on('click', function () {
    var num = parseInt($('#cambiadas').val());
    var num1 = parseInt($('#cambiadas1').val()) + 1;

    
    divCurr.text(divCurr.text() + " --> Put card " + num + " in position " + num1);

    $( ".tapete div:nth-child(" + num1 + ")" ).before( $( ".tapete div:nth-child(" + num + ")" ) );
    
  });
});

*/