import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'stripUnderscore'})
export class StripUnderscorePipe implements PipeTransform {
    transform(value:string, args:string[]) : any {
        var len = args.length;
        console.log(value);

        if (len > 0 ) {
            for( replace of args) {
                value = value.split(replace).join(' ');
            }
        }
        return value;
    }
}