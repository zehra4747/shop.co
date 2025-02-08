export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
      {
        name: 'fullName',
        type: 'string',
        title: 'Full name',
      },
      {
        name: 'address',
        type: 'string',
        title: 'Address',
      },
      {
        name: 'city',
        type: 'string',
        title: 'City',
      },
      {
        name: 'zipCode',
        type: 'string',
        title: 'Zip Code',
      },
      {
        name: 'country',
        type: 'string',
        title: 'Country',
      },
      {
        name: 'number',
        type: 'string',
        title: 'Phone number',
      },
      {
        name: 'cartItems',
        type: 'array',
        title: 'Cart Items',
        of: [
          {
            type: 'reference',
            to: [{ type: 'products' }], // Ensure this matches the `products` schema name
          },
        ],
      },
      {
        name: 'total',
        type: 'number',
        title: 'Total',
      },
    ],
  };