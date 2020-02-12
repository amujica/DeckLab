
var divCurr = $('#currentComb');
var divOrigen = $('#stackOrigen');
var divDestino = $('#stackDestino');

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
    
     $('#cut').prop("disabled",true);
     $('#invertir').prop("disabled",true);
     $('#faroExtPar').prop("disabled",true);
     $('#faroIntPar').prop("disabled",true);
     $('#faroExt').prop("disabled",false);
    $('#faroInt').prop("disabled",false);
    checkCurrDeck()
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
  
    for(var i = 1; i <= selectorArray.length; i++){
      let $el = $(selectorArray[selectorArray.length-i]);
      $el.parent().prepend($el);

    }
      
  
}
 


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
$( function() {
  $( ".selectable" ).selectable({
    selected: function() {
      var num = $(".ui-selected .naipeImg").length
      
      if (num>1 && num<52){
        $('#cut').prop("disabled",false);
      }

      if(num>1){
        $('#invertir').prop("disabled",false);
      }

      if (num>1 && (num<26)){
        $('#faroExtPar').prop("disabled",false);
        $('#faroIntPar').prop("disabled",false);
      }

      if (num>1){
        $('#faroExt').prop("disabled",true);
        $('#faroInt').prop("disabled",true);
      }

    }
  });
  
} );
//https://codepen.io/codesnips/pen/QNYoyv
//http://www.tutorialspark.com/jqueryUI/jQuery_UI_Selectable_Interaction.php



$(function () {
  $('#cut').on('click', function () {
    var num = $(".ui-selected .naipeImg").length
  
    
    
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

     $('#cut').prop("disabled",true);
     $('#invertir').prop("disabled",true);
     $('#faroExtPar').prop("disabled",true);
     $('#faroIntPar').prop("disabled",true);
     $('#faroExt').prop("disabled",false);
     $('#faroInt').prop("disabled",false);
     checkCurrDeck()

  });
});

function checkCurrDeck (){
  var arr = fromNaipesToArray()
  console.log(arr)
  console.log(mnemonica)
  
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] !== mnemonica[i]) {
      console.log("Ocurrió lo inesperado: " + i)
      console.log(arr[i])
      console.log(mnemonica[i])
      return;
    }
  }
  
    
  divDestino.text("Mnemonica").css( 'font-weight', 'bold' );
  

}

function fromNaipesToArray (){
  
  var arr = new Array();
  $( ".naipe" ).each(function(index,element) {
    index1 = index +1
    
   var n =  $( ".tapete div:nth-child(" + index1 + ")" ).attr('id')
   arr.push('#' + n);
    
  })
  
  return arr
}


$(function () {
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
});

$(function () {
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
});

$(function () {
  $('#faroExtPar').on('click', function () {
    

    var num = $(".ui-selected .naipeImg").length

    divCurr.text(divCurr.text() + " --> Faro Exterior Parcial (" + num + ")");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,num);
    var otherhalf = arr.slice(num,53);

    console.log(half)
    console.log(otherhalf)

    for (var i = 0; i < num; i++) {
      arr[2*i] = half[i]
      arr[2*i+1] = otherhalf[i]
    }

    setTimeout(() => {  
      $(".ui-selected").each(function(index,element) {
        element.classList.remove("ui-selected");
      })
     }, 1500);

    
    sortDom(arr)
    
  });
});

$(function () {
  $('#faroIntPar').on('click', function () {

    var num = $(".ui-selected .naipeImg").length

    divCurr.text(divCurr.text() + " --> Faro Interior Parcial (" + num + ")");
    var arr = fromNaipesToArray()
    var half = arr.slice(0,num);
    var otherhalf = arr.slice(num,53);

    console.log(half)
    console.log(otherhalf)

    for (var i = 0; i < num; i++) {
      arr[2*i] = otherhalf[i]
      arr[2*i+1] = half[i]
    }

    setTimeout(() => {  
      $(".ui-selected").each(function(index,element) {
        element.classList.remove("ui-selected");
      })
     }, 1500);

    
    sortDom(arr)
    
  });
});


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

  //Cuando deselecciono no se disabled!!s
  //check current se borra mnemonica! Tras el cambio ya solo se puede usar una vez??
