// 赛博朋克特效
document.addEventListener('DOMContentLoaded', function() {
    // 添加鼠标跟踪光效
    createMouseTracker();
    
    // 添加随机闪烁效果
    createGlitchEffect();
    
    // 添加数字雨效果（轻量版）
    createDigitalRain();
});

// 鼠标跟踪光效
function createMouseTracker() {
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // 添加光标样式
    const style = document.createElement('style');
    style.textContent = `
        .cyber-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

// 随机闪烁效果
function createGlitchEffect() {
    const elements = document.querySelectorAll('.hero-title, .section-title');
    
    elements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% 概率触发
                element.style.textShadow = '2px 0 #00d4ff, -2px 0 #8b5cf6';
                setTimeout(() => {
                    element.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
                }, 100);
            }
        }, 2000);
    });
}

// 轻量数字雨效果
function createDigitalRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 复制微信号功能
function copyWechatId() {
    const wechatId = 'Yzm_Nuyoah';
    const btn = document.querySelector('.copy-wechat-btn');
    
    // 使用现代的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(wechatId).then(() => {
            showCopySuccess(btn);
        }).catch(() => {
            // 如果失败，使用备用方法
            fallbackCopyTextToClipboard(wechatId, btn);
        });
    } else {
        // 使用备用方法
        fallbackCopyTextToClipboard(wechatId, btn);
    }
}

// 备用复制方法
function fallbackCopyTextToClipboard(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(btn);
    } catch (err) {
        console.error('复制失败:', err);
        showCopyError(btn);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功状态
function showCopySuccess(btn) {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
    
    setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalText;
    }, 2000);
}

// 显示复制失败状态
function showCopyError(btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-times"></i> 复制失败';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
}

// 平滑滚动
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});