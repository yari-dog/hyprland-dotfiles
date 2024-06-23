import PopupWindow from '../../.common/widgets/PopupWindow.js';
import Right from './right.js';
import clickCloseRegion from '../../.common/utils/clickCloseRegion.js';
import enableClickThrough from '../../.common/utils/Clickthrough.js';

export default () => PopupWindow({
    keymode: 'on-demand',
    anchor: ['top', 'right', 'bottom', 'left'],
    name: 'right-sidebar',
    layer: 'overlay',
    child: Widget.Overlay({
	overlays: [
	    clickCloseRegion({
		nameToClose: 'right-sidebar',
		fillMonitor: 'hv'
	    }),
	    Widget.Box({
		hpack: 'end',
		vpack: 'start',
		class_name: 'sidebar-container',
		child: Widget.EventBox({
		    class_name: 'sidebar-wrapper',
		    child: Right(),
		})
	    })
	],
    }),
})
