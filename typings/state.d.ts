// an example of custom typings file with a vehicle
declare interface IDate {
    readonly date: number;
    readonly iso: string;
    readonly type: DateType;
}

declare interface IEvent {
    readonly Date: IDate;
    readonly Event: string;
}