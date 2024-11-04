// ==UserScript==
// @name         Narcissists Detector for Shuiyuan（Specialized for Dark Mode）水源自贴表情筛选
// @version      0.21
// @namespace    http://tampermonkey.net/
// @description  Highlight retorts that are made by the original poster to tell if a guy is a NARCISSIST (¬‿¬).
// @author       Rosmontis & Sinsimito
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function () {
  "use strict";
 
  // 处理新的表情
  function highlightRetortIfByOriginalPoster(retortElement) {
    const originalPoster = retortElement.closest(".row").querySelector(".username a").textContent.trim();
    const tooltipText = retortElement.querySelector(".post-retort__tooltip").textContent;
    const firstUser = tooltipText.split("，")[0].split(" ")[0].trim();
    if (firstUser === originalPoster) {
      retortElement.style.backgroundColor = "var(--highlight-medium)";//修改背景颜色为浅色高亮
      //retortElement.style.backgroundColor = "rgba(0, 250, 0, 0.3)"; // 修改背景颜色为半透明的绿色，更兼容暗色水源界面
      //retortElement.style.backgroundColor = "var(--highlight)"; // 默认修改背景颜色高亮
    }else {
      retortElement.style.backgroundColor = ""; // 取消上色
    }
  }
 
  // 定期执行的表情处理
  function performPeriodicCheck() {
    document.querySelectorAll(".post-retort").forEach(highlightRetortIfByOriginalPoster);
  }
 
  // 初始化：处理所有已有的表情
  performPeriodicCheck();
 
  // 每0.4秒执行一次表情处理（提高体验）
  setInterval(performPeriodicCheck, 30);
 
})();
