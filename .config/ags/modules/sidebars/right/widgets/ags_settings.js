import MaterialIcon from '../../../.common/widgets/MaterialIcon.js';
import settings from '../../../../services/settings_service.js';
import theme from '../../../../services/theme_service.js';


// general settings
// label    | (child)

function SettingItem({
    label = 'Setting',
    label_props = {
	hexpand: true,
    },
    child = Widget.Box(),
}) {
    return Widget.Box({
	class_name: 'setting-item-box',
	hexpand: true,
	children: [
	    Widget.Label({
		class_name: 'setting-item-label',
		label: label,
		hpack: 'start',
		...label_props,
	    }),
	    child,
	],
    })
}

function SettingSwitch({
    label = 'Setting',
    switch_props = {
	field: 'setting',
	extra_setup: (self) => {},
	on_activate_extra: (self) => {},
    },
}) {
    return SettingItem({
	label: label,
	child: Widget.Switch({
	    class_name: 'setting-switch',
	    cursor: 'pointer',
	    setup: (self) => {
		self.set_active(settings.get_field(switch_props.field));
		self.hook(settings, (self, setting) => {
		    // get last record from dot notation of field
		    const field_str = switch_props.field.split('.').reduce((o, i) => o[i], settings.settings);

		    // if the field has been modified, update the switch
		    // and call the extra activate function
		    if (settings.is_modified(field_str, setting)) {
			self.set_active(settings.get_field(switch_props.field));
			switch_props.hook_extra?.(self);
		    }
		}, 'modified');
		switch_props.extra_setup?.(self);
	    },
	    on_activate: (self) => {
		settings.set_field(switch_props.field, self.get_active());
		switch_props.on_activate_extra?.(self);
	    },
	}),
    })
}

function ScreenCorners() {
    return SettingSwitch({
	label: 'Screen Corners',
	switch_props: {
	    field: 'theme.screen_corners',
	},
    })
}

function LightMode() {
    return SettingSwitch({
	label: 'Light Mode',
	switch_props: {
	    field: 'theme.light_mode',
	},
    })
}

function Transparency() {
    return SettingSwitch({
	label: 'Transparent',
	switch_props: {
	    field: 'theme.transparent',
	},
	on_activate_extra: (self) => {
	    // toggle transparency slider visibility
	}
    })
}

function Settings() {
    return Widget.Box({
	class_name: 'settings-box',
	vertical: true,
	hexpand: true,
	children: [
	    ScreenCorners(),
	    //LightMode(),
	    Transparency(),
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
