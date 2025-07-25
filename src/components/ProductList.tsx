import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, Alert, Container, Typography, TextField } from '@mui/material';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { fetchProducts } from '../api/products';
import { Product } from '../interfaces/Product';

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
     TEddy Market
      </Typography>
      
      <TextField
        label="Search products"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}>
        {filteredProducts?.map((product) => (
          <Box key={product.id} sx={{
            width: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.333% - 32px)', lg: 'calc(25% - 32px)' },
            maxWidth: 345
          }}>
            <ProductCard
              product={product}
              onViewDetails={setSelectedProduct}
            />
          </Box>
        ))}
      </Box>
      
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
};

export default ProductList;