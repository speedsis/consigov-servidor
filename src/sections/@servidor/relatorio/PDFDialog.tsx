import React from 'react';
import { Dialog, Box, DialogActions, Tooltip, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { PDFViewer } from '@react-pdf/renderer';

import RelatorioComprovantePDF from 'src/sections/@relatorio/comprovante/RelatorioComprovantePDF';
import { Consignacao, ServidorBasic } from 'src/@types/servidor';

interface PDFDialogProps {
  open: boolean;
  onClose: () => void;
  dataFiltered: Consignacao; // Replace `any` with the type of `dataFiltered` if possible
  dataServidor: ServidorBasic;
}

function PDFDialog({ open, onClose, dataFiltered, dataServidor }: PDFDialogProps) {
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
            <RelatorioComprovantePDF relConsignacao={dataFiltered} relServidor={dataServidor} />
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  );
}

export default PDFDialog;
