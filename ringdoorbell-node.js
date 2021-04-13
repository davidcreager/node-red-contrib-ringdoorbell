module.exports = function(RED) {
	const RingDoorbell = require('./lib/ringdoorbell');
	function RingDoorbellNode(config) {
    	RED.nodes.createNode(this, config);
		var node = this;
    	node.modes = {test: config.testmode, debug: config.verbose}
    	node.name = config.name
    	node.topic = config.topic
    	node.token = config.token
		if (!node.token) {
			node.error("No email or password set.")
		}
    	node.log("Gathering Ring device info...")
		node.ringDevices = new RingDoorbell(this.token)
    	node.ringDevices.on("motion", function(camera,event) {
    		let msg = {}
    		msg.topic = node.topic || node.name || 'ring event'
    		msg.payload = {camera: camera, event: event};
			node.log("Injecting ring event");
    		// send out the message to the rest of the workspace.
    		node.send(msg);
    	});

	    if (node.modes.debug) {
    		node.ringDevices.on("debug", function(msg) {
				node.log(msg);
    		});
    	}

    	// Add any extra configuration to suncalc here
    	node.ringDevices.init()

    	node.on("close", function() {
			// Called when the node is shutdown - eg on redeploy.
			// Allows ports to be closed, connections dropped etc.
			// eg: this.client.disconnect();
		});
	}

	// Register the node by name. This must be called before overriding any of the
	// Node functions.

	RED.nodes.registerType("ring doorbell", RingDoorbellNode );

}
