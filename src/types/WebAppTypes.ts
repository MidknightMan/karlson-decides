export interface Choice {
  id: string;
  name: string;
  attributes: Attribute[];
  imgSrc?: string;
}

export interface Attribute {
  id: string;
  name: string;
  weight: number;
}
