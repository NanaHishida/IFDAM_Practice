document.addEventListener('DOMContentLoaded', () => {
  const periodType = document.getElementById('periodType');
  const refreshBtn = document.getElementById('refreshIncome');
  const summaries = document.getElementById('summaries');

  function renderSample(){
    // 簡易ダミーデータでカードを更新します
    const type = periodType.value;
    summaries.innerHTML = '';
    if(type === 'month'){
      const months = ['2026年05月','2026年04月','2026年03月'];
      months.forEach(m => {
        const card = document.createElement('article');
        card.className = 'income-card';
        card.innerHTML = `
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <h3 class="card-title">${m}</h3>
              <p class="text-muted">2026-05-01 ～ 2026-05-31</p>
            </div>
            <a href="IncomeDetails.html" class="btn btn-outline-primary">詳細を見る →</a>
          </div>
          <div class="card-body d-flex gap-3 mt-2">
            <div>仕入合計: <strong>¥12,000</strong></div>
            <div>売上合計: <strong>¥50,000</strong></div>
            <div>差引: <strong>¥38,000</strong></div>
          </div>
        `;
        summaries.appendChild(card);
      });
    } else {
      const years = ['2026年','2025年','2024年'];
      years.forEach(y => {
        const card = document.createElement('article');
        card.className = 'income-card';
        card.innerHTML = `
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <h3 class="card-title">${y}</h3>
              <p class="text-muted">${y}-01-01 ～ ${y}-12-31</p>
            </div>
            <a href="IncomeDetails.html" class="btn btn-outline-primary">詳細を見る →</a>
          </div>
          <div class="card-body d-flex gap-3 mt-2">
            <div>仕入合計: <strong>¥120,000</strong></div>
            <div>売上合計: <strong>¥500,000</strong></div>
            <div>差引: <strong>¥380,000</strong></div>
          </div>
        `;
        summaries.appendChild(card);
      });
    }
  }

  refreshBtn.addEventListener('click', () => {
    renderSample();
  });

  // 初期レンダリング
  renderSample();
});
