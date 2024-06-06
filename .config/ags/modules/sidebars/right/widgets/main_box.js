import MaterialIcon from '../../../.common/widgets/MaterialIcon.js'
import Notifications from './notifications.js'
import AGSSettings from './ags_settings.js'


export default () => {
    const stack = Widget.Stack({
	transition: 'slide_right',
	homogeneous: false,
	hhomogeneous: false,
	children: {
	    'notifications': Notifications(),
	    'settings': AGSSettings(),
	},
	setup: (self) => {
	    self.shown =   'notifications'
	}
    })
    
    const switcher = Widget.Box({
	class_name: 'sidebar-switcher',
	hpack: 'center',
	children: [
	    Widget.Button({
		cursor: 'pointer',
		class_name: 'switcher-button',
		attribute: {
		    'name': 'notifications',
		},
		child: MaterialIcon('notifications', 'large txt', {}),
	    }),
	    Widget.Button({
		cursor: 'pointer',
		class_name: 'switcher-button',
		attribute: {
		    'name': 'settings',
		},
		child: MaterialIcon('settings', 'large txt', {}),
	    })
	]
    })
    return Widget.Box({
	class_name: 'sidebar-section',
	vertical: true,
	children: [
	    switcher,
	    stack,
	],
	setup: (self) => {
	    switcher.children.forEach((child) => {
		child.onClicked = () => {
		    self.attribute.activate(self, child)
		}
	    });
	},
	attribute: {
	    'activate': (self, caller) => {
		switcher.children.forEach((child) => {
		    child.toggleClassName('active', false)
		});
		stack.shown = caller.attribute.name
		caller.toggleClassName('active', true)
	    }
	}
    })
}
