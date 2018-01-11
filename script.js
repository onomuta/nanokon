navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFailure);
var midi = null;
var inputs = [];
var outputs = [];
var output = null;
var chs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var ch = 1;

function onMIDISuccess(m){
  midi = m;
  var it = midi.inputs.values();
  for(var o = it.next(); !o.done; o = it.next()){
    inputs.push(o.value);
  }
  var ot = midi.outputs.values();
  for(var o = ot.next(); !o.done; o = ot.next()){
    outputs.push(o.value);
  }
  
  output = outputs[0];
  outputs.forEach(function(element, index) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(element.name));
    option.setAttribute('value', index);
    document.getElementById('select-midi-output-device').appendChild(option);
  });
  document.getElementById('select-midi-output-device').onchange = function() {
    output = outputs[this.value];
  };
  
  for(var cnt=0;cnt < inputs.length;cnt++){
    inputs[cnt].onmidimessage = onMIDIEvent;
  }
}



chs.forEach(function(value, index) {
  var option = document.createElement('option');
  option.appendChild(document.createTextNode(value));
  option.setAttribute('value', index);
  document.getElementById('select-midi-output-ch').appendChild(option);
});
document.getElementById('select-midi-output-ch').onchange = function() {
  ch = chs[this.value];
};



function onMIDIEvent(e){
  if(e.data[2] != 0){ 
    // なにかをうけとったときの処理
    // console.log(e.data[2]);
    // console.log(e.data[1]);
  }
}

function onMIDIFailure(){
  console.log("munen!");
};

function sendCC(cc, val){
  // if(outputs.length > 0){
  //   outputs[0].send([0xB0, cc, val]);
  // }
  if(output){
    output.send([0xB0 + ch-1, cc, val]);
  }
}

// KNOB
$(function() {
  $(".knob").trigger(
    'configure',{
      min:0,
      max:127,
      step:1,
      angleOffset:210,
      angleArc:300,
      width:60,
      height:60,
      displayInput:false,
      lineCap:'round',
      thickness:0.4,
    }
  );
});
$("#knob1").knob({
  'change' : function (v) {sendCC(16, Math.round(v))},
});
$("#knob2").knob({
  'change' : function (v) {sendCC(17, Math.round(v))},
});
$("#knob3").knob({
  'change' : function (v) {sendCC(18, Math.round(v))},
});
$("#knob4").knob({
  'change' : function (v) {sendCC(19, Math.round(v))},
});
$("#knob5").knob({
  'change' : function (v) {sendCC(20, Math.round(v))},
});
$("#knob6").knob({
  'change' : function (v) {sendCC(21, Math.round(v))},
});
$("#knob7").knob({
  'change' : function (v) {sendCC(22, Math.round(v))},
});
$("#knob8").knob({
  'change' : function (v) {sendCC(23, Math.round(v))},
});

// SLIDER
$( ".slider" ).slider({
  orientation: "vertical",
  max: 127,
  range: "min",
});
$( "#slider1" ).slider({
  slide: function( event, ui ) {
    sendCC(0, Math.round(ui.value));
  }
});
$( "#slider2" ).slider({
  slide: function( event, ui ) {
    sendCC(1, Math.round(ui.value));
  }
});
$( "#slider3" ).slider({
  slide: function( event, ui ) {
    sendCC(2, Math.round(ui.value));
  }
});
$( "#slider4" ).slider({
  slide: function( event, ui ) {
    sendCC(3, Math.round(ui.value));
  }
});
$( "#slider5" ).slider({
  slide: function( event, ui ) {
    sendCC(4, Math.round(ui.value));
  }
});
$( "#slider6" ).slider({
  slide: function( event, ui ) {
    sendCC(5, Math.round(ui.value));
  }
});
$( "#slider7" ).slider({
  slide: function( event, ui ) {
    sendCC(6, Math.round(ui.value));
  }
});
$( "#slider8" ).slider({
  slide: function( event, ui ) {
    sendCC(7, Math.round(ui.value));
  }
});

//BTN
var pressedBtn = -1;

$( "#btn1A" ).mousedown(function() { pushBtn(32,this) });
$( "#btn2A" ).mousedown(function() { pushBtn(33,this) });
$( "#btn3A" ).mousedown(function() { pushBtn(34,this) });
$( "#btn4A" ).mousedown(function() { pushBtn(35,this) });
$( "#btn5A" ).mousedown(function() { pushBtn(36,this) });
$( "#btn6A" ).mousedown(function() { pushBtn(37,this) });
$( "#btn7A" ).mousedown(function() { pushBtn(38,this) });
$( "#btn8A" ).mousedown(function() { pushBtn(39,this) });
$( "#btn1B" ).mousedown(function() { pushBtn(48,this) });
$( "#btn2B" ).mousedown(function() { pushBtn(49,this) });
$( "#btn3B" ).mousedown(function() { pushBtn(50,this) });
$( "#btn4B" ).mousedown(function() { pushBtn(51,this) });
$( "#btn5B" ).mousedown(function() { pushBtn(52,this) });
$( "#btn6B" ).mousedown(function() { pushBtn(53,this) });
$( "#btn7B" ).mousedown(function() { pushBtn(54,this) });
$( "#btn8B" ).mousedown(function() { pushBtn(55,this) });
$( "#btn1C" ).mousedown(function() { pushBtn(64,this) });
$( "#btn2C" ).mousedown(function() { pushBtn(65,this) });
$( "#btn3C" ).mousedown(function() { pushBtn(66,this) });
$( "#btn4C" ).mousedown(function() { pushBtn(67,this) });
$( "#btn5C" ).mousedown(function() { pushBtn(68,this) });
$( "#btn6C" ).mousedown(function() { pushBtn(69,this) });
$( "#btn7C" ).mousedown(function() { pushBtn(70,this) });
$( "#btn8C" ).mousedown(function() { pushBtn(71,this) });


$( "#func1" ).mousedown(function() { pushBtn(58,this) });
$( "#func2" ).mousedown(function() { pushBtn(59,this) });
$( "#func3" ).mousedown(function() { pushBtn(46,this) });
$( "#func4" ).mousedown(function() { pushBtn(60,this) });
$( "#func5" ).mousedown(function() { pushBtn(61,this) });
$( "#func6" ).mousedown(function() { pushBtn(62,this) });
$( "#func7" ).mousedown(function() { pushBtn(43,this) });
$( "#func8" ).mousedown(function() { pushBtn(44,this) });
$( "#func9" ).mousedown(function() { pushBtn(42,this) });
$( "#func10").mousedown(function() { pushBtn(41,this) });
$( "#func11").mousedown(function() { pushBtn(45,this) });


function pushBtn(cc,t){
  $(t).addClass("active");
  sendCC(cc, 127);
  pressedBtn = cc;
}

$("body").mouseup(function() {
  releaseBtn()
});
$("body").mouseleave(function(){
  releaseBtn()
});

function releaseBtn(){
  if(pressedBtn != -1 ){
    sendCC(pressedBtn, 0);
    $(".btn").removeClass("active");
    pressedBtn = -1;
  }
}
