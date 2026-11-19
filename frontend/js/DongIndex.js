/**
 * 姓名：董琦媛 | 学号：24001010728 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 首页脚本：页面导航渲染 + canvas 粒子网络背景动画
 */

(function () {
  'use strict';

  /* ==================== 页面清单（新建页面后在此处追加） ==================== */
  const DongPages = [
    {
      DongPageName: '首页',
      DongPageFile: 'index.html',
      DongPageDesc: '项目首页：展示项目信息、个人信息与全部页面入口',
      DongPageState: '已完成',
    },
  ];

  const DongHomeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.6 12 3l9 7.6"/><path d="M5 9.6V21h14V9.6"/><path d="M9.5 21v-6h5v6"/></svg>';
  const DongPageIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/></svg>';

  // 渲染页面导航卡片
  function DongRenderPages() {
    const DongPageList = document.getElementById('DongPageList');
    const DongPageCount = document.getElementById('DongPageCount');
    if (!DongPageList) {
      return;
    }

    DongPageList.innerHTML = DongPages.map(function (DongItem) {
      const DongIcon = DongItem.DongPageFile === 'index.html' ? DongHomeIcon : DongPageIcon;
      return (
        '<li class="DongPageItem">' +
          '<a class="DongPageLink" href="' + DongItem.DongPageFile + '">' +
            '<span class="DongPageIcon">' + DongIcon + '</span>' +
            '<span class="DongPageBody">' +
              '<span class="DongPageTitle">' + DongItem.DongPageName +
                '<span class="DongPageState">' + DongItem.DongPageState + '</span>' +
              '</span>' +
              '<span class="DongPageDesc">' + DongItem.DongPageDesc + '</span>' +
            '</span>' +
            '<span class="DongPageArrow">&#8594;</span>' +
          '</a>' +
        '</li>'
      );
    }).join('');

    if (DongPageCount) {
      DongPageCount.textContent = '共 ' + DongPages.length + ' 个页面';
    }

    console.log('[DongIndex] 页面清单：', DongPages);
  }

  /* ==================== canvas 粒子网络背景 ==================== */
  function DongInitBackground() {
    const DongCanvas = document.getElementById('DongCanvasBackground');
    if (!DongCanvas) {
      return;
    }

    const DongCtx = DongCanvas.getContext('2d');
    const DongReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DongPointer = { DongX: null, DongY: null, DongActive: false };
    const DongLinkDistance = 132;
    let DongWidth = 0;
    let DongHeight = 0;
    let DongParticles = [];

    function DongCreateParticles() {
      const DongTotal = Math.min(110, Math.max(36, Math.round((DongWidth * DongHeight) / 17000)));
      DongParticles = [];
      for (let DongIndex = 0; DongIndex < DongTotal; DongIndex++) {
        DongParticles.push({
          DongX: Math.random() * DongWidth,
          DongY: Math.random() * DongHeight,
          DongVx: (Math.random() - 0.5) * 0.42,
          DongVy: (Math.random() - 0.5) * 0.42,
          DongRadius: Math.random() * 1.7 + 0.9,
          DongAlpha: Math.random() * 0.45 + 0.22,
          DongGold: Math.random() > 0.45,
        });
      }
    }

    function DongResizeCanvas() {
      const DongDpr = window.devicePixelRatio || 1;
      DongWidth = window.innerWidth;
      DongHeight = window.innerHeight;
      DongCanvas.width = Math.floor(DongWidth * DongDpr);
      DongCanvas.height = Math.floor(DongHeight * DongDpr);
      DongCanvas.style.width = DongWidth + 'px';
      DongCanvas.style.height = DongHeight + 'px';
      DongCtx.setTransform(DongDpr, 0, 0, DongDpr, 0, 0);
      DongCreateParticles();
    }

    function DongMoveParticles() {
      for (let DongI = 0; DongI < DongParticles.length; DongI++) {
        const DongP = DongParticles[DongI];
        DongP.DongX += DongP.DongVx;
        DongP.DongY += DongP.DongVy;

        if (DongP.DongX < -30) {
          DongP.DongX = DongWidth + 30;
        } else if (DongP.DongX > DongWidth + 30) {
          DongP.DongX = -30;
        }

        if (DongP.DongY < -30) {
          DongP.DongY = DongHeight + 30;
        } else if (DongP.DongY > DongHeight + 30) {
          DongP.DongY = -30;
        }
      }
    }

    function DongDrawLinks() {
      for (let DongI = 0; DongI < DongParticles.length; DongI++) {
        const DongA = DongParticles[DongI];
        for (let DongJ = DongI + 1; DongJ < DongParticles.length; DongJ++) {
          const DongB = DongParticles[DongJ];
          const DongDx = DongA.DongX - DongB.DongX;
          const DongDy = DongA.DongY - DongB.DongY;
          const DongDistance = Math.sqrt(DongDx * DongDx + DongDy * DongDy);

          if (DongDistance < DongLinkDistance) {
            const DongOpacity = (1 - DongDistance / DongLinkDistance) * 0.22;
            DongCtx.strokeStyle = 'rgba(255, 218, 0, ' + DongOpacity.toFixed(3) + ')';
            DongCtx.lineWidth = 0.7;
            DongCtx.beginPath();
            DongCtx.moveTo(DongA.DongX, DongA.DongY);
            DongCtx.lineTo(DongB.DongX, DongB.DongY);
            DongCtx.stroke();
          }
        }
      }
    }

    function DongDrawPointerLinks() {
      if (!DongPointer.DongActive) {
        return;
      }

      for (let DongI = 0; DongI < DongParticles.length; DongI++) {
        const DongP = DongParticles[DongI];
        const DongDx = DongP.DongX - DongPointer.DongX;
        const DongDy = DongP.DongY - DongPointer.DongY;
        const DongDistance = Math.sqrt(DongDx * DongDx + DongDy * DongDy);

        if (DongDistance < 170) {
          const DongOpacity = (1 - DongDistance / 170) * 0.5;
          DongCtx.strokeStyle = 'rgba(255, 255, 255, ' + DongOpacity.toFixed(3) + ')';
          DongCtx.lineWidth = 0.8;
          DongCtx.beginPath();
          DongCtx.moveTo(DongPointer.DongX, DongPointer.DongY);
          DongCtx.lineTo(DongP.DongX, DongP.DongY);
          DongCtx.stroke();
        }
      }
    }

    function DongDrawDots() {
      for (let DongI = 0; DongI < DongParticles.length; DongI++) {
        const DongP = DongParticles[DongI];
        DongCtx.beginPath();
        DongCtx.arc(DongP.DongX, DongP.DongY, DongP.DongRadius, 0, Math.PI * 2);
        DongCtx.fillStyle = DongP.DongGold
          ? 'rgba(255, 218, 0, ' + DongP.DongAlpha + ')'
          : 'rgba(255, 255, 255, ' + DongP.DongAlpha * 0.8 + ')';
        DongCtx.fill();
      }
    }

    function DongDrawFrame() {
      DongCtx.clearRect(0, 0, DongWidth, DongHeight);
      DongMoveParticles();
      DongDrawLinks();
      DongDrawPointerLinks();
      DongDrawDots();
      window.requestAnimationFrame(DongDrawFrame);
    }

    window.addEventListener('resize', DongResizeCanvas);
    window.addEventListener('pointermove', function (DongEvent) {
      DongPointer.DongX = DongEvent.clientX;
      DongPointer.DongY = DongEvent.clientY;
      DongPointer.DongActive = true;
    });
    window.addEventListener('pointerleave', function () {
      DongPointer.DongActive = false;
    });

    DongResizeCanvas();

    if (DongReduceMotion) {
      DongCtx.clearRect(0, 0, DongWidth, DongHeight);
      DongDrawLinks();
      DongDrawDots();
      return;
    }

    DongDrawFrame();
  }

  // 初始化
  DongRenderPages();
  DongInitBackground();
})();
