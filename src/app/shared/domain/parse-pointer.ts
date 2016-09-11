export class ParsePointer {
  private TYPE: 'Pointer';

  constructor(
    private className: string,
    private objectId: string
  ) { }

  toString(): string {
    return JSON.stringify({
      __type: this.TYPE,
      className: this.className,
      objectId: this.objectId
    });
  }
}
