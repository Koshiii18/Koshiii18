// Get references to the input fields and the form
const adultNumInput = document.getElementById('adultnum');
const childNumInput = document.getElementById('childnum');
const fAdultInput = document.getElementById('fadult');
const fChildInput = document.getElementById('fchild');
const dateInput = document.getElementById('date');
const durationSelect = document.getElementById('duration');
const summaryTable = document.getElementById('summaryTable');

// Add event listener to calculate and save data on blur
adultNumInput.addEventListener('blur', saveTicketData);
childNumInput.addEventListener('blur', saveTicketData);
fAdultInput.addEventListener('blur', saveTicketData);
fChildInput.addEventListener('blur', saveTicketData);
dateInput.addEventListener('blur', saveTicketData);
durationSelect.addEventListener('change', saveTicketData);

// Function to calculate and save ticket data
function saveTicketData() {
  const adultNum = parseInt(adultNumInput.value) || 0;
  const childNum = parseInt(childNumInput.value) || 0;
  const fAdultNum = parseInt(fAdultInput.value) || 0;
  const fChildNum = parseInt(fChildInput.value) || 0;
  const selectedDate = dateInput.value;
  const selectedDuration = durationSelect.options[durationSelect.selectedIndex].text;

  const ticketData = {
    adultNum: adultNum,
    childNum: childNum,
    fAdultNum: fAdultNum,
    fChildNum: fChildNum,
    selectedDate: selectedDate,
    selectedDuration: selectedDuration
  };

  // Store ticket data in local storage
  localStorage.setItem('ticketData', JSON.stringify(ticketData));
  
  // Create and display the summary table
  createSummaryTable(ticketData);
}

// Function to create and display the summary table
function createSummaryTable(ticketData) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  
  const fields = ['adultNum', 'childNum', 'fAdultNum', 'fChildNum', 'selectedDate', 'selectedDuration'];
  
  for (const field of fields) {
    const tr = document.createElement('tr');
    
    const th = document.createElement('th');
    th.textContent = field;
    tr.appendChild(th);
    
    const td = document.createElement('td');
    td.textContent = ticketData[field];
    tr.appendChild(td);
    
    tbody.appendChild(tr);
  }
  
  table.appendChild(tbody);
  
  summaryTable.innerHTML = '';
  summaryTable.appendChild(table);
}

// Load stored ticket data on page load
function loadTicketData() {
  const storedData = localStorage.getItem('ticketData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    adultNumInput.value = parsedData.adultNum;
    childNumInput.value = parsedData.childNum;
    fAdultInput.value = parsedData.fAdultNum;
    fChildInput.value = parsedData.fChildNum;
    dateInput.value = parsedData.selectedDate;
    for (let i = 0; i < durationSelect.options.length; i++) {
      if (durationSelect.options[i].text === parsedData.selectedDuration) {
        durationSelect.selectedIndex = i;
        break;
      }
    }
    
    // Create and display the summary table
    createSummaryTable(parsedData);
  }
}

// Clear local storage when the page is refreshed
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('ticketData');
});

// Load stored ticket data when the page loads
loadTicketData();