const token = ""
const RingDoorbell = require('./lib/ringdoorbell');
const ringDevices = new RingDoorbell(token);
ringDevices.on("motion", (camera,event) => {
	console.log(camera.id + "\t event=" + event + "\t camera=" + camera);
});
ringDevices.init();
console.log("ready hopefully waiting for events");