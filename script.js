// Sample data for demonstration
const sampleData = [
    { id: 1, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:52', humidity: 70, temperature: 26.2 },
    { id: 2, deviceId: '24e124136e469517', sensorName: 'Sensor - 12', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:52', humidity: 70.5, temperature: 26.1 },
    { id: 3, deviceId: '24e124136e469477', sensorName: 'Sensor - 1', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:52', humidity: 71.5, temperature: 26.2 },
    { id: 4, deviceId: '24e124136d150589', sensorName: 'Sensor - 4', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:52', humidity: 75, temperature: 26.3 },
    { id: 5, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:48', humidity: 70, temperature: 26.3 },
    { id: 6, deviceId: '24e124136e469484', sensorName: 'Sensor - 10', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:45', humidity: 72, temperature: 26.2 },
    { id: 7, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:43', humidity: 69.5, temperature: 26.3 },
    { id: 8, deviceId: '24e124136d150040', sensorName: 'Sensor - 6', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:43', humidity: 74.5, temperature: 26.3 },
    { id: 9, deviceId: '24e124136d150589', sensorName: 'Sensor - 4', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:41', humidity: 74.5, temperature: 26.3 },
    { id: 10, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:40', humidity: 69.5, temperature: 26.2 },
    { id: 11, deviceId: '24e124136d150037', sensorName: 'Sensor - 3', status: 'inactive', location: 'Delhi', timestamp: '03/09/2025, 16:39', humidity: 73, temperature: 26.2 },
    { id: 12, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:38', humidity: 69.5, temperature: 26.2 },
    { id: 13, deviceId: '24e124136e469489', sensorName: 'Sensor - 9', status: 'inactive', location: 'Delhi', timestamp: '03/09/2025, 16:37', humidity: 71.5, temperature: 26.2 },
    { id: 14, deviceId: '24e124136e469484', sensorName: 'Sensor - 10', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:35', humidity: 72, temperature: 26.3 },
    { id: 15, deviceId: '24e124136d150021', sensorName: 'Sensor - 5', status: 'active', location: 'Delhi', timestamp: '03/09/2025, 16:33', humidity: 69, temperature: 26.3 }
];

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileType = document.getElementById('fileType');
const convertBtn = document.getElementById('convertBtn');
const tableBody = document.getElementById('tableBody');
const selectAllCheckbox = document.getElementById('selectAllCheckbox');
const selectAllBtn = document.getElementById('selectAllBtn');
const deselectAllBtn = document.getElementById('deselectAllBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const sensorFilter = document.getElementById('sensorFilter');
const statusFilter = document.getElementById('statusFilter');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const exportExcelBtn = document.getElementById('exportExcelBtn');
const timeFrame = document.getElementById('timeFrame');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const columnSelectorBtn = document.getElementById('columnSelectorBtn');
const columnModal = document.getElementById('columnModal');
const closeModal = document.querySelector('.close');
const applyColumnsBtn = document.getElementById('applyColumnsBtn');
const resetColumnsBtn = document.getElementById('resetColumnsBtn');
const columnCheckboxes = document.getElementById('columnCheckboxes');
const exportColumns = document.getElementById('exportColumns');

// Column configuration
const availableColumns = [
    { id: 'id', name: 'ID', visible: true, exportable: true },
    { id: 'deviceId', name: 'Device ID', visible: true, exportable: true },
    { id: 'sensorName', name: 'Sensor Name', visible: true, exportable: true },
    { id: 'status', name: 'Status', visible: true, exportable: true },
    { id: 'location', name: 'Location', visible: true, exportable: true },
    { id: 'timestamp', name: 'Timestamp', visible: true, exportable: true },
    { id: 'humidity', name: 'Humidity', visible: true, exportable: true },
    { id: 'temperature', name: 'Temperature', visible: true, exportable: true }
];

// Initialize table with sample data
function initializeTable() {
    tableBody.innerHTML = '';
    const uniqueSensors = new Set();
    
    // Set default dates
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    startDate.valueAsDate = oneWeekAgo;
    endDate.valueAsDate = today;
    
    sampleData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="row-checkbox" data-id="${row.id}">
            </td>
            <td>${row.id}</td>
            <td>${row.deviceId}</td>
            <td>${row.sensorName}</td>
            <td><span class="status-badge status-${row.status}">${row.status}</span></td>
            <td>${row.location}</td>
            <td>${row.timestamp}</td>
            <td>${row.humidity}</td>
            <td>${row.temperature}</td>
        `;
        tableBody.appendChild(tr);
        
        // Add to unique sensors set
        uniqueSensors.add(row.sensorName);
    });
    
    // Populate sensor filter dropdown
    populateSensorFilter(uniqueSensors);
    
    // Initialize column selectors
    initializeColumnSelectors();
    
    // Add event listeners to row checkboxes
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateRowSelection(this);
        });
    });
    
    // Apply initial filters
    filterTable();
}

// Populate sensor filter dropdown
function populateSensorFilter(sensors) {
    sensorFilter.innerHTML = '<option value="all">All Sensors</option>';
    sensors.forEach(sensor => {
        const option = document.createElement('option');
        option.value = sensor;
        option.textContent = sensor;
        sensorFilter.appendChild(option);
    });
}

// Initialize column selectors for modal and export
function initializeColumnSelectors() {
    // Modal column selector
    columnCheckboxes.innerHTML = '';
    availableColumns.forEach(column => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'column-checkbox';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="modal-${column.id}" ${column.visible ? 'checked' : ''}>
            <label for="modal-${column.id}">${column.name}</label>
        `;
        columnCheckboxes.appendChild(checkboxDiv);
    });
    
    // Export column selector
    exportColumns.innerHTML = '';
    availableColumns.forEach(column => {
        if (column.exportable) {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'column-checkbox';
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="export-${column.id}" checked>
                <label for="export-${column.id}">${column.name}</label>
            `;
            exportColumns.appendChild(checkboxDiv);
        }
    });
}

// Apply column visibility
function applyColumnVisibility() {
    const headers = document.querySelectorAll('#sensorDataTable thead th');
    const rows = document.querySelectorAll('#sensorDataTable tbody tr');
    
    availableColumns.forEach((column, index) => {
        // +1 because of checkbox column
        const columnIndex = index + 1;
        const isVisible = document.getElementById(`modal-${column.id}`).checked;
        
        // Update header visibility
        if (headers[columnIndex]) {
            headers[columnIndex].style.display = isVisible ? '' : 'none';
        }
        
        // Update data cells visibility
        rows.forEach(row => {
            const cell = row.cells[columnIndex];
            if (cell) {
                cell.style.display = isVisible ? '' : 'none';
            }
        });
    });
}

// Event Listeners
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '';
    
    if (e.dataTransfer.files.length) {
        handleFileSelection(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFileSelection(e.target.files[0]);
    }
});

function handleFileSelection(file) {
    const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|xlsx|xls|csv)$/i)) {
        alert('Please select a PDF, Excel, or CSV file.');
        return;
    }
    
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
    fileType.textContent = file.type || 'Unknown';
    fileInfo.style.display = 'block';
    
    // Extract time frame from file if possible
    extractTimeFrameFromFile(file);
    
    // In a real application, you would process the file here
    // For this demo, we'll just show a success message
    setTimeout(() => {
        alert(`File "${file.name}" uploaded successfully! Data has been extracted and displayed in the table.`);
    }, 500);
}

// Extract time frame from uploaded file (mock implementation)
function extractTimeFrameFromFile(file) {
    // In a real application, you would parse the file to extract dates
    // For this demo, we'll set some reasonable defaults
    
    const today = new Date();
    const fileStartDate = new Date(today);
    fileStartDate.setDate(today.getDate() - 30); // Assume data from last 30 days
    
    startDate.valueAsDate = fileStartDate;
    endDate.valueAsDate = today;
    
    // Update available time frames
    updateTimeFrameOptions();
}

// Update time frame options based on available data
function updateTimeFrameOptions() {
    // This would be populated based on actual data timestamps
    // For now, we'll keep the static options
}

convertBtn.addEventListener('click', () => {
    const instituteName = document.getElementById('instituteName').value;
    const reportTitle = document.getElementById('reportTitle').value;
    const startDateVal = startDate.value;
    const endDateVal = endDate.value;
    const weightLabel = document.getElementById('weightLabel').value;
    const dateFormat = document.getElementById('dateFormat').value;
    const temperatureUnit = document.getElementById('temperatureUnit').value;
    const whitemailing = Array.from(document.getElementById('whitemailing').selectedOptions).map(opt => opt.value);
    
    // In a real application, you would send these settings to the backend
    // For this demo, we'll just show a success message
    alert(`Report processing initiated with the following settings:\n\nInstitute: ${instituteName}\nReport Title: ${reportTitle}\nDate Range: ${startDateVal} to ${endDateVal}\nWeight Labeling: ${weightLabel}\nDate Format: ${dateFormat}\nTemperature Unit: ${temperatureUnit}\nDistribution: ${whitemailing.join(', ')}`);
});

selectAllCheckbox.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
        updateRowSelection(checkbox);
    });
});

selectAllBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        updateRowSelection(checkbox);
    });
    selectAllCheckbox.checked = true;
});

deselectAllBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        updateRowSelection(checkbox);
    });
    selectAllCheckbox.checked = false;
});

deleteSelectedBtn.addEventListener('click', () => {
    const selectedRows = document.querySelectorAll('.row-checkbox:checked');
    if (selectedRows.length === 0) {
        alert('Please select at least one row to delete.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedRows.length} selected row(s)?`)) {
        // In a real application, you would send a request to delete these rows
        // For this demo, we'll just remove them from the UI
        selectedRows.forEach(checkbox => {
            const row = checkbox.closest('tr');
            row.remove();
        });
        
        // Update IDs after deletion
        updateRowIds();
        
        alert(`${selectedRows.length} row(s) deleted successfully.`);
    }
});

function updateRowSelection(checkbox) {
    const row = checkbox.closest('tr');
    if (checkbox.checked) {
        row.classList.add('selected');
    } else {
        row.classList.remove('selected');
    }
}

function updateRowIds() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.cells[1].textContent = index + 1;
        row.querySelector('.row-checkbox').dataset.id = index + 1;
    });
}

sensorFilter.addEventListener('change', filterTable);
statusFilter.addEventListener('change', filterTable);
timeFrame.addEventListener('change', filterTable);
startDate.addEventListener('change', filterTable);
endDate.addEventListener('change', filterTable);

function filterTable() {
    const sensorValue = sensorFilter.value;
    const statusValue = statusFilter.value;
    const timeFrameValue = timeFrame.value;
    
    const rows = tableBody.querySelectorAll('tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const sensorName = row.cells[3].textContent;
        const status = row.cells[4].querySelector('.status-badge').textContent;
        const timestamp = row.cells[6].textContent;
        
        const sensorMatch = sensorValue === 'all' || sensorName === sensorValue;
        const statusMatch = statusValue === 'all' || status === statusValue;
        const timeMatch = filterByTimeFrame(timestamp, timeFrameValue);
        
        if (sensorMatch && statusMatch && timeMatch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update select all checkbox state
    if (visibleCount === 0) {
        selectAllCheckbox.checked = false;
    } else {
        const visibleCheckboxes = document.querySelectorAll('.row-checkbox:not([style*="display: none"])');
        const allChecked = Array.from(visibleCheckboxes).every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    }
}

function filterByTimeFrame(timestamp, timeFrameValue) {
    if (timeFrameValue === 'all') return true;
    
    const timestampDate = new Date(timestamp.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$3-$2-$1T$4:$5'));
    const now = new Date();
    
    switch(timeFrameValue) {
        case 'last24h':
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return timestampDate >= yesterday;
        case 'last7d':
            const lastWeek = new Date(now);
            lastWeek.setDate(lastWeek.getDate() - 7);
            return timestampDate >= lastWeek;
        case 'last30d':
            const lastMonth = new Date(now);
            lastMonth.setDate(lastMonth.getDate() - 30);
            return timestampDate >= lastMonth;
        case 'custom':
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
            end.setHours(23, 59, 59, 999); // End of day
            return timestampDate >= start && timestampDate <= end;
        default:
            return true;
    }
}

// Modal functionality
columnSelectorBtn.addEventListener('click', () => {
    columnModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    columnModal.style.display = 'none';
});

applyColumnsBtn.addEventListener('click', () => {
    applyColumnVisibility();
    columnModal.style.display = 'none';
});

resetColumnsBtn.addEventListener('click', () => {
    availableColumns.forEach(column => {
        column.visible = true;
        document.getElementById(`modal-${column.id}`).checked = true;
    });
    applyColumnVisibility();
});

window.addEventListener('click', (event) => {
    if (event.target === columnModal) {
        columnModal.style.display = 'none';
    }
});

// Export to CSV functionality
exportCsvBtn.addEventListener('click', () => {
    const selectedColumns = getSelectedExportColumns();
    const rows = [];
    
    // Add headers
    const headers = selectedColumns.map(col => col.name);
    rows.push(headers.join(','));
    
    // Add data rows
    document.querySelectorAll('#sensorDataTable tbody tr').forEach(tr => {
        if (tr.style.display !== 'none') {
            const rowData = [];
            selectedColumns.forEach(col => {
                const columnIndex = availableColumns.findIndex(c => c.id === col.id) + 1;
                let cellContent = tr.cells[columnIndex].textContent.trim();
                
                // Handle status badges
                const statusBadge = tr.cells[columnIndex].querySelector('.status-badge');
                if (statusBadge) {
                    cellContent = statusBadge.textContent.trim();
                }
                
                // Escape commas and quotes for CSV
                if (cellContent.includes(',') || cellContent.includes('"')) {
                    cellContent = `"${cellContent.replace(/"/g, '""')}"`;
                }
                
                rowData.push(cellContent);
            });
            rows.push(rowData.join(','));
        }
    });
    
    const csvContent = rows.join('\n');
    downloadFile(csvContent, 'sensor_report.csv', 'text/csv');
});

// Export to PDF functionality
exportPdfBtn.addEventListener('click', () => {
    const selectedColumns = getSelectedExportColumns();
    const instituteName = document.getElementById('instituteName').value;
    const reportTitle = document.getElementById('reportTitle').value;
    
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    
    const tableHtml = generateTableHTMLForExport(selectedColumns);
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Sensor Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background-color: #2c3e50; color: white; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    .footer { margin-top: 30px; font-size: 0.9em; color: #7f8c8d; }
                    .report-info { margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>${reportTitle}</h1>
                <div class="report-info">
                    <p><strong>Institute:</strong> ${instituteName}</p>
                    <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Time Frame:</strong> ${startDate.value} to ${endDate.value}</p>
                </div>
                ${tableHtml}
                <div class="footer">
                    <p>Report generated by Sensor Report Converter</p>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    
    // Give it a moment to load then print
    setTimeout(() => {
        printWindow.print();
    }, 500);
});

// Export to Excel functionality
exportExcelBtn.addEventListener('click', () => {
    const selectedColumns = getSelectedExportColumns();
    
    // Prepare data for Excel
    const data = [];
    
    // Add headers
    const headers = selectedColumns.map(col => col.name);
    data.push(headers);
    
    // Add data rows
    document.querySelectorAll('#sensorDataTable tbody tr').forEach(tr => {
        if (tr.style.display !== 'none') {
            const rowData = [];
            selectedColumns.forEach(col => {
                const columnIndex = availableColumns.findIndex(c => c.id === col.id) + 1;
                let cellContent = tr.cells[columnIndex].textContent.trim();
                
                // Handle status badges
                const statusBadge = tr.cells[columnIndex].querySelector('.status-badge');
                if (statusBadge) {
                    cellContent = statusBadge.textContent.trim();
                }
                
                rowData.push(cellContent);
            });
            data.push(rowData);
        }
    });
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sensor Data');
    
    // Generate Excel file and download
    XLSX.writeFile(wb, 'sensor_report.xlsx');
});

// Helper function to get selected export columns
function getSelectedExportColumns() {
    return availableColumns.filter(column => {
        const checkbox = document.getElementById(`export-${column.id}`);
        return checkbox && checkbox.checked && column.exportable;
    });
}

// Helper function to generate table HTML for export
function generateTableHTMLForExport(columns) {
    let tableHtml = '<table><thead><tr>';
    
    // Add headers
    columns.forEach(col => {
        tableHtml += `<th>${col.name}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    
    // Add data rows
    document.querySelectorAll('#sensorDataTable tbody tr').forEach(tr => {
        if (tr.style.display !== 'none') {
            tableHtml += '<tr>';
            columns.forEach(col => {
                const columnIndex = availableColumns.findIndex(c => c.id === col.id) + 1;
                let cellContent = tr.cells[columnIndex].textContent.trim();
                
                // Handle status badges
                const statusBadge = tr.cells[columnIndex].querySelector('.status-badge');
                if (statusBadge) {
                    cellContent = statusBadge.textContent.trim();
                }
                
                tableHtml += `<td>${cellContent}</td>`;
            });
            tableHtml += '</tr>';
        }
    });
    
    tableHtml += '</tbody></table>';
    return tableHtml;
}

// Generic file download function
function downloadFile(content, filename, mimeType) {
    // Create a blob URL
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', initializeTable);
