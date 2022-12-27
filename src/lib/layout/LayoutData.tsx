import { LayoutElementNames } from "./layoutElementNames";

class LayoutData {
    private layoutElementRefs: { [key: string]: React.RefObject<Element> } = {};
    private static instance: LayoutData;

    private constructor() { }

    static initialize() {
        if (!this.instance) this.instance = new LayoutData();
    }

    public static getInstance() {
        return LayoutData.instance;
    }

    public storeElementRef({
        elementName,
        element,
        key
    }: {
        elementName: LayoutElementNames,
        element: React.RefObject<Element>,
        key?: string,
    }) {
        const elementKey = LayoutData.getLayoutElementNameKey({ elementName, key });
        this.layoutElementRefs[elementKey] = element;
    }

    public getElementRef({
        elementName,
        key
    }: {
        elementName: LayoutElementNames,
        key?: string
    }) {
        const elementKey = LayoutData.getLayoutElementNameKey({ elementName, key });
        return this.layoutElementRefs[elementKey]
    }

    public clearElementRefStore() {
        this.layoutElementRefs = {};
    }

    public static getLayoutElementNameKey({
        elementName,
        key
    }: {
        elementName: LayoutElementNames,
        key?: string
    }): string {
        const nameKey = `${elementName}_${key}`;
        return nameKey;
    }
}

export default LayoutData;