export type WidgetType = string;
export type WithKey<T> = T & { key: string };

export type WidgetData = WithKey<{
    widgetType: WidgetType;
    widgetParams: any;
}>;

export type WidgetContainerFunctions = {
    removeWidget: (key: string) => void;
    moveWidget: (key: string, direction: 'up' | 'down') => void;
};

export type WidgetViewProps = {
    data: WidgetData;
    containerFunctions: WidgetContainerFunctions;
};