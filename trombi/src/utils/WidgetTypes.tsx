import type {PropsWithChildren} from 'react';

export type WidgetType = string;
export type WithKey<T> = T & {key: string};

export type WidgetData = WithKey<{
  widgetType: WidgetType;
  widgetParams: any;
}>;

export type WidgetContainerFunctions = {
  removeWidget: (key: string) => void;
  moveWidget: (key: string, direction: 'up' | 'down') => void;
};

export type WidgetViewProps = PropsWithChildren<{
  data: WidgetData;
  title: string;
}>;

export type WidgetFrameProps = PropsWithChildren<{
  data: WidgetData;
  title: string;
  backgroundColor: string;
  foregroundColor: string;
}>;
