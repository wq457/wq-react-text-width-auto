import * as React from 'react';
import { useEffect, useRef } from 'react';


/**
 * 文本宽度自适应标签组件
 * @param props
 * @constructor
 */
const WidthAutoLabel = (props) => {
    const { children = '' } = props;
    const ref = useRef(null);

    useEffect(() => {
        drawText();
    }, [children])


    const drawText = () => {
        let canvas = ref.current;
        if (!canvas) {
            return;
        }
        let parentNode = canvas.parentNode;
        if (!parentNode) {
            return;
        }
        const { fontSize, fontStyle, fontWeight, fontFamily, color } = getComputedStyle(parentNode, null);
        const { clientWidth, clientHeight } = parentNode;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
        let ctx = canvas.getContext("2d");
        // 设置文本样式
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.textBaseline = 'top';
        let y = Math.ceil((clientHeight - Number(fontSize.replace('px', ''))) / 2);
        let x = 0;
        // 居中显示
        const { width: textWidth } = ctx.measureText(children);
        if (textWidth < clientWidth) {
            x = (clientWidth - textWidth) / 2;
        }
        // 文本颜色
        ctx.fillStyle = color;
        // 绘制文本
        ctx.fillText(children, x, y, clientWidth)
    }

    return (
        <canvas ref={ref}></canvas>
    )
}

export default WidthAutoLabel;
