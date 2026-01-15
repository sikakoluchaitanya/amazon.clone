const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const getCommonStyles = () => `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
    .header { text-align: center; background-color: #232F3E; padding: 15px; }
    .logo { color: white; font-size: 24px; font-weight: bold; text-decoration: none; }
    .logo-dot { color: #FF9900; }
    .content { padding: 20px 0; }
    .order-details { margin-top: 20px; width: 100%; border-collapse: collapse; }
    .order-details th { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background-color: #f4f4f4; }
    .order-details td { padding: 10px; border-bottom: 1px solid #eee; }
    .total-row { font-weight: bold; font-size: 1.1em; }
    .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }
    .btn { display: inline-block; background-color: #FFD814; color: #0F1111; padding: 10px 20px; text-decoration: none; border-radius: 20px; margin-top: 20px; font-weight: bold; }
`;

const generateOrderPlacementTemplate = (order) => {
    const itemsHtml = order.details.items.map(item => `
        <tr>
            <td>
                <div style="font-weight: bold;">${item.name}</div>
                <div style="font-size: 0.9em; color: #555;">Qty: ${item.quantity}</div>
            </td>
            <td style="text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <style>${getCommonStyles()}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="#" class="logo">amazon<span class="logo-dot">.clone</span></a>
        </div>
        <div class="content">
            <h2>Order Confirmation</h2>
            <p>Hello,</p>
            <p>Thank you for your order! We have received your order <strong>#${order.id}</strong> and it is being processed.</p>
            
            <table class="order-details">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                    <tr>
                        <td class="total-row" style="text-align: right;">Total:</td>
                        <td class="total-row" style="text-align: right;">${formatCurrency(order.total_amount)}</td>
                    </tr>
                </tbody>
            </table>

            <div style="text-align: center;">
                <a href="#" class="btn">View Order</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Amazon Clone. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

const generateInvoiceTemplate = (order) => {
    const itemsHtml = order.details.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: right;">${formatCurrency(item.price)}</td>
            <td style="text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <style>${getCommonStyles()}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <span class="logo">amazon<span class="logo-dot">.clone</span> Invoice</span>
        </div>
        <div class="content">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div>
                    <strong>Billed To:</strong><br>
                    ${order.details.shippingAddress.name}<br>
                    ${order.details.shippingAddress.address}<br>
                    ${order.details.shippingAddress.city} - ${order.details.shippingAddress.pincode}
                </div>
                <div style="text-align: right;">
                    <strong>Invoice #:</strong> INV-${order.id}<br>
                    <strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}<br>
                    <strong>Order #:</strong> ${order.id}
                </div>
            </div>

            <table class="order-details">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Unit Price</th>
                        <th style="text-align: right;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                    <tr>
                        <td colspan="3" class="total-row" style="text-align: right;">Total:</td>
                        <td class="total-row" style="text-align: right;">${formatCurrency(order.total_amount)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
            <p>This is a computer generated invoice.</p>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = {
    generateOrderPlacementTemplate,
    generateInvoiceTemplate
};
