import {ImageContainerTyping} from "Typings";
import {AjaxUtils} from "Utils";
import {sha256} from 'js-sha256';

export class FetishImage {
    private readonly _res: string;
    private readonly _url: string;
    private _title: string;
    private _isInit: boolean;
    private _actualImage: Blob;

    constructor(container: ImageContainerTyping) {
        this._res = container.res;
        this._title = container.title;
        this._url = container.url;
        this._isInit = false;
    }

    public get res(): string {
        return this._res;
    }

    public get url(): string {
        return this._url;
    }


    public get title(): string {
        return this._title;
    }

    public get isInit(): boolean {
        return this._isInit;
    }

    public get image(): Blob {
        if (!this._isInit) {
            throw new Error("Image has not been loaded yet");
        }
        return this._actualImage;
    }

    public unloadImage(): void {
        this._isInit = false;
        this._actualImage = null;
    }

    public loadImage(): Promise<void> {
        function getResult(reader: FileReader): Promise<string | ArrayBuffer> {
            return new Promise((resolve, reject) => {
                reader.onload = function (): void {
                    resolve(this.result);
                };
                reader.onerror = reader.onabort = reject;
            });
        }

        if (this._isInit) {
            return Promise.resolve();
        }

        const FETCH_TIMEOUT = 20000;
        let didTimeOut = false;

        return new Promise<Blob>((resolve, reject) => {
            const timeout = setTimeout(() => {
                didTimeOut = true;
                reject(new Error('Request timed out'));
            }, FETCH_TIMEOUT);
            fetch(this._url).then(response => {
                // Clear the timeout as cleanup
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if(!response.ok){
                        reject("unable to load");
                        return;
                    }
                    resolve(response.blob());
                }
            }).catch(err => {
                if (didTimeOut) {
                    return;
                }
                reject(err);
            });
        }).then(image => {
            if(image.size === 0){
                throw new Error("unable to load");
            }
            this._actualImage = image;
            let reader = new FileReader();
            reader.readAsBinaryString(image);
            return getResult(reader);
        }).then(value => {
            let hashofImage = sha256(value);
            if (!this.title.includes(`_${hashofImage}`)) {
                let titleSplit = this.title.split(".");
                let extension = titleSplit.pop();
                this._title = `${titleSplit.join("")}_${hashofImage}.${extension}`;
            }
            this._isInit = true;
        });
    }
}