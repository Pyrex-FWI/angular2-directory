System.register([], function(exports_1) {
    var Directory;
    return {
        setters:[],
        execute: function() {
            Directory = (function () {
                function Directory(serverData) {
                    this.expanded = false;
                    this.childLoaded = false;
                    this.name = serverData.name;
                    this.pathName = serverData.pathName;
                }
                Directory.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                    this.loadChildren();
                };
                Directory.prototype.loadChildren = function () {
                };
                return Directory;
            })();
            exports_1("Directory", Directory);
        }
    }
});
//# sourceMappingURL=directory.js.map