interface JQuery {
    slider(): JQuery,
    slider(options: object): JQuery,
    slider(method: 'option', optionName: string): any,
    slider(method: 'option', optionName: string, optionValue: any): JQuery,
    slider(method: 'value', value: number): JQuery
}