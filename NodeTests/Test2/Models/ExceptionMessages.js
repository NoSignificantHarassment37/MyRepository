export class ExceptionMessage{
    constructor(){}
    static isInvalidNumber(parameter){
        return `El parametro '${parameter}' debe ser de tipo 'Number' y no contener decimales.`;
    }
}