import {FetishImage} from "./FetishImage";
import {Main} from "./Main";
import {ObjectUtil} from "./Utils";

export module ImageLoader {
    export let isBatch: boolean;
    export let batch: FetishImage[];

    async function delay(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    export async function loadImages(_images: FetishImage[], batchLimit: number): Promise<void> {
        let count = 0;
        isBatch = _images.length > batchLimit;
        batch = [];
        let failCount: Map<FetishImage, number> = new Map();
        let batchNum: number = 0;


        async function inner(images: FetishImage[], count: number): Promise<void> {
            let failedImages: FetishImage[] = [];
            for (let im of images) {
                if (!im.isInit) {
                    try {
                        count++;
                        await delay(50);
                        await im.loadImage();
                        Main.setLabel(`${count} out of ${images.length} done`);
                        if (isBatch) {
                            batch.push(im);
                            if (count % batchLimit === 0) {
                                batchNum++;
                                let of: number = Math.floor(Math.round(images.length / batchLimit) * batchLimit);
                                let ofStr: string = of.toString()[0];
                                if (images.length % batchLimit !== 0 && images.length % batchLimit > batchLimit) {
                                    ofStr = String(parseInt(ofStr) + 1);
                                }
                                await Main.doDownloadZip(batch, `${batchNum} of ${ofStr}`);
                                for (let i: number = 0; i < batch.length; i++) {
                                    batch[i].unloadImage();
                                }
                                batch = [];
                            }
                        }
                    } catch (e) {
                        failedImages.push(im);
                        let failcount = -1;
                        if (failCount.has(im)) {
                            let failNum = failCount.get(im);
                            failCount.set(im, failNum++);
                            failcount = failCount.get(im);
                        } else {
                            failCount.set(im, 0);
                        }
                        if (failcount > 5) {
                            ObjectUtil.removeObjectFromArray(im, failedImages);
                        } else {
                            await delay(4000);
                        }
                    }
                }
            }
            if (failedImages.length > 0) {
                count = 0;
                Main.setLabel("Re-retrying failed images...");
                await inner(failedImages, count);
                failedImages = [];
            }
        }
        return inner(_images, count);
    }
}