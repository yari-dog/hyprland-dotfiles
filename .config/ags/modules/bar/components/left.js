const hyprland = await Service.import('hyprland');

function ClientTitle() {
    return Widget.Scrollable({
        class_name: 'scrollable',
        hexpand: false, vexpand: false,
        propagate_natural_width: true,
        min_content_width: 20,
        hscroll: 'automatic', vscroll: 'never',
        child: Widget.Box({
            class_name: 'bar-left-title',
            vertical: true,
            children: [
                Widget.Label({
                    xalign: 0,
                    truncate: 'end',
                    max_width_chars: 30,
                    class_name: "txt-smaller bar-window-title-class txt",
                    justification: "left",
                    setup: (self) => {
                        self.hook(hyprland.active.client, label => {
                            label.label = hyprland.active.client.class.length === 0 ? 'Desktop' : hyprland.active.client.class;
                        })
                    },
                }),
                Widget.Label({
                    xalign: 0,
                    truncate: 'end',
                    max_width_chars: 30,
                    class_name: "txt-smallish bar-window-title-title txt",
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
        class_name: 'bar-left-container',
        children: [ClientTitle()],
    })
    return Widget.EventBox({
        hexpand: false,
        hpack: 'start', //vpack: 'start',
        vexpand: true,
        class_name: 'bar-title bar-left bar-group',
        child: left,
    })
}
