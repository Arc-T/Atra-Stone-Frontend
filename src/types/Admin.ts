export interface Products {
  id: number;
  title: string;
  price: number;
  count: number;
  name: string;
  description?: string;
  created_at: string;
  product_media?: Media[];
}

export interface ModalProps {
  id: string;
  name: string;
  title: string;
}

export interface Attributes {
  id: number;
  title: string;
}

export interface AttributeValue {
  id: number;
  title: string;
  attribute_value: string;
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

export interface ProductMedia {
  id: number;
  name: string;
  isHero: boolean;
  extension: string;
  uploadedAt: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface ProductCreateDetails {
  tags: Tag[];
  services: Service[];
  categories: Category[];
  attributes_group: AttributeGroup[];
}

export interface Media {
  name: string;
  size: number;
  order: number;
  extension: string;
  uploaded_at: string;
}
