var Remote = require('remote');
var dialog = Remote.require('dialog');
var Url = require('fire-url');

Polymer({
    publish: {
        sceneList: [],
        platform: [
            {name:"PC",value:"PC"},
            {name:"Mobile",value:"Mobile"},
        ],
        platformConfig: [
            {name:"Builder.js",value:"Builder.js"},
            {name:"Builder.Platform",value:"Builder.Platform"},
        ],
        defaultPlatformConfig: "Builder.Platform",
        defaultPlatform: "Mobile",
        isDebug: true,
        defaultScene: "",
        defaultDistPath: "",
        projectName: "",
    },

    created: function () {
        this.ipc = new Fire.IpcListener();
        this.allScene = [];
    },

    attached: function () {
        Fire.sendToCore('asset-db:build-settings:getLibrarylist');
        this.ipc.on('asset-db:build-settings:SceneList', function ( results ) {
            this.allScene = [];
            for ( var i = 0; i < results.length; ++i ) {
                var item = results[i];
                this.allScene.push( { name: item.url, value: item.uuid } );
            }
            this.sceneList = this.allScene;
            this.defaultScene = this.sceneList[0].value;
        }.bind(this) );

    },

    chooseDistPath: function () {
        dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections' ]},function (res) {
            if (res) {
                this.defaultDistPath = res;
            }
        }.bind(this));
    },
});
