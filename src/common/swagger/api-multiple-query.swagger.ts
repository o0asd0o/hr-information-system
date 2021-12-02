import { ApiBody, ApiQuery } from "@nestjs/swagger";

export const ApiCustomQuery = (...queryFields: string[]):
    MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const queryProperties = queryFields.reduce((accumulator: any, current: string) => {
        return {...accumulator, [current]: {
            type: "string"
        }};
    }, {});

    ApiQuery({
        schema: {
            type: "object",
            properties: {
                ...queryProperties
            }
        },
        name: "queries"
    })(target, propertyKey, descriptor);
}