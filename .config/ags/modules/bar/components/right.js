const { GLib } = imports.gi;

function DateClock() {
    return Widget.Box({
        vpack: 'center',
        class_name: "bar-right-dateclock txt-large",
        children: [
            Widget.Label({
                class_name: 'bar-right-time',
                label: GLib.DateTime.new_now_local().format('%H:%M'),
                setup: (self) => self.poll(5000, label => {
                    label.label = GLib.DateTime.new_now_local().format('%H:%M')
                })
            })
        ]
    })
}



export function Right() {
    const right = Widget.Box({
        class_name: 'bar-right-container',
        children: [DateClock()],
    })
    return Widget.EventBox({
        hexpand: false,
        hpack: 'end', //vpack: 'start',
        vexpand: true,
        class_name: 'bar-title bar-right bar-group',
        child: right,
    })
}
