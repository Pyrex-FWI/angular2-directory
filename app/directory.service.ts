import {Injectable} from 'angular2/core';
import {Directory} from './directory';
@Injectable()
export class DirectoryService {

    private getUri(value?: string): string{
        var base = 'http://localhost:8181/dir';
        if (!!value) {
            base += '?path=' + value;
        }
        return base;
    }

    /**
     * Simulate a slowly resposnse
     * @returns {Promise<T>}
     */
    getDirectories(value?: string) : Promise<Directory[]>{
        //return [{ name: "2002", pathName: "path/to/dir"}, { name: "2003", pathName: "path/to/dir2"} ];
            console.log('Directory service getDirectory');
            console.log(this.getUri(value));
            this.fetchPromise = window.fetch(this.getUri(value))
                .then((result:any) => result.json())
                .then((json:any) => {
                    return json.map(dir => this.parseDir(dir))
                });
        //}
        return this.fetchPromise;
    }

    /**
     *
     * @param serverDir
     * @returns {Directory}
     */
    parseDir(serverDir) : Directory {
        return new Directory(serverDir);
    }

}