// some logic from end-4
const { GLib } = imports.gi;
import MaterialIcon from './MaterialIcon.js';

function NotificationIcon(notification) {
    if (notification.image) {
	const css = 'background-image: url(' + notification.image + ');';
	return Widget.Box({
	    valign: 'center',
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
    else if (notification_time.get_day_year() == now.get_day_of_year() - 1) time_string = "Yesterday";
    else time_string = notification_time.format('%d/%m');
    
    return Widget.Label({
	class_name: 'txt-smaller txt-semibold notification-time',
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
	class_name: 'txt-smallie notification-title',
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


    // body needs to be truncated if it's too long
    const body_truncated = Widget.Revealer({
	transition: 'slide_down',
	reveal_child: true,
	child: Widget.Label({
	    xalign: 0,
	    class_name: 'txt-smallie notification-body',
	    use_markup: true,
	    justification: 'left',
	    max_width_chars: 1,
	    truncate: 'end',
	    label: notification.body.split("\n")[0],
	}),
    })

    const body = Widget.Revealer({
	transition: 'slide_up',
	reveal_child: false,
	child: Widget.Label({
	    xalign: 0,
	    class_name: 'txt-smallie notification-body',
	    use_markup: true,
	    justification: 'left',
	    max_width_chars: 1,
	    wrap: true,
	    label: notification.body,
	})
    })

    const text = Widget.Box({
	vertical: true,
	hexpand: true,
	vpack: 'center',
	class_name: 'notification-text',
	children: [
	    NotificationTitle(notification),
	    body_truncated,
	    body
	],
    })

    const expand_button = Widget.Button({
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
		const truncated = self.children[0].children[1]
		const body = self.children[0].children[2]
		truncated.reveal_child = !truncated.reveal_child
		if (!truncated.reveal_child) {
		    body.reveal_child = true;
		} else {
		    body.reveal_child = false;
		}
	    }
	},
	children: [
	    text,
	    expand_button,
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

    
    let notification_box = Widget.EventBox({
	attribute : {
	    'id': notification.id,
	    'open': (self) => { self.child.reveal_child = true },
	    'destroy': (self) => {
		self.child.reveal_child = false;
	    },
	    'close': (self) => {
		self.destroy();
	    },
	    'notification': notification,
	},
	class_name: 'notification-box',
	on_primary_click: (self) => {
	    const child = self.child.child.children[1];
	    child.attribute.toggle_expanded(child);
	},
	child: Widget.Revealer({
	    attribute: {
	    },
	    reveal_child: false,
	    transition: 'slide_down',
	    child: Widget.Box({
		hpack: 'center',
		class_name: 'notification',
		children: [
		    icon,
		    text_section,
		],
	    }),
	}),
    });

    return notification_box;
}
