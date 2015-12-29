import {Injectable} from 'angular2/core';
import {FsItem, FsDirectory} from './file-system';

@Injectable()
export class DirectoryService {

    private baseUrl: string = "http://localhost:8181";

    public moveStack = [];
    public deleteStack = [];

    private getDirectoryUri(endpoint:string, value?: string): string{
        var base = this.baseUrl + endpoint;
        if (!!value) {
            base += '?path=' + value;
        }
        return base;
    }

    public getStreamUri(item:FsItem): string {
        return 'http://localhost:8182/stream?file=' + item.getPathName();
    }

    /**
     * Simulate a slowly resposnse
     * @returns {Promise<FsDirectory>}
     */
    getDirectories(value?: string) : Promise<FsDirectory[]>{
        console.log('Directory service getDirectory');
        console.log(this.getDirectoryUri('/dirs',value));
        return window.fetch(this.getDirectoryUri('/dirs', value))
            .then((result:any) => result.json())
            .then((json:any) => {
                return json.map(dir => this.parseFsDir(dir))
            });
    }

    /**
     *
     * @param serverFs
     * @returns {FsDirectory}
     */
    parseFsDir(serverFs) : FsDirectory {
        return new FsDirectory(serverFs);
    }

    /**
     *
     * @param serverFs
     * @returns {FsItem}
     */
    parseFsItem(serverFs) : FsItem {
        return new FsItem(serverFs);
    }

    getDirectoryContent(dir: FsItem): Promise<FsItem> {
        console.log('Directory service getDirectoryContent');
        return window.fetch(this.getDirectoryUri('/dir-content', dir.getPathName()))
            .then((result:any) => result.json())
            .then((json:any) => {
                return json.map(dir => this.parseFsItem(dir))
            });
    }

    /**
     *
     * @param dir
     * @returns {any}
     */
    getDirectoryGenre(dir: FsItem): Promise<FsItem> {
        console.log('Directory service getDirectoryContent');
        return window.fetch(this.getDirectoryUri('/dir-genre', dir.getPathName()))
            .then((result:any) => result.json());
    }

    applyGenreYear(dir: FsItem, genre, year): void {
        console.log(genre);
        console.log(year);
        url = this.baseUrl + '/set-matadata?path='+dir.getPathName()+'&g='+genre+'&y='+year;
        return window.fetch(url,  {
            mode: 'no-cors'
        });
    }

    applyMove():void {
        if (this.moveStack.length === 0) {
            return;
        }
        dir = this.moveStack.shift();
        console.log(dir);
        url = this.baseUrl + '/move?path='+dir.pathName;
        console.log(url);
        window.fetch(url,  {
            mode: 'no-cors'
        })
        .then((result:any) => console.log(result.json()))
        .then((json:any) => {
            if (this.moveStack.length > 0) {
                return this.applyMove();
            }
        });
        Lockr.set('moveToCollection', this.moveStack);
    }

    applyDelete():void {
        if (this.deleteStack.length === 0) {
            return;
        }
        dir = this.deleteStack.shift();
        console.log(dir);
        url = this.baseUrl + '/delete?path='+dir.pathName;
        console.log(url);
        window.fetch(url,  {
                mode: 'no-cors'
            })
            .then((result:any) => console.log(result.json()))
            .then((json:any) => {
                if (this.deleteStack.length > 0) {
                    return this.applyDelete();
                }
            });
        Lockr.set('rmCollectionQueue', this.deleteStack);

    }
}