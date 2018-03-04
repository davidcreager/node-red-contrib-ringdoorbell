var	util = require('util');
var	EventEmitter = require('events').EventEmitter;

var RingApi = require('ring-api');


function RingDoorbell(email, password) {

	var self = this;

	this.email = email;
	this.password = password;

	this.debug = modes.debug || false;
	this.test = modes.test || false;

  this.job = null;
  this.timers = [];

	EventEmitter.call(this);

  this.init = function() {
		const ringApi =  RingApi( {
				email: this.email,
				password: this.password,
				poll: true,
		});

		const logActivity = activity => {
			self.emit("ringactivity", activity);
			self.emit(activity);
		}
		ringApi.events.on('activity', logActivity);
	}
}


util.inherits(RingDoorbell, EventEmitter);
module.exports = RingDoorbell;

/**



// format sunrise time from the Date object
var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();

// get position of the sun (azimuth and altitude) at today's sunrise
var sunrisePos = SunCalc.getPosition(times.sunrise, 51.5, -0.1);

// get sunrise azimuth in degrees
var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
*/
