// greeter (& locker at some point)

const greetd = await Service.import('greetd');
export default ({
    monitor,
    ...props
}) => {

    
    const username = Widget.Entry({
	placeholder_text: 'Username',
	class_name: 'greeter-entry txt-large',
	on_accept: () => {
	    password.grab_focus();
	}
    })

    const password = Widget.Entry({
	placeholder_text: 'Password',
	class_name: 'greeter-entry txt-large',
	visibility: false,
	on_accept: async (self) => {

	    // this is fucking awful. you can't actually pop focus off yourself so you have to do this shit.
	    self.can_focus = false;
	    self.editable = false;
	    
	    username.grab_focus();
	    username.can_focus = false;
	    username.editable = false;

	    const err = await props.auth?.(self.text, username.text);
	    if (!err) {
		response.label = 'successful :3';
		response.toggleClassName('greeter-error', false);
		self.toggleClassName('greeter-error', false);
		self.text = '';
		return
	    }

	    response.label = err;
	    self.toggleClassName('greeter-error', true);
	    username.toggleClassName('greeter-error', true);
	    self.can_focus=true;
	    self.editable=true;
	    username.can_focus=true;
	    username.editable=true;
	    self.grab_focus();
	}
    })

    const response = Widget.Label({
	class_name: 'greeter-response greeter-error txt-medium',
    })

    return Widget.Window({
	monitor,
	name: props.name || 'Greeter',
	anchor: ['top','left','right','bottom'],
	layer: 'overlay',
	class_name: 'greeter',
	keymode: 'on-demand',
	child: Widget.Box({
	    vertical: true,
	    hpack: 'center', vpack: 'center',
	    vexpand: true, hexpand: true,
	    class_name: 'greeter-box',
	    homogeneous: false,
	    children: [
		username,
		password,
		response
	    ]
	})
    })
}
