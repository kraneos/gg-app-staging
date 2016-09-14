export class ParseQueryOptions {
    limit: number;
    skip: number;
    include: string[];
    where: ParseConstraint[];
}

export class ParseConstraint {
    field: string;

}
