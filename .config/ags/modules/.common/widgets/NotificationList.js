import Notification from './Notification.js';
import isNotificationCenterBlacklist from '../../.common/utils/isNotificationCenterBlacklist.js';
import notificationService from '../../../services/notification_service.js';

export default (is_popup = false) => {
    // get the correct notifications handler
    const notifications = notificationService.getHandler(is_popup);
    
    return Widget.Box({
	hpack: 'center',
	vpack: 'start',
	vertical: true,
	class_name: 'notification-list',
	name: 'notification-list',
	children: [],
	attribute: {
	    'initialised': false,
	    // function to dismiss a notification
	    'dismissed': (self, id, force = false) => {
		// make sure we have an id, and then make sure the child exists
		if (id === undefined) return;
		const child = self.children.find((child) => child.attribute.notification.id === id);
		if (!child) return;

		// check if the call is 'dismissed' or 'closed'
		// if it's 'dismissed' but we aren't a popup list, don't run destroy.
		if (!force && !is_popup) return;

		// actually destroy the child
		child.attribute.destroy(child);
	    },
	    'notified': (self, id) => {
		// init refers to initialising single pre-existing notifications
		// and is called from the load_past method
		// this is to build the past notifications without endlessly recursing
		// id is undefined on service initialisation

		// determin if this is an init call
		// cant do this in setup because notifications.notifications is async
		// so it's empte
		if (id === undefined) return
		// actually do notification shit
		const notification = notifications.getNotification(id);
		if (notification && !notifications.dnd) {
		    // create notification widget
		    const notification_widget = Notification({
			notification: notification,
			is_popup: is_popup
		    });

		    self.children = [notification_widget, ...self.children];
		    notification_widget.attribute.open(notification_widget);
		}
	    },
	    // cant use setup method here cause the notifications.notifications is initialised asynchronously
	    'init': (self) => {
		if (self.attribute.initialised) return
		self.attribute.initialised = true; // stop race condition
		notifications.notifications.forEach((notification) => {
		    self.attribute.notified(self, notification.id)
		})
	    },
	},
	setup: (self) => { // "element" is "self"
	    self 
		.hook(notifications, (element, id) => element.attribute.notified(element, id), 'notified')
		.hook(notifications, (element, id) => element.attribute.dismissed(element, id), 'dismissed')
		.hook(notifications, (element, id) => element.attribute.dismissed(element, id, true), 'closed')
		.hook(notifications, (element) => element.attribute.init(element), 'notified-init');
	},
    });
}
