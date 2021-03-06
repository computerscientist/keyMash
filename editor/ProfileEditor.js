dojo.provide('editor.ProfileEditor');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('editor.ProfileEditor', [ dijit._Widget, dijit._Templated ], {
    templatePath: dojo.moduleUrl("editor", "ProfileEditor.html"),
    widgetsInTemplate: true,
    
    profile: {},
    
    gridLayout: [{ name: 'Profile Name', field: 'name', width: "50%" },
                    { name: 'Id', field: '_id', width: "50%" } ],
    profileGrid: {},

    postCreate: function() {
        this.inherited(arguments);
        
        this.initGrid();
        this.init();  
        
    },
    
    initGrid: function() {
    
        uow.getDatabase({database: 'Duncan', 
            collection: 'soundgame_profiles'}).addCallback(dojo.hitch(this, function(db) {
                    
                    this.profileGrid = new editor.GridEditor({store:db, gridLayout:this.gridLayout});
                    dojo.place(this.profileGrid.domNode, this.gridGoesHere);
                    this.profileGrid.startup();
                    this.connect(this.profileGrid, 'editItem', this.openProfile);
                    
                    //this.profileGrid.save = dojo.hitch(this, this.customSaveMethod);
        }));
    },
    
    startup: function() {
        this.profileGrid.startup();
    },

    init: function() {

        console.log("init");

        var topRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
        var middleRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
        var bottomRowKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
        
        dojo.forEach(topRowKeys, 
            dojo.hitch(this, function(key) {
                var keyNode = dojo.create('span', {innerHTML:key, id:key});
                dojo.addClass(keyNode, 'keyblock');
                dojo.place(keyNode, this.keys_available);
                dojo.connect(keyNode, 'onclick', this, dojo.hitch(this, function() {
                    this.selectKey(key);
                }));
                
                var toAddNode = dojo.create('span', {innerHTML:key, id:key+'_toAdd'});
                dojo.addClass(toAddNode, 'invis');
                dojo.addClass(toAddNode, 'keyblock');
                dojo.place(toAddNode, this.keys_used);
            })
        );
        
        dojo.place('</br>', this.keys_available);
        dojo.place('</br>', this.keys_used);
        
        dojo.place('<span>&nbsp&nbsp&nbsp&nbsp</span>', this.keys_available);
        dojo.place('<span>&nbsp&nbsp&nbsp&nbsp</span>', this.keys_used);
        
        dojo.forEach(middleRowKeys, 
            dojo.hitch(this, function(key) {
                var keyNode = dojo.create('span', {innerHTML:key, id:key});
                dojo.addClass(keyNode, 'keyblock');
                dojo.place(keyNode, this.keys_available);
                dojo.connect(keyNode, 'onclick', this, dojo.hitch(this, function() {
                    this.selectKey(key);
                }));
                
                var toAddNode = dojo.create('span', {innerHTML:key, id:key+'_toAdd'});
                dojo.addClass(toAddNode, 'invis');
                dojo.addClass(toAddNode, 'keyblock');
                dojo.place(toAddNode, this.keys_used);
            })
        );    
        
        dojo.place('</br>', this.keys_available);
        dojo.place('</br>', this.keys_used);
        
        dojo.place('<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>', this.keys_available);
        dojo.place('<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>', this.keys_used);
        
        dojo.forEach(bottomRowKeys, 
            dojo.hitch(this, function(key) {
                var keyNode = dojo.create('span', {innerHTML:key, id:key});
                dojo.addClass(keyNode, 'keyblock');
                dojo.place(keyNode, this.keys_available);
                dojo.connect(keyNode, 'onclick', this, dojo.hitch(this, function() {
                    this.selectKey(key);
                }));
                
                var toAddNode = dojo.create('span', {innerHTML:key, id:key+'_toAdd'});
                dojo.addClass(toAddNode, 'invis');
                dojo.addClass(toAddNode, 'keyblock');
                dojo.place(toAddNode, this.keys_used);
            })
        );
        
        console.log("done");
    
    },
    
    selectKey: function(key) {
        console.log(key);
        if(dojo.hasClass(dojo.byId(key), 'selected')) {
            dojo.removeClass(dojo.byId(key), 'selected');
            dojo.addClass(dojo.byId(key+'_toAdd'), 'invis');
        } else {
            dojo.addClass(dojo.byId(key), 'selected');
            dojo.removeClass(dojo.byId(key+'_toAdd'), 'invis');
        }
        
    }

});
