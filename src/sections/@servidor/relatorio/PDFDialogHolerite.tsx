import React from 'react';
import { Dialog, Box, DialogActions, Tooltip, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { PDFViewer } from '@react-pdf/renderer';
import RelatorioHoleritePDF from 'src/sections/@relatorio/comprovante/RelatorioHoleritePDF';

interface PDFDialogHoleriteProps {
  open: boolean;
  onClose: () => void;
}

function PDFDialogHolerite({ open, onClose }: PDFDialogHoleriteProps) {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DialogActions
          sx={{
            zIndex: 9,
            padding: '12px !important',
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          <Tooltip title="Close">
            <IconButton color="inherit" onClick={onClose}>
              <Iconify icon={'eva:close-fill'} />
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
          <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
            <RelatorioHoleritePDF />
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  );
}

export default PDFDialogHolerite;
