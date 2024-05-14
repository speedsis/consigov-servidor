/* eslint-disable jsx-a11y/alt-text */
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils

import styles from './RelatorioComprovanteStyle';

// ----------------------------------------------------------------------

const today = new Date();
const todayFormatted = today.toLocaleDateString('pt-BR');

export default function RelatorioHoleritePDF() {
  // const sortedRel130 = relAnalitico.sort((a, b) => a.Servidor.nome.localeCompare(b.Servidor.nome));

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait">
          {/* <View style={{ alignItems: 'center', flexDirection: 'column' }}>
            <Text style={styles.title}>{`Contra cheque`}</Text>
          </View> */}

          <View style={{ alignItems: 'center', flexDirection: 'column' }}>
            <Image
              src="/assets/images/contracheque/contracheque.jpeg"
              style={{ width: 560, height: 720 }}
            />
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell_8, styles.alignCenter]}>
                  <Text style={styles.subtitle2}>
                    Emitido em : {todayFormatted} - Faça o seu papel, imprima apenas o necessário!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
