import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const BrandSuccessModal = ({ open, onClose, brandUrl }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Brand Created Successfully</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Your brand website is ready!</Typography>
        <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
          <Link
            to={`https://${brandUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brandUrl}
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandSuccessModal;
