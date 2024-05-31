import PopupWindow from '../../.common/widgets/PopupWindow.js';
import Right from './right.js';
import clickCloseRegion from '../../.common/utils/clickCloseRegion.js';

export default () => PopupWindow({
    keymode: 'on-demand',
    anchor: ['top', 'right', 'bottom'],
    name: 'right-sidebar',
    layer: 'overlay',
    child: Widget.Box({
	children: [
	    clickCloseRegion({
		nameToClose: 'right-sidebar',
		fillMonitor: 'hv'
	    }),
	    Right(),
	],
    }),
})
