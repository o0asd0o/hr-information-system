import { ApiBody } from "@nestjs/swagger";

export const ApiCustomFileBody = (fileName: string = 'file', ...otherFields: string[]):
    MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const otherProperties = otherFields.reduce((accumulator: any, current: string) => {
        return {...accumulator, [current]: {
            type: "string",
            required: current.includes("_")
        }};
    }, {});

    ApiBody({ schema: {
        type: "object",
        properties: {
            [fileName]: { type: "string", format: "binary" },
            ...otherProperties,
        }
    }})(target, propertyKey, descriptor);
}