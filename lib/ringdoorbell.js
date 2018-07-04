var	util = require('util');
var	EventEmitter = require('events').EventEmitter;

var RingApi = require('ring-api');

function RingDoorbell(email, password) {

	var self = this;

	this.email = email;
	this.password = password;

	this.debug = false;
	this.test = false;

  this.job = null;
  this.timers = [];

	EventEmitter.call(this);

  this.init = function() {
		const ringApi = RingApi( {
				email: this.email,
				password: this.password,
				poll: true,
		});
		ringApi.then(function(r){
			const logActivity = activity => {
				self.emit("ringactivity", activity);
				self.emit(activity);
			}
			console.log(ringApi);
			r.events.on('activity', logActivity);
		}).catch(function(err){
			console.log(err);
		})
	}
}

util.inherits(RingDoorbell, EventEmitter);
module.exports = RingDoorbell;
