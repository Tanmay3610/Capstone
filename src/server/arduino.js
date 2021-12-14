// // const {Board, Servo} = require("johnny-five");
// // const board = new Board({
// //     port: "Com3"
// // });
// // const controller = "PCA9685";

// // board.on("ready", () => {
// //   console.log("Connected");

// //   // Initialize the servo instance
// //   const a = new Servo({
// //     controller,
// //     pin: 10,
// //   });

// // //  const b = new Servo({
// //   //  controller,
// //     //range: [0, 180],
// //     //pin: 1,
// //   //});

// //   a.to(0);
// //   a.step(45)
// //   a.to(360);
  
// // });

// const {Board, Servo} = require("johnny-five");
// const board = new Board({
//       port: "Com3"
//  });

// board.on("ready", () => {
//   const servo = new Servo(10);
//   board.repl.inject({
//     servo
//   });
//   servo.sweep();
// });


var five = require("johnny-five");
var board = new five.Board({
  port: "Com3"
});

board.on("ready", function() {

  var gps = new five.GPS({
    pins: {rx: 11, tx: 10}
  });
  console.log(gps.latitude);
  console.log(gps.longitude);
  // If latitude, longitude change log it
  gps.on("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    console.log("  longitude  : ", this.longitude);
    console.log("  altitude   : ", this.altitude);
    console.log("--------------------------------------");
  });
  // If speed, course change log it
  gps.on("navigation", function() {
    console.log("navigation");
    console.log("  speed   : ", this.speed);
    console.log("  course  : ", this.course);
    console.log("--------------------------------------");
  });
});