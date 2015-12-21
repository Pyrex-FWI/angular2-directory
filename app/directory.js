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
                Directory.prototype.getName = function () {
                    return this.name;
                };
                Directory.prototype.getPathName = function () {
                    return this.pathName;
                };
                Directory.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                Directory.prototype.setChildren = function (child) {
                    this.child = child;
                };
                return Directory;
            })();
            exports_1("Directory", Directory);
        }
    }
});
//# sourceMappingURL=directory.js.map