import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg className="sc-bdVaJa iBUeGq" viewBox="0 0 11.9 9.7">
          <path
            className="st0"
            d="M0.9,1.6H11c0.5,0,0.9-0.4,0.9-0.8S11.5,0,11,0H0.9C0.4,0,0,0.4,0,0.8C0.1,1.2,0.4,1.6,0.9,1.6z M11,4H0.9 C0.4,4,0,4.4,0,4.8c0.1,0.4,0.4,0.9,0.9,0.9H11c0.5,0,0.9-0.4,0.9-0.8C11.9,4.5,11.5,4,11,4z M11,8.1H0.9C0.4,8.1,0,8.5,0,8.9 c0,0.4,0.4,0.8,0.9,0.8H11c0.5,0,0.9-0.4,0.9-0.8C11.9,8.5,11.5,8.1,11,8.1z"
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
