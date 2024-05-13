import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  pageSpacing: {
    flex: 1,
    marginBottom: 100, // Ajuste conforme necessário
  },

  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb10: { marginBottom: 8, marginLeft: 150 },
  mb20: { marginBottom: 20 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Oswald',
    fontWeight: 700,
    marginBottom: 20,
  },

  titleSub: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'right',
  },

  h2: { fontSize: 18, fontWeight: 700 },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },

  subtitle2: { fontSize: 8, fontWeight: 700 },
  subtitle3: { fontSize: 8 },
  subtitle5: {
    fontSize: 10,
    alignSelf: 'flex-start',
    fontWeight: 400,
    alignItems: 'flex-start',
    marginLeft: -460,
  },

  subtitle6: {
    fontSize: 9,
    alignSelf: 'flex-start',
    fontWeight: 700,
    alignItems: 'flex-start',
    marginLeft: -460,
  },

  alignRight: { textAlign: 'right' },
  alignCenter: { textAlign: 'center' },
  alignLeft: { textAlign: 'left' },
  page: {
    padding: '40px 24px 40px 24px',
    // flexDirection: 'row',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    marginBottom: 100,
    // textTransform: 'capitalize',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 50,
    margin: 'auto',

    position: 'absolute',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {
    border: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  tableRow: {
    padding: '4px 0',
    flexDirection: 'row',
    borderBottom: 1,
    // borderLeft: 1,
    // borderRight: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },

  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  borderTop: {
    paddingTop: 4,
    paddingBottom: 0,
    borderTop: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '10%' },
  tableCell_3: { width: '15%' },
  tableCell_4: { width: '20%' },
  tableCell_5: { width: '25%', paddingRight: 16, paddingLeft: 4 },
  tableCell_6: { width: '50%', paddingRight: 0, paddingLeft: 4 },
  tableCell_8: { width: '85%' },

  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    padding: '8px 0',
  },

  textH4: {
    margin: 20,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    padding: '8px 0',
  },

  textSign: {
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    padding: '8px 0',
  },

  textSignOther: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    padding: '8px 38px',
  },

  textSignMsg: {
    fontSize: 6,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    padding: '8px 0',
  },

  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

  spaceLine: {
    textAlign: 'right',
  },
  spaceLeft: {
    marginLeft: 150,
  },
});

export default styles;
