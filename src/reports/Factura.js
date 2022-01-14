import React from 'react';
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer';
import { useCarritoContext } from '../context/carritoContext';

export const Factura = () => {

    const { carrito } = useCarritoContext();

    return (
        <PDFViewer style={{ width: '60%', height: '90vh', margin: 'auto', marginTop: 35 }}>
            <Document>
                <Page size="C8">
                    <View style={{ fontSize: 4, textAlign: 'center' }}>
                        <Text style={{ marginTop: 15 }}>Panda Food S.A.S</Text>
                        <Text>NIT.: 14506454-3</Text>
                        <Text>CL 43a #2-22</Text>
                        <Text>Tel: 3162797883</Text>
                        <Text>PALMIRA - COLOMBIA</Text>
                        <Text>RÉGIMEN COMÚN</Text>
                        <Text style={{ marginBottom: 15 }}>FACURA POS PALMIRA P9 - 101748</Text>
                        {
                            carrito?.map((dato) => {
                                return <View style={{ fontSize: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 15 }}>
                                    <Text style={{ marginRight: 4 }}>{dato.nombre}</Text>
                                    <Text>{dato.cantidad}</Text>
                                </View>
                            })
                        }
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
