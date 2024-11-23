export interface Attributes {
  id: number;
  title: string;
}

export interface AttributeGroup {
  id: number;
  title: string;
}

export interface Tag {
  id: number;
  title: string;
}

export interface Service {
  id: number;
  title: string;
  cost: number;
  groupId: number;
  description: string;
  createdAt: string;
}

export interface Category {
  id: number;
  title: string;
}
