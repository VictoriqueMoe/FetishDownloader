import { ImageContainerTyping } from "Typings";
export declare class FetishImage {
    private readonly _res;
    private readonly _url;
    private readonly _title;
    private _isInit;
    private _actualImage;
    constructor(container: ImageContainerTyping);
    readonly res: string;
    readonly url: string;
    readonly title: string;
    readonly isInit: boolean;
    readonly image: Blob;
    loadImage(): Promise<void>;
}
