//The print popup handler
export const printPage = (downloadTarget)=>{
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(downloadTarget.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(()=>{
        printWindow.print();
    }, 2000);
}