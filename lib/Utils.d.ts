export declare enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    OPTIONS = "OPTIONS"
}
export declare let QueryString: {
    [key: string]: any;
};
export declare class AjaxUtils {
    static addParameter(url: string, parameterName: string, parameterValue: string, atStart?: boolean): string;
    static loadXHR(url: string): Promise<Blob>;
    static downloadViaJavaScript(url: string, data: any, fileName?: string, mediaType?: string, type?: HTTP_METHOD): Promise<void>;
}
export declare class MathUtil {
    static range(start: number, end: number): Array<number>;
}
