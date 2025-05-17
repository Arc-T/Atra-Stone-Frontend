export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  name: string;
  description?: string;
  created_at: string;
  media: Media[];
}

export interface ProductInfo {
  id: number;
  title: string;
  price: number;
  quantity: number;
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
  values: AttributeValue[];
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

export interface Category {
  id: number;
  title: string;
  url: string;
  parent_id?: number;
  categories?: Category[];
  description: string;
  title_sequence?: string;
  children: Category[];
}

export interface Media {
  id: number;
  name: string;
  order: number;
  extension: string;
  uploaded_at: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  gender: string;
  address: string;
  userProvince: Province;
}

export interface Province {
  name: string;
}

export interface UserLocalStorage {
  id: number;
  name: string;
  phone: string;
  address: string;
  gender: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  price: number;
  status: string;
  created_at: string;
}

export interface OrderDetails {
  id: number;
  quantity: number;
  price: number;
  product: ProductTest;
}

export interface Payment {
  id: number;
  type: string;
  price: number;
  status: string;
  authority: string;
  message: string;
  referenceId: string;
  createdAt: string;
}

export interface ProductTest {
  id: number;
  productMedia: Media[];
}

export interface OrderFullInfo {
  id: number;
  sumPrice: number;
  status: string;
  created_at: string;
  user: User;
  orderDetails: OrderDetails[];
  orderPayments: Payment[];
}

export interface CategoryFullInfo {
  id: number;
  title: string;
  url: string;
  description: string;
  attributes: Attribute[];
}
