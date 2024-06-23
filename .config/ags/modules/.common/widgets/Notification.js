// some logic from end-4
const { GLib } = imports.gi;
const hyprland = await Service.import('hyprland');
import service from '../../../services/notification_service.js';
import MaterialIcon from './MaterialIcon.js';

function NotificationIcon(notification) {
    if (notification.image) {
	const css = 'background-image: url(' + notification.image + ');';
	return Widget.Box({
	    vpack: 'center',
	    hpack: 'center',
	    hexpand: false,
	    class_name: 'notification-icon notification-icon-image',
	    css: `background-image: url("${notification.image}");`,
	});
    }
    
    let icon = 'NO_ICON';
    if (Utils.lookUpIcon(notification.app_icon)) icon = notification.app_icon;
    if (Utils.lookUpIcon(notification.app_entry)) icon = notification.app_entry;

    return Widget.Box({
	vpack: 'center',
	hpack: 'center',
	hexpand: false,
	class_name: 'notification-icon notification-icon-' + notification.urgency,
	child: (icon != 'NO_ICON' ? 
		Widget.Icon({
		    icon: icon,
		    vpack: 'center',
		    hexpand: true,
		}) :
		MaterialIcon('chat', 'hugerass', {hexpand: true})
	       )
    });
}

function NotificationTime(notification) {
    
    const now = GLib.DateTime.new_now_local()
    const notification_time = GLib.DateTime.new_from_unix_local(notification.time);
    
    let time_string = ''
    if (notification_time.get_day_of_year() == now.get_day_of_year()) time_string = notification_time.format('%H:%M');
    else if (notification_time.get_day_of_year() == now.get_day_of_year() - 1) time_string = "Yesterday";
    else time_string = notification_time.format('%d/%m');
    
    return Widget.Label({
	class_name: 'txt txt-smaller txt-semibold notification-time',
	justification: 'right',
	vpack: 'center',
	label: time_string,
    })
}

function NotificationTitle(notification) {
    const title = Widget.Label({
	xalign: 0,
	hexpand: true,
	justification: 'left',
	class_name: 'txt txt-smallie notification-title',
	max_width_chars: 1,
	truncate: 'end',
	label: notification.summary,
    })
    const time = NotificationTime(notification)
    
    return Widget.Box({
	children: [
	    title,
	    time,
	],
    })
}


function NotificationTextSection(notification, is_popup = false) {

    // firstly, check if the notification is a popup
    // or if it's a notification in the notification center (right-sidebar)
    // this is important because the close button should behave differently depending on the context
    const close_command = (is_popup ?
			   () => notification.dismiss() :
			   () => notification.close())


    const actions = [...notification.actions.map((action) => {
	return Widget.Button({
	    class_name: 'notification-action txt',
	    label: action.label,
	    on_clicked: () => {
		notification.invoke(action.id);
	    },
	})
    })]


    
    // body needs to be truncated if it's too long
    const body_truncated = Widget.Revealer({
	transition: 'slide_down',
	reveal_child: true,
	child: Widget.Label({
	    hpack: 'start',
	    class_name: 'txt txt-smallie notification-body',
	    use_markup: true,
	    justification: 'left',
	    lines: 1,
	    truncate: 'end',
	    label: notification.body.split("\n")[0],
	}),
    })
    
    const body = Widget.Revealer({
	transition: 'slide_up',
	reveal_child: false,
	child: Widget.Box({
	    class_name: 'notification-body-full',
	    vertical: true,
	    children: [
		Widget.Label({
		    hpack: 'start',
		    class_name: 'txt txt-smallie notification-body',
		    use_markup: true,
		    justification: 'left',
		    wrap: true,
		    label: notification.body,
		}),
		...actions,
	    ],
	})
    })



    const body_box = Widget.Box({
	vertical: true,
	class_name: 'notification-body-box',
	attribute: {
	    // if the label is not truncated, or if the body only has a label and no actions.
	    'should_truncate': (self) => {
		const truncated_body_revealer = self.children[1];
		const truncated_body_label = truncated_body_revealer.child;
		const body_actions = notification.actions;

		// log the body actions
		// check if there's only 1 action and that action is "default"
		let has_actions = true;
		if (body_actions.length == 1) {
		    if (body_actions[0].id == "default") has_actions = false;
		} else if (body_actions.length == 0) {
		    has_actions = false;
		}

		return (truncated_body_label.get_layout().is_ellipsized() ||
			truncated_body_label.label !== notification.body ||
			has_actions);
	    },
	    'toggle_expanded': (self) => {
		if (!self.attribute.should_truncate(self)) return;
		const body = self.children[0]
		const truncated = self.children[1];
		truncated.reveal_child = !truncated.reveal_child
		if (!truncated.reveal_child) {
		    body.reveal_child = true;
		} else {
		    body.reveal_child = false;
		}
	    },
	},
	hexpand: false,
	children: [
	    body,
	    body_truncated,
	],
    })

    const text = Widget.Box({
	attribute: {
	    'should_truncate': (self) => {
		return self.children[1].attribute.should_truncate(self.children[1]);
	    },
	    'toggle_expanded': (self) => {
		self.children[1].attribute.toggle_expanded(self.children[1]);
	    }
	},
	vertical: true,
	hexpand: true, vexpand: true,
	vpack: 'center',
	class_name: 'notification-text',
	children: [
	    NotificationTitle(notification),
	    body_box,
	],
    })

    const close_button = Widget.Button({
	vpack: 'start',
	class_name: 'notification-expand-button',
	on_clicked: (self) => {
	    close_command()
	},
	child: MaterialIcon('close', 'norm', {
	    vpack: 'center',
	}),
    });

    return Widget.Box({
	attribute: {
	    'toggle_expanded': (self) => {
		self.children[0].attribute.toggle_expanded(self.children[0]);
	    },
	    'should_truncate': (self) => {
		return self.children[0].attribute.should_truncate(self.children[0]);
	    },
	},
	children: [
	    text,
	    close_button,
	],   
    })
}


export default ({
    notification = {},
    is_popup = false,
    ...props
}= {}) => {
    
    const text_section = NotificationTextSection(notification, is_popup);
    const icon = Widget.Box({
	child: NotificationIcon(notification),
    });

    const notification_content = Widget.Box({
	hexpand: true,
	class_name: 'notification',
	children: [
	    icon,
	    text_section,
	],
    });

    const event_box_wrapper = Widget.EventBox({
	cursor: 'pointer',

	// clicking the box should by default open the notification
	// but if it's expanded (or it can't be expanded) it should open the notification
	attribute: {
	    'should_truncate': (self) => {
		return self.child.children[1].attribute.should_truncate(self.child.children[1]);
	    },
	    'expand': (self) => {
		self.child.children[1].attribute.toggle_expanded(self.child.children[1]);
	    },
	    'open': (self, forced = false) => {
		// i don't think hyprland automatically focuses to the workspace with the notification so i'm doing it manually
		// find the workspace with the notification
		const clients = hyprland.clients;
		let client = null;
		for (let i = 0; i < clients.length; i++) {
		    if (clients[i].class === notification.appEntry) {
			client = hyprland.getClient(clients[i].address);
			break;
		    }
		}

		if (!client) return;
		hyprland.messageAsync(`dispatch focuswindow ${client.class}`)
		if (!forced) notification.invoke("default");
	    },
	    'click': (self) => {
		if (self.attribute.should_truncate(self)) {
		    self.attribute.expand(self);
		    return;
		}
		
		self.attribute.open(self);
	    },
	},
	on_primary_click: (self) => {
	    self.attribute.click(self);
	},
	child: notification_content,
    });
    
    let notification_box = Widget.Revealer({
	reveal_child: false,
	hexpand: true,
	transition: 'slide_down',
	attribute : {
	    'id': notification.id,
	    'isDestroyed': false,
	    'open': (self) => { self.reveal_child = true },
	    'destroy': (self) => {
		self.sensitive = false;
		self.reveal_child = false;
		self.attribute.isDestroyed = true;
		Utils.timeout(500, () => {
		    if (!self.isDestroyed) self.destroy();
		});
	    },
	    'close': (self) => {
		self.attribute.notification.close();
	    },
	    'invoked': (self, action) => {
		if (!action) return;
		if (action === 'default') {
		    self.child.attribute.open(self.child, true);
		}
	    },
	    'notification': notification,
	},
	class_name: 'notification-box',
	child: event_box_wrapper,
	setup: (self) => {
	    self.hook(notification, (self, action) => self.attribute.invoked(self, action), 'invoked');
	}
    });

    return notification_box;
}
