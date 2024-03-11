import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vhiakxgfeaupmqknprbz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaWFreGdmZWF1cG1xa25wcmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzgyOTIzMywiZXhwIjoyMDIzNDA1MjMzfQ.XSot76iQ0Y8wAt_Su9y0u78HieFKAR9IVQrlCugb11M'
);
