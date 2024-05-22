export class ListCharacteristicProductDTO {
  constructor(public name: string, public description: string) {}
}

export class ListImageProductDTO {
  constructor(public url: string, public description: string) {}
}

export class ListProductsDTO {
  constructor(
    public id: string,
    public name: string,
    public characteristics: ListCharacteristicProductDTO[],
    public images: ListImageProductDTO[],
  ) {}
}