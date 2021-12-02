
export const queryFindOneByIdentifier = (identifier: number) => {
    return {
        where: {
            identifier,
            deleted: false,
        }
    }
}

export const queryFindOneByIdentifierObject = (whereObject: any) => {
    const { identifier } = whereObject;
    return {
        where: {
            identifier,
            deleted: false,
        }
    }
}
