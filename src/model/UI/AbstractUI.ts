import {UI} from "./UI";

export abstract class AbstractUI implements UI {
    public constructor(protected readonly doc: Document) {
    }

    public abstract buildUI(): void;
}