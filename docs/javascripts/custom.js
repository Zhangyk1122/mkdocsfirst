// docs/javascripts/custom.js

// 更新时间
function updateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const timeString = now.toLocaleString('zh-CN', options);
  document.getElementById('current-time').textContent = timeString;
}

// 文字逐个散开效果
function initTextEffect() {
  const textContainer = document.getElementById('text-container');
  const text = "静，不在于耳边无声，而在于内心无争"; // 要显示的文字
  textContainer.innerHTML = ''; // 清空容器

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '&nbsp;' : char;
    span.classList.add('spread-out-text');

    const delay = index * 0.1; // 每个字符延迟 0.1 秒
    const offset = (index - (text.length - 1) / 2) * 10; // 字符向左右偏移

    span.style.setProperty('--delay', `${delay}s`);
    span.style.setProperty('--offset', `${offset}px`);

    textContainer.appendChild(span);
  });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  updateTime(); // 更新时间
  setInterval(updateTime, 1000); // 每秒更新一次时间
  initTextEffect(); // 初始化文字效果
});