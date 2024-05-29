import Notification from './Notification.js';
const notifications = await Service.import('notifications');

export default (is_popup = false) => {
    return Widget.Box({
	hpack: 'center',
	vertical: true,
	class_name: 'notification-list',
	name: 'notification-list',
	children: notifications.popups.map(Notification),
	attribute: {
	    // function to dismiss a notification
	    'dismissed': (self, id) => {
		// make sure we have an id
		if (!id) return;
		const child = self.children.find((child) => child.attribute.id === id);
		// destroy the notification
		if (!child) return;
		child.attribute.destroy(child);
	    },
	    'notified': (self, id) => {
		const notification = notifications.getNotification(id);
		if (notification && !notifications.dnd) {
		    // make sure notification isn't spotify if it's not a popup
		    if (!is_popup && notification.app_name === 'Spotify') return;
		    // append to start of list
		    const notification_widget = Notification(notification, is_popup);
		    self.children = [notification_widget, ...self.children];
		    notification_widget.attribute.open(notification_widget);
		    
		}
	    },
	},
	setup: (self) => self // "element" is "self"
	    .hook(notifications, (element, id) => element.attribute.notified(element, id), 'notified')
	    .hook(notifications, (element, id) => element.attribute.dismissed(element, id), 'dismissed')
	    .hook(notifications, (element, id) => element.attribute.dismissed(element, id), 'closed')
	,
    });
}
