var mqtt_server = "ws://mqtt.cetools.org";
var client = mqtt.connect(mqtt_server + ":8080");


client.on("connect", function (topic) {
  console.log("We are connected to the server");
  client.subscribe("UCL/OPS/Garden/WST/dvp2/inTemp_C/#")  //+= include and #= everything 
  client.subscribe("UCL/OPS/Garden/WST/dvp2/outTemp_C/#")
  $(".sever").text("We are connected to the server");
  const dot = document.getElementById('statusDot');
            dot.style.backgroundColor = 'green';
        
});


client.on("message", function (topic, message) {

 if (topic.includes("inTemp_C")) {
//     console.log("true");
    $("#lead1").text(parseFloat(message).toFixed(2)+"°C");
 }
  if (topic.includes("outTemp_C")) {
//   console.log("true");
  $("#lead2").text(parseFloat(message).toFixed(2)+"°C"); // change text to number string to float,parseFloat()
 }
  console.log(topic,message.toString());
});



function getDateTime() {
  var now     = new Date(); 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds(); 
  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   
  if(hour.toString().length == 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
       minute = '0'+minute;
  }
  if(second.toString().length == 1) {
       second = '0'+second;
  }   
  var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}

// example usage: realtime clock
setInterval(function(){
  currentTime = getDateTime();
  document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);