const hyprland = await Service.import('hyprland');

function ClientTitle() {
    return Widget.Scrollable({
        class_name: 'scrollable',
        propagate_natural_width: true,
	vexpand: true, vpack: 'center',
        min_content_width: 20,
        hscroll: 'automatic', vscroll: 'never',
        child: Widget.Box({
            class_name: 'bar-left-title',
            vertical: true,
            children: [
                Widget.Label({
		    hpack: 'start', vpack: 'end',
                    truncate: 'end',
                    max_width_chars: 30,
                    class_name: "txt-small bar-window-title-class txt",
                    justification: "left",
                    setup: (self) => {
                        self.hook(hyprland.active.client, label => {
                            label.label = hyprland.active.client.class.length === 0 ? 'Desktop' : hyprland.active.client.class;
                        })
                    },
                }),
                Widget.Label({
		    hpack: 'start', vpack: 'start',
                    truncate: 'end',
                    max_width_chars: 30,
                    class_name: "txt-medium bar-window-title-title txt",
                    justification: "left",
                    setup: (self) => {
                        self.hook(hyprland.active.client, label => {
                            label.label = hyprland.active.client.title.length === 0 ? `Workspace ${hyprland.active.workspace.id}` : hyprland.active.client.title;
                        })
                    },
                }),
            ]
        })
    })
}

export function Left() {
    const left = Widget.Box({
	homogeneous: false,
        class_name: 'bar-left-group bar-box',
        children: [ClientTitle()],
    })
    return Widget.EventBox({
	hexpand: false,
	hpack: 'start',
        class_name: 'bar-left bar-group',
	child: left,
    })
}
