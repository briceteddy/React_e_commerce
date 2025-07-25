import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Product } from '../interfaces/Product';



interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" mt={2}>
          ${product.price}
        </Typography>
        <Typography variant="body2">
          Rating: {product.rating} | Stock: {product.stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewDetails(product)}>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;