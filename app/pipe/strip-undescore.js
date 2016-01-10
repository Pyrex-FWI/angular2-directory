System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var StripUnderscorePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * Raise the value exponentially
             * Takes an exponent argument that defaults to 1.
             * Usage:
             *   value | exponentialStrength:exponent
             * Example:
             *   {{ 2 |  exponentialStrength:10}}
             *   formats to: 1024
             */
            StripUnderscorePipe = (function () {
                function StripUnderscorePipe() {
                }
                StripUnderscorePipe.prototype.transform = function (value, args) {
                    var len = args.length;
                    console.log(value);
                    if (len > 0) {
                        for (var _i = 0; _i < args.length; _i++) {
                            replace = args[_i];
                            value = value.split(replace).join(' ');
                        }
                    }
                    return value;
                };
                StripUnderscorePipe = __decorate([
                    core_1.Pipe({ name: 'stripUnderscore' }), 
                    __metadata('design:paramtypes', [])
                ], StripUnderscorePipe);
                return StripUnderscorePipe;
            })();
            exports_1("StripUnderscorePipe", StripUnderscorePipe);
        }
    }
});
//# sourceMappingURL=strip-undescore.js.map