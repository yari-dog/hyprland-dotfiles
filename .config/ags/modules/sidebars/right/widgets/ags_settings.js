import MaterialIcon from '../../../.common/widgets/MaterialIcon.js';
import settings from '../../../../services/settings_service.js';

function SettingSwitch({
    label = 'Setting',
    switch_props = {},
}) {
    return Widget.Box({
	class_name: 'setting-switch-box',
	hpack: 'fill',
	children: [
	    Widget.Label({
		class_name: 'setting-toggle-label',
		label: label,
	    }),
	    Widget.Switch({
		class_name: 'setting-switch',
		setup: (self) => switch_props.setup(self),
		on_activate: (self) => switch_props.on_activate(self),
	    }),
	],
    })
}

function Settings() {
    return Widget.Box({
	class_name: 'settings-box',
	hexpand: true,
	children: [
	    SettingSwitch({
		label: 'Screen Corners',
		switch_props: {
		    setup: (self) => {
			self.set_active(settings.theme.screen_corners);
		    },
		    on_activate: (self) => {
			settings.theme.screen_corners = self.get_active();
		    },
		},
	    }),
	],
    });
}

export default () => {
    return Widget.Box({
	class_name: '',
	children: [
	    Settings(),
	],
    });
}
