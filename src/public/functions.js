var divCurr = $('#currentComb');
var divOrigen = $('#stackOrigen');
var divDestino = $('#stackDestino');
var combinationArr = [];

var newdeckorder = ['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', 
'#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20',
'#21', '#22', '#23', '#24', '#25', '#26','#27', '#28', '#29', '#30', '#31', '#32', '#33', 
'#34', '#35', '#36', '#37', '#38', '#39','#40', '#41', '#42', '#43', '#44', 
'#45', '#46', '#47', '#48', '#49', '#50', '#51', '#52',]

var mnemonica = ['#17', '#02', '#33', '#16', '#04', '#32', '#40', '#05', '#48', '#41', 
'#12', '#29', '#25', '#08', '#45', '#44', '#09', '#26', '#28', '#11',
'#42', '#47', '#06', '#23', '#31', '#39', '#15', '#03', '#34', '#18', '#52', '#37', '#21', 
'#49', '#13', '#24', '#46', '#10', '#27', '#43', '#07', '#30', '#14', '#22', 
'#50', '#38', '#20', '#51', '#36', '#19', '#01', '#35', ]

var newdeckorder1 = ['#13', '#12', '#11', '#10', '#09', '#08', '#07', '#06', '#05', '#04', 
'#03', '#02', '#01', '#52', '#51', '#50', '#49', '#48', '#47', '#46', '#45', '#44', '#43', '#42', '#41', '#40',
'#39', '#38', '#37', '#36', '#35', '#34', '#33', '#32', '#31', '#30', '#29', '#28', '#27', 
'#26', '#25', '#24', '#23', '#22', '#21', '#20',
'#19', '#18', '#17', '#16', '#15', '#14', 

]

var newdeckorder2= ['#01','#02','#03','#04','#05','#06','#07','#08','#09','#10','#11','#12'
,'#13','#40','#41','#42','#43','#44','#45','#46','#47','#48','#49','#50','#51','#52',
'#39','#38','#37','#36','#35','#34','#33','#32','#31','#30','#29','#28','#27','#26','#25',
'#24','#23','#22','#21','#20','#19','#18','#17','#16','#15','#14']
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
     $('#clearLast').prop("disabled",false);
     $('#downloadComb').prop("disabled",false);

     

}

function timeoutSelected(){
  setTimeout(() => {  
    $(".ui-selected").each(function(index,element) {
      element.classList.remove("ui-selected");
    })
   }, 1000);
}


function fromcombinationArrToText(){
  
  CurrentText = ""
  

  combinationArr.forEach(function add(element){
    if (element.includes("cut")){
      var num = element.replace( /^\D+/g, '')
      CurrentText += " → Cut " + num + " cards";
    }
    else if (element.includes("inverse")){
      var num = element.replace( /^\D+/g, '')
      CurrentText += " → Inverse " + num + " cards";
      
    }
    else if (element.includes("antifaroext")){
      CurrentText += " → Out Antifaro ";

      
    }
    else if (element.includes("antifaroint")){
      CurrentText += " → Int Antifaro ";
      
    }
    else if (element.includes("faroextpar")){
      var num = element.replace( /^\D+/g, '')
      CurrentText += " → Partial Out Faro (" + num + ")";
    }
    else if (element.includes("farointpar")){
      var num = element.replace( /^\D+/g, '')
      CurrentText += " → Partial Int Faro (" + num + ")";
    }
    else if (element.includes("faroext")){
      CurrentText += " → Out Faro ";
    }
    else if (element.includes("faroint")){
      CurrentText += " → Int Faro ";
    }
   
    
  });
  
  return CurrentText;
}

function addCurrentText(){
  if (combinationArr.length == 0) divCurr.text(fromcombinationArrToText());
  combinationArr.forEach(function printl(element){
    divCurr.text(fromcombinationArrToText())
  }
    );
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
    if (stck == "New Deck Order 2"){
      sortDom(newdeckorder2);
    }
    combinationArr=[]
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
function inverse(num) {

  
  var lim = Math.floor(num/2);
  

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
   
   
}

  $('#invertir').on('click',function(){
    var num = $(".ui-selected .naipeImg").length
    inverse(num)
    combinationArr.push("inverse " + num);
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");

  } );


//---------------------------- CORTAR --------------------------


 function cut (num) {
    

    

    $( ".naipe" ).each(function(index,element) {
      
      if(index<num){
        $( ".tapete div:nth-child(1)" ).insertAfter( $( ".tapete div:nth-child(52)" ) );
        
      }
    })

     timeoutSelected()
     disableButtons()
     checkCurrDeck()
     

  }

  $('#cut').on('click', function(){
    var num = $(".ui-selected .naipeImg").length
    cut(num)
    combinationArr.push("cut " + num);
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
  } );


//---------------------------- FARO EXTERIOR --------------------------

  function faroExt(){
    var arr = fromNaipesToArray()
    var half = arr.slice(0,26);
    var otherhalf = arr.slice(26,53);

    for (var i = 0; i < (arr.length/2); i++) {
      arr[2*i] = half[i]
      arr[2*i+1] = otherhalf[i]
    }
    disableButtons()
    sortDom(arr)

  }
  $('#faroExt').on('click', function () {
    faroExt()
    combinationArr.push("faroext");
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
    
  });




//---------------------------- FARO INTERIOR --------------------------
function faroInt(){
    var arr = fromNaipesToArray()
    var half = arr.slice(0,26);
    var otherhalf = arr.slice(26,53);

    for (var i = 0; i < (arr.length/2); i++) {
      arr[2*i] = otherhalf[i]
      arr[2*i+1] = half[i]
    }
    disableButtons()
    sortDom(arr)

}
  $('#faroInt').on('click', function () {
    
    faroInt()
    combinationArr.push("faroint");
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
  });



//---------------------------- FARO EXTERIOR PARCIAL --------------------------
  function faroExtPar(num){
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

  }

  $('#faroExtPar').on('click', function () {
    

    var num = $(".ui-selected .naipeImg").length
    faroExtPar(num)
    
    
    combinationArr.push("faroextpar "  + num);
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
  });




//---------------------------- FARO INTERIOR PARCIAL--------------------------
  function faroIntPar(num){
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
  }

  $('#faroIntPar').on('click', function () {

    var num = $(".ui-selected .naipeImg").length

    faroIntPar(num)
    
    combinationArr.push("farointpar"  + num);
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
    
  });



//---------------------------- ANTIFARO EXT--------------------------
  function antifaroExt(){
    var newarr = new Array();
    var arr = fromNaipesToArray()

    for (var i = 0; i < (arr.length/2); i++) {
      newarr.push(arr[2*i])
    }

    for (var i = 0; i < (arr.length/2); i++) {
      newarr.push(arr[2*i+1])
    }
    
    sortDom(newarr)
    disableButtons()

  }
  $('#antifaroExt').on('click', function () {

    
    antifaroExt()
    combinationArr.push("antifaroext" );
    addCurrentText()
    $('#tool').attr('title', "Selected cards: 0");
    
  });

//---------------------------- ANTIFARO INT--------------------------
function antifaroInt(){
  var newarr = new Array();
  var arr = fromNaipesToArray()

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i +1])
  }

  for (var i = 0; i < (arr.length/2); i++) {
    newarr.push(arr[2*i])
  }

  sortDom(newarr)
  disableButtons()

}
$('#antifaroInt').on('click', function () {

  antifaroInt()
  combinationArr.push("antifaroint" );
  addCurrentText()
  $('#tool').attr('title', "Selected cards: 0");
  
});


//---------------------------- ANTIFARO EXT PARCIAL--------------------------
function antifaroExtPar(num){
  var newarr = new Array();
  var arr = fromNaipesToArray()

  for (var i = 0; i < num; i++) {
    newarr.push(arr[2*i])
  }

  for (var i = 0; i < num; i++) {
    newarr.push(arr[2*i+1])
  }

  for (var i = (2*num);  i < arr.length; i++) {
    newarr.push(arr[i])
  }
  
  sortDom(newarr)
  disableButtons()
  $('#tool').attr('title', "Selected cards: 0");

}


//---------------------------- ANTIFARO INT PARCIAL--------------------------
function antifaroIntPar(num){
  var newarr = new Array();
  var arr = fromNaipesToArray()

  for (var i = 0; i < num; i++) {
    newarr.push(arr[2*i+1])
  }

  for (var i = 0; i < num; i++) {
    newarr.push(arr[2*i])
  }

  for (var i = (2*num);  i < arr.length; i++) {
    newarr.push(arr[i])
  }

  sortDom(newarr)
  disableButtons()
  $('#tool').attr('title', "Selected cards: 0");

}


//---------------------------- CLEAR LAST OPERATION --------------------------

$('#clearLast').on('click', function () {
  lastValue = combinationArr[combinationArr.length - 1];
  if (lastValue.includes("cut")){
    var num = lastValue.replace( /^\D+/g, '');
    cut(52-num);
    
   //Hacer que el current combination se pinte con combinationArr, hacer funcion 
   //Borrar el current combination- Pintar current combination otra vez realemente
  }
  else if(lastValue.includes("inverse")){
    var num = lastValue.replace( /^\D+/g, '');
    inverse(num);
  }
  else if (lastValue.includes("antifaroext")){
    faroExt(); 
  }
  else if (lastValue.includes("antifaroint")){
    faroInt();
  }
  else if (lastValue.includes("faroextpar")){
    console.log("Num is: "+ num)
    var num = lastValue.replace( /^\D+/g, '')
    antifaroExtPar(num)
  }
  else if (lastValue.includes("farointpar")){
    var num = lastValue.replace( /^\D+/g, '')
    antifaroIntPar(num)
    
  }
  else if (lastValue.includes("faroext")){
    antifaroExt()
    
  }
  else if (lastValue.includes("faroint")){
    antifaroInt()
    
  }
  
  
  combinationArr.pop();
  if (combinationArr.length==0){
    $('#clearLast').prop("disabled",true);
    $('#downloadComb').prop("disabled",true);
  }
  addCurrentText()
  
  //Si combinationArr vacio boton desactivado, o si curretn combination ya no tiene nada, desativado
 //... Así con todas las fucniones
 //Borramos de Current combination
 //Que cuando se haga clear se borre también stackdestino, y que se ponga flechita!
 
  
  
});

/*
  BOTONES CURRENT COMBINATION ------------------------------------------------------------

*/
function download() {
  var save = $('#stackOrigen').text() + fromcombinationArrToText() + " → "+ $('#stackDestino').text();
  var blob = new Blob([save], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, "combination.txt");

  //Que pregunte con qué nombre guardarlo
  //Que lo guarde más bonito, en un pdf quizás con la baraja de origen y final. 
  //O textgo enriquecido
}

function downloadStack() {
  var save = fromNaipesToArray();
  var blob = new Blob([save], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, "stack.txt");

  

  //Que pregunte con qué nombre guardarlo
  //Que lo guarde más bonito, en un pdf quizás con la baraja de origen y final. 
  //O textgo enriquecido
}


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
    selecting: function() {
      var num = $(".ui-selecting .naipeImg").length
      $('#tool').attr('title', "Selected cards: " + num);
      
    }

    
    
  });
  
} );

$( function() {
  $( ".selectable" ).selectable({
    unselecting: function() {
      var num = $(".ui-selecting .naipeImg").length
      $('#tool').attr('title', "Selected cards: " + num);

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
        alert("Please select the first card among the selected ones. If you want to make an operation on some cards which are not in top, first cut the deck. To see more information about how to use operations, click on the deckLab logo in the top left corner.");
        $(".ui-selected").each(function(index,element) {
          element.classList.remove("ui-selected");
        })
        disableButtons()
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
  $('#downloadComb').prop("disabled",true);
  //$('#downloadStack').prop("disabled",false);

 
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

    
    divCurr.text(divCurr.text() + " → Put card " + num + " in position " + num1);

    $( ".tapete div:nth-child(" + num1 + ")" ).before( $( ".tapete div:nth-child(" + num + ")" ) );
    
  });
});

*/

