// src/models/rentalModel.ts
export interface RentalItem {
  id: string;
  category: string; // Partition Key for rental_items container
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: boolean | "available" | "rented" | "maintenance";
  imageUrl?: string;
  specifications?: Record<string, any>;
  offers?: string[];
  ratings?: number;
  rentalType?: "short-term" | "long-term" | "event";
  ownerContactInfo?: string; // Field for owner's contact details
  createdAt: string;
  updatedAt: string;
  stock?: number;
}

export interface CartItem {
  id: string;          // Unique ID for the cart entry, e.g., `${userId}-${productId}`
  userId: string;      // Partition Key for cart container
  productId: string;   // ID of the actual RentalItem
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface Order { // For future use
    id: string;
    userId: string; // Partition Key for orders container
    items: CartItem[]; // A snapshot of items at the time of order
    totalAmount: number;
    orderDate: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
    // rentalStartDate?: string;
    // rentalEndDate?: string;
    shippingAddress?: any;
    billingAddress?: any;
    createdAt: string;
    updatedAt: string;
}