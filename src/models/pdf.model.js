const puppeteer = require('puppeteer');

async function generateInvoicePDF(data) {
    console.log(data.cliente, 'esto recibe');
    let { cliente, detalle } = data;
    const outputPath = `./PDFs/compra-${cliente.nombre}-${cliente.id_orden}-${cliente.fecha}.pdf`;
    let browser;
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        const totalCompra = detalle.reduce((acc, item) => acc + (item.cantidad * item.precio), 0).toFixed(2);
        
        let ahorroTexto = '';
        let ahorroMonto = 0;
        if (cliente.condicion === '15 días') {
            ahorroMonto = (totalCompra * 0.20).toFixed(2);
            ahorroTexto = `Cumpliendo con las condiciones de pago acordadas con el Vendedor ahorras en tu deuda: ${ahorroMonto}$`;
        } else if (cliente.condicion === '30 días') {
            ahorroMonto = (totalCompra * 0.10).toFixed(2);
            ahorroTexto = `Cumpliendo con las condiciones de pago acordadas con el Vendedor ahorras en tu deuda: ${ahorroMonto}$`;
        }

        // Generar el contenido HTML a partir de invoiceData
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Factura</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #000;
                    padding-bottom: 10px;
                }
                .header-left {
                    text-align: left;
                }
                .header-right {
                    text-align: right;
                }
                .info {
                    margin-top: 20px;
                }
                .info div {
                    margin-bottom: 10px;
                }
                .details {
                    margin-top: 30px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .total {
                    text-align: right;
                    margin-top: 20px;
                }
                /* Agregar margen superior para la tabla en la segunda página */
                @page {
                    margin-top: 10mm;
                }
            </style>

            </head>
            <body>
                <div class="header">
                    <div class="header-left">
                        <h1>TEXTILES SATIS, C.A</h1>
                        <p>J-504491918</p>
                    </div>
                    <div class="header-right">
                        <p>Nº Orden de compra: ${cliente.id_orden}</p>
                        <p>Fecha Emision: ${cliente.fecha}</p>
                        <p>Condiciones de pago: ${cliente.condicion}</p>
                    </div>
                </div>
                <div class="info">
                    <div><strong>Cliente:</strong> ${cliente.nombre}</div>
                    <div><strong>RIF:</strong> ${cliente.RIF}</div>
                    <div><strong>Dirección:</strong> ${cliente.estado}, ${cliente.calle}, ${cliente.edificio} </div>
                    <div><strong>Vendedor:</strong> ${cliente.vendedor}</div>
                </div>
                <div class="details">
                    <table>
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>ID Producto</th>
                                <th>Descripción</th>
                                <th>Color</th>
                                <th>Cantidad Empaque</th>
                                <th>Unidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detalle.map((item, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.cod_categoria}-${item.genero}${item.cod_color}</td>
                                    <td>${item.descripcion_producto}</td>
                                    <td>${item.color}</td>
                                    <td>${item.cantidad}</td>
                                    <td>${item.cantidad_piezas}</td>
                                    <td>${item.precio}$</td>
                                    <td>${(item.cantidad * item.precio).toFixed(2)}$</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="total">
                    <p><strong>Total de la compra:</strong> ${totalCompra}$</p>
                </div>
                ${ahorroTexto ? `
                <div class="header-left">
                    <p>Estimado Cliente, premiamos tu compromiso con nosotros.<br>
                    ${ahorroTexto}<br>
                    Una vez Pagada la Nota de Entrega se emitirá la Factura Correspondiente para el Cobro del IVA.<br>
                    Gracias, por su compra.</p>
                </div>
                ` : ''}
            </body>
            </html>
        `;
        console.log('HTML generado', htmlContent);

        await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });

        const pdfOptions = {
            path: outputPath,
            format: 'A4',
            printBackground: true,
        };

        console.log('Generando archivo...', pdfOptions);

        await page.pdf(pdfOptions);

        console.log('PDF generado exitosamente');

        await browser.close();

        return true;
    } catch (error) {
        console.error('Error al generar el PDF', error);
        if (browser) {
            await browser.close();
        }
        return false;
    }
}

module.exports = {
    generateInvoicePDF
};
