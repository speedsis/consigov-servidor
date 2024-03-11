// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography variant="h1" sx={{ mt: 6, position: 'relative', textAlign: 'center' }}>
          {title || (
            <>
              Olá, seja bem-vindo!
              <br />
            </>
          )}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/background/funcionario.png'}
          // sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
