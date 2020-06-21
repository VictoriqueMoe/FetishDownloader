import {ImageContainerTyping} from "model/Typings";
import {AjaxUtils} from "utils/Utils";
import {sha256} from 'js-sha256';

export class FetishImage {
    private readonly _res: string;
    private readonly _url: string;
    private readonly _tags: string[];
    private _title: string;
    private _actualImage: Blob = null;

    constructor(container: ImageContainerTyping) {
        this._res = container.res;
        this._title = container.title;
        this._url = container.url;
        this._tags = container.tags;
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
        return this._actualImage != null;
    }

    public get image(): Blob {
        if (!this.isInit) {
            throw new Error("Image has not been loaded yet");
        }
        return this._actualImage;
    }

    public get tags(): string[] {
        return this._tags;
    }

    public unloadImage(): void {
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

        if (this.isInit) {
            return Promise.resolve();
        }
        return AjaxUtils.loadImage(this.url).then(image => {
            this._actualImage = image;
            // Konachan has a thing about setting files with the same name, but not the same actual image, this will append a hash of the image as the file name, thus, removing duplicated files, and if there is a file with the same name that is really a dupe, then when you extract it, it will have the same hash
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
        });
    }
}