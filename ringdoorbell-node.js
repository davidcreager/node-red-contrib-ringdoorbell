module.exports = function(RED) {

	var RingDoorbell = require('./lib/ringdoorbell');


	// The main node definition - most things happen in here
	function RingDoorbellNode(config) {

    	// Create a RED node
    	RED.nodes.createNode(this, config);

		var node = this;

    	// Store local copies of the node configuration (as defined in the .html)
    	node.modes = {test: config.testmode, debug: config.verbose}
    	node.name = config.name
    	node.topic = config.topic

    	var credentials = this.credentials
      if ((credentials) && (credentials.hasOwnProperty("email")) && (credentials.hasOwnProperty("password"))) {
				node.email = credentials.email
				node.password = credentials.password
      } else {
            node.error("No email or password set.")
      }

    	node.log("Gathering Ring device info...")
    	//node.events = new SunEvents(this.latitude, this.longitude, this.modes)
			node.events = new RingDoorbell(this.email, this.password)

    	node.events.on("ringactivity", function(activity) {
    		var msg = {}
    		msg.topic = node.topic || node.name || 'ring event'
    		msg.payload = activity

			node.log("Injecting ring event");
    		// send out the message to the rest of the workspace.
    		node.send(msg);
    	});

	    if (node.modes.debug) {
    		node.events.on("debug", function(msg) {
				node.log(msg);
    		});
    	}

    	// Add any extra configuration to suncalc here
    	node.events.init()

    	node.on("close", function() {
			// Called when the node is shutdown - eg on redeploy.
			// Allows ports to be closed, connections dropped etc.
			// eg: this.client.disconnect();
			node.events.stop();
		});
	}

	// Register the node by name. This must be called before overriding any of the
	// Node functions.

	var credentials = {
        email: {type: "text"},
        password: {type: "text"}
    }

	RED.nodes.registerType("ring doorbell", RingDoorbellNode, { credentials: credentials } );

}
