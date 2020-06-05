$(function () {
    $('#iphone-se').height($(window).height())
})

$(window).on('scroll', function () {
    let scrolled = document.documentElement.scrollTop / 
    (document.documentElement.scrollHeight - 
    document.documentElement.clientHeight)
    // 获得页面卷动百分百 到顶是0 到底是1
    let frame = Math.ceil(scrolled * 84)
    changeFrame(frame)
    // 运行 changeFrame 函数 添加滚动效果
    moveDevice($('#iphone-se'), scrolled, 0.3, 0.6, 0.6, 1)
    // 运行 moveDevice 函数 添加图片平移效果
    showHideText($('.start'), scrolled, 0.0, 0.10, 0.10, 0.20)
    showHideText($('.middle'), scrolled, 0.20, 0.30, 0.30, 0.40)
    showHideText($('.left'), scrolled, 0.40, 0.50, 0.50, 0.60)
    showHideText($('.right'), scrolled, 0.9, 1)
})

const loader = new PxLoader()
const images = []

for (let i = 0; i < 85; i++) {
    images[i]=loader.addImage(`images/iphone-se.${('0' + (i + 1)).slice(-2)}.png`);
}
// 添加图片
loader.addCompletionListener(function () {
    let context = $('#iphone-se')[0].getContext('2d')
    // 获取canvas内的画布
    $('body').addClass('loaded')
    
    context.drawImage(images[0], 0, 0, 432, 976)
    // 将第一张图片放在画布上
})
loader.start()
// 开始下载图片
function changeFrame(frame) {
    let index = frame - 1
    if (index < 0) index = 0
    if (index > 84) index = 84

    let context = $('#iphone-se')[0].getContext('2d')
    context.drawImage(images[index], 0, 0, 432, 976)
}
// 滚动切帧
function moveDevice(el, current, toLeftFrom, toLeftTo, toRightFrom, toRightTo) {
    if (current <= toLeftTo) {
        if (current >= toLeftFrom) {
            let offsetRatio = (current - toLeftFrom) / (toLeftTo - toLeftFrom)
            $(el).css('left', $(el).width() / 2 * -1 * offsetRatio)
        }
    } else {
      let offsetRatio = (current - toRightFrom) / (toRightTo - toRightFrom)
      $(el).css('left', $(el).width() / 2 * -1 + $('#iphone-se').width() * offsetRatio)
    }
}
// 图片平移
function showHideText(el, current, showFrom, showTo, hideFrom, hideTo) {
    if (current < showFrom) {
        $(el).css('opacity', 0)
    }

    if (current >= showFrom && current <= showTo) {
        $(el).css('opacity', (current - showFrom) / (showTo - showFrom))
    }

    if (typeof hideFrom !== 'undefined' && typeof hideTo !== 'undefined') {
        if (current > hideFrom && current <= hideTo) {
            $(el).css('opacity', (hideTo - current) / (hideTo - hideFrom))
        }

        if (current > hideTo) {
            $(el).css('opacity', 0)
        }
    }
}
// 文本淡化