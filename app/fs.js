System.register(['./src/core/metadata'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (metadata_1_1) {
                exportStar_1(metadata_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=fs.js.map