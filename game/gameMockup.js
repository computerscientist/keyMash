
dojo.require('widgets.SoundGame');

function init() {

    console.log("place widget");
    var sg = new widgets.SoundGame({schemaLocation: "protoSchema.json"});
    dojo.place(sg.domNode, 'activity');
    console.log("placed");

}

dojo.ready(init);
