import React from 'react';
import { Modal, Box, Typography, Button, Chip } from '@mui/material';
import { Product } from '../interfaces/Product';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '80vw', lg: '70vw' },
  maxWidth: 1200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  maxHeight: '90vh',
  overflowY: 'auto',
  outline: 'none',
};


const contentStyle = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 4,
};

const imageColumnStyle = {
  flex: 1,
  minWidth: 0, 
};

const detailsColumnStyle = {
  flex: 1,
  minWidth: 0, 
};

const thumbnailStyle = {
  width: '100%',
  borderRadius: 2,
  aspectRatio: '1',
  objectFit: 'cover',
};

const smallImagesStyle = {
  display: 'flex',
  gap: 2,
  mt: 2,
};

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={modalStyle}>
        {/* Main */}
        <Box sx={contentStyle}>
          {/* images */}
          <Box sx={imageColumnStyle}>
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={thumbnailStyle}
            />
            <Box sx={smallImagesStyle}>
              {product.images.slice(0, 3).map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${product.title}-${index}`}
                  sx={{
                    width: '30%',
                    borderRadius: 1,
                    aspectRatio: '1',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Right column */}
          <Box sx={detailsColumnStyle}>
            <Typography id="product-modal-title" variant="h4" component="h2" gutterBottom>
              {product.title}
            </Typography>
            
            <Chip 
              label={product.brand} 
              color="primary" 
              size="small"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
              <Typography variant="h5" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({product.discountPercentage}% off)
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Typography variant="body2">
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography variant="body2">
                <strong>Rating:</strong> {product.rating}/5
              </Typography>
              <Typography variant="body2">
                <strong>Stock:</strong> {product.stock}
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              onClick={onClose}
              fullWidth
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;