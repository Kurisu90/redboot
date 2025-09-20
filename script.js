// 获取元素
const boat = document.getElementById('boat');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// 动画变量
let animationId = null;
let position = -100;
let speed = 2;
let direction = 1;

// 动画函数
function animate() {
    // 更新位置
    position += speed * direction;
    
    // 获取容器宽度
    const containerWidth = document.querySelector('.boat-container').offsetWidth;
    const boatWidth = boat.offsetWidth;
    
    // 检查边界
    if (position > containerWidth) {
        position = -boatWidth;
    } else if (position < -boatWidth) {
        position = containerWidth;
        direction = -direction; // 改变方向
    }
    
    // 应用位置
    boat.style.left = position + 'px';
    
    // 继续动画
    animationId = requestAnimationFrame(animate);
}

// 开始动画
function startAnimation() {
    if (animationId === null) {
        // 重置方向为向右
        direction = 1;
        // 如果船在屏幕外左侧，将其移到右侧外
        const containerWidth = document.querySelector('.boat-container').offsetWidth;
        const boatWidth = boat.offsetWidth;
        if (position < -boatWidth) {
            position = containerWidth;
        }
        animate();
    }
}

// 停止动画
function stopAnimation() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// 事件监听器
startBtn.addEventListener('click', startAnimation);
stopBtn.addEventListener('click', stopAnimation);

// 页面加载完成后自动开始动画
window.addEventListener('load', startAnimation);

// 窗口大小改变时调整船的位置
window.addEventListener('resize', function() {
    const containerWidth = document.querySelector('.boat-container').offsetWidth;
    const boatWidth = boat.offsetWidth;
    
    // 确保船在容器内或合理位置
    if (position > containerWidth) {
        position = containerWidth - boatWidth;
    } else if (position < -boatWidth) {
        position = -boatWidth;
    }
});