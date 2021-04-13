var	util = require('util');
var	EventEmitter = require('events').EventEmitter;

var RingApi = require('ring-api');
class RingDoorbell extends EventEmitter {
	constructor(token) {
		this.token = token;
		this.debug = false;
		this.test = false;
		this.ringAPI = null;
		this.cameras = [];
	}
	async init(){
		this.ringAPI = new RingApi({
		  refreshToken: this.token,
		  cameraStatusPollingSeconds: 20,
		  cameraDingsPollingSeconds: 2
		});
		this.cameras = await ringApi.getCameras();
		this.cameras.forEach( (camera) => {
			camera.on("onMotionDetected", (eve) => {
				console.log("event received " + eve + "\t for:" + camera.id);
				this.emit("motion", camera.id, event);
			});
			console.log( "Camera " + camera.id + " hasSiren:" + camera.hasSiren + 
							" hasLight:" + camera.hasLight +
							" isDoorbot:" + camera.isDoorbot);
		});
	}
}
module.exports = RingDoorbell;
