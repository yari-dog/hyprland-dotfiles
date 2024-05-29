import NotificationPopups from './components/notification_popup.js';

export default (monitor = 0) => {
    return Widget.Window({
	monitor: monitor,
	name: `popups-${monitor}`,
	layer: 'top',
	visible: true,
	anchor: ['top'],
	    child: Widget.Box({
		class_name: "osd-window",
		css: 'min-height: 2px;',
		children: [
		    NotificationPopups(monitor)
		],
	    }),
    })
}
