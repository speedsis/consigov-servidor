// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Button, Dialog, Tooltip, IconButton, DialogActions } from '@mui/material';
// hooks
import useToggle from 'src/hooks/useToggle';
// routes

// components

//

import { ClienteFornecedor } from 'src/@types/cliente-fornecedor';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  colaborador?: ClienteFornecedor;
};

export default function Relatorio130({ colaborador }: Props) {
  const { push } = useRouter();

  const { toggle: open, onOpen, onClose } = useToggle();

  const handleEdit = () => {};

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton onClick={onOpen}>
              <Iconify icon={'eva:eye-fill'} />
            </IconButton>
          </Tooltip>

          <div suppressHydrationWarning={true}>
            {/* {process.browser && (
              <PDFDownloadLink
                document={<InvoicePDF colaborador={colaborador} />}
                fileName={String(colaborador.id)}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <Tooltip title="Download">
                    <IconButton>
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <Iconify icon={'eva:download-fill'} />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </PDFDownloadLink>
            )} */}
          </div>

          <Tooltip title="Print">
            <IconButton>
              <Iconify icon={'eva:printer-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send">
            <IconButton>
              <Iconify icon={'ic:round-send'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon={'eva:share-fill'} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Dialog fullScreen open={open}>
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
            {/* <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF colaborador={colaborador} />
            </PDFViewer> */}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
