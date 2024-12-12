// Initial values for sliders and balance
let balance = 5700000000000;
const sliders = document.querySelectorAll('.item-slider');

// Calculate initial max values for sliders based on available budget
const setInitialSliderMaxValues = () => {
  sliders.forEach(slider => {
    const price = parseFloat(slider.dataset.price);
    const maxQuantity = Math.floor(balance / price); // Max quantity based on the budget
    slider.max = maxQuantity;
  });
};

// Update balance without updating slider limits in the input event
const updateBalance = () => {
  let totalCost = 0;
  sliders.forEach(slider => {
    const price = parseFloat(slider.dataset.price);
    const quantity = parseInt(slider.value, 10);
    totalCost += price * quantity;
  });

  const remainingBalance = Math.max(0, balance - totalCost);

  // Format the balance and per-person values with commas
  document.getElementById('balance').textContent = `$${remainingBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  // Calculate how much each person in a group of 5 would get and format it with commas
  const perPerson = (remainingBalance / 813).toFixed(2);
  document.getElementById('per-person').textContent = `$${parseFloat(perPerson).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// Initialize sliders
sliders.forEach(slider => {
  slider.addEventListener('input', () => {
    // Update balance dynamically as the slider is being dragged
    updateBalance();
    slider.nextElementSibling.querySelector('.quantity-display').textContent = `${parseInt(slider.value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  });

  slider.addEventListener('change', () => {
    // Update the max value for other sliders only after the slider is released
    updateBalance();
    sliders.forEach(slider => {
      const price = parseFloat(slider.dataset.price);
      const remainingBalance = Math.max(0, balance - getTotalCost());
      slider.max = Math.floor(remainingBalance / price) + parseInt(slider.value, 10);
    });
  });
});

// Function to calculate the total cost based on slider values
const getTotalCost = () => {
  let totalCost = 0;
  sliders.forEach(slider => {
    const price = parseFloat(slider.dataset.price);
    const quantity = parseInt(slider.value, 10);
    totalCost += price * quantity;
  });
  return totalCost;
};

// Pie chart data
const pieChartData = {
  labels: ['Billionaires', 'Next 1%', 'Next 9%', 'Next 40%', 'Bottom 50%'],
  datasets: [{
    data: [5.7, 40, 55, 46, 3.8],
    backgroundColor: ['#FFB6C1', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD'],
    borderWidth: 1,
    borderColor: '#ffffff',
  }],
};

// Initialize Doughnut Chart (Pie to Ring transformation)
const pieChart = new Chart(document.getElementById('pieChart').getContext('2d'), {
  type: 'doughnut',
  data: pieChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true, 
      animateRotate: true, 
      duration: 800, 
    },
    cutoutPercentage: 50, 
    plugins: {
      title: {
        display: true,
        text: "United States Income Distribution (2024)",
        font: {
          size: 18
        },
        color: "#ffffff",
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw} Trillion`;
          },
        },
      },
    },
  },
});

// Line Graph Data
const lineGraphDataSets = {
  dataset1: {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Monthly Savings (Dataset 1)',
      data: [1.3, 1.5, 1.6, 1.9, 2.3, 2.6, 2.4, 2.8, 3.1, 3.1, 2.9, 4.4, 4.7, 4.5, 5.7],
      borderColor: '#4A90E2',
      backgroundColor: 'rgba(74, 144, 226, 0.2)', // Light blue fill
      borderWidth: 3,
      fill: true,
      tension: 0, // Straight lines
    }],
  },
  dataset2: {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Monthly Savings (Dataset 2)',
      data: [2.3, 2.4, 2.5, 2.6, 3.0, 3.1, 2.8, 3.0, 3.1, 3.0, 2.8, 3.4, 3.3, 3.2, 3.8],
      borderColor: '#E24A4A',
      backgroundColor: 'rgba(226, 74, 74, 0.2)', // Light red fill
      borderWidth: 3,
      fill: true,
      tension: 0.4, // Slight curve for visual variety
    }],
  },
};

// Initialize Line Graph with the first dataset
let currentDataset = 'dataset1';
const lineGraph = new Chart(document.getElementById('lineGraph').getContext('2d'), {
  type: 'line',
  data: lineGraphDataSets[currentDataset],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    plugins: {
      title: {
        display: true,
        text: "US Billionaires Combined Net Worth (2010-2024)",
        font: {
          size: 18
        },
        color: "#ffffff",
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        callbacks: {
          label: function(tooltipItem) {
            return `Savings: $${tooltipItem.raw} Trillion`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
        grid: {
          display: true,
          color: '#ddd',
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
          beginAtZero: true,
        },
        grid: {
          display: true,
          color: '#ddd',
        },
      },
    },
  },
});

// Bar Chart Data
const barChartData = {
  labels: ['Spain GDP', 'Indonesia GDP', 'US Billionaires', 'Netherlands GDP', 'Turkey GDP'],
  datasets: [{
    label: 'Expenditure by Category',
    data: [1.58, 1.37, 1.21, 1.12, 1.11], 
    backgroundColor: [
      '#FABD00', '#FFFFFF', '#98FB98', '#003DA5', '#FF0000',
    ],
    borderColor: '#fff',
    borderWidth: 1,
  }],
};

const barChart = new Chart(document.getElementById('barGraph').getContext('2d'), {
  type: 'bar',
  data: barChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000, 
      easing: 'easeInOutQuad', 
    },
    plugins: {
      title: {
        display: true,
        text: "US Billionaires Income Compares to Countries' GDPs (2023)",
        font: {
          size: 18
        },
        color: "#ffffff",
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw} Trillion`;
          },
        },
      },
    },
  },
});

// Toggle Graph Sections on Button Click
const toggleGraphSection = (graphId) => {
  const sections = ['pie-section', 'line-section', 'bar-section'];
  sections.forEach(id => {
    const section = document.getElementById(id);
    section.style.display = (id === graphId && (section.style.display === 'none' || section.style.display === '')) ? 'block' : 'none';
  });
};

// Add event listener for the Budget button
document.getElementById('budget-toggle').addEventListener('click', () => {
  const budgetSection = document.getElementById('budget-section');
  if (budgetSection.style.display === 'none' || budgetSection.style.display === '') {
    budgetSection.style.display = 'block'; // Show the budget section
  } else {
    budgetSection.style.display = 'none'; // Hide the budget section
  }
});

// Event listeners for toggling graphs
document.getElementById('pie-toggle').addEventListener('click', () => {
  toggleGraphSection('pie-section');
});

document.getElementById('line-toggle').addEventListener('click', () => {
  toggleGraphSection('line-section');
});

document.getElementById('bar-toggle').addEventListener('click', () => {
  toggleGraphSection('bar-section');
});

// Initial setup for graphs and sliders
setInitialSliderMaxValues();
updateBalance();
