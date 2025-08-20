const dashboardGrid = document.querySelector('.dashboard-grid');

function renderProfileCard() {
  const profileCardHTML = `
    <div class="profile-card">
      <div class="profile-header">
        <img src="images/image-jeremy.png" alt="Jeremy Robson" class="profile-pic">
        <div class="profile-info">
          <p class="report-for">Report for</p>
          <h1 class="profile-name">Jeremy Robson</h1>
        </div>
      </div>
      <div class="time-frames">
        <a href="#" class="time-frame-link" data-timeframe="daily">Daily</a>
        <a href="#" class="time-frame-link active" data-timeframe="weekly">Weekly</a>
        <a href="#" class="time-frame-link" data-timeframe="monthly">Monthly</a>
      </div>
    </div>
  `;
  dashboardGrid.innerHTML = profileCardHTML;
}


async function renderData(timeframe) {

  const response = await fetch('data.json');
  const data = await response.json();

  const existingCards = document.querySelectorAll('.activity-card');
  existingCards.forEach(card => card.remove());

  const activityCardsHTML = data.map(item => {
    const title = item.title.toLowerCase().replace(' ', '-');
    const current = item.timeframes[timeframe].current;
    const previous = item.timeframes[timeframe].previous;
    const previousLabel = timeframe === 'daily' ? 'Yesterday' : (timeframe === 'weekly' ? 'Last Week' : 'Last Month');

    return `
      <div class="activity-card ${title}-card">
        <div class="card-background-icon"></div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="activity-title">${item.title}</h3>
            <button class="options-btn"></button>
          </div>
          <div class="card-stats">
            <p class="current-time">${current}hrs</p>
            <p class="previous-time">${previousLabel} - ${previous}hrs</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  dashboardGrid.insertAdjacentHTML('beforeend', activityCardsHTML);
}


function addTimeFrameListeners() {
  const timeFrameLinks = document.querySelectorAll('.time-frame-link');
  timeFrameLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

     
      timeFrameLinks.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');

      
      renderData(e.currentTarget.dataset.timeframe);
    });
  });
}


async function initApp() {
  renderProfileCard(); 
  await renderData('weekly');
  addTimeFrameListeners();
}


document.addEventListener('DOMContentLoaded', initApp);