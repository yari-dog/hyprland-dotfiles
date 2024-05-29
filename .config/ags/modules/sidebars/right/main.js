import PopupWindow from '../../.common/widgets/PopupWindow.js';
import Right from './right.js';
export default () => PopupWindow({
    keymode: 'on-demand',
    anchor: ['top', 'right', 'bottom'],
    name: 'right-sidebar',
    layer: 'overlay',
    child: Right(),
})
