export interface Product {
  id: number;
  title: string;
  price: number;
  count: number;
  name: string;
  description?: string;
  created_at: string;
  media?: Media[];
}

export interface ProductInfo {
  id: number;
  title: string;
  price: number;
  count: number;
  name: string;
  description: string;
  media: Media[];
  attributes: AttributeValue[];
  tags: string[];
}

export interface AttributeIndex {
  attributes: Attribute[];
  categories: Category[];
}

export interface ModalProps {
  id: string;
  name: string;
  title: string;
}

export interface Attribute {
  id: number;
  title: string;
  category_id: number;
  type: string;
  is_filterable: boolean;
}

export interface AttributeValue {
  id: number;
  title: string;
  attribute_value: string;
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
  url: string;
  parent_id?: number;
  categories?: Category[];
  description: string;
  title_sequence: string;
}

export interface Media {
  name: string;
  size: number;
  order: number;
  extension: string;
  uploaded_at: string;
}
