import { Workspaces } from './components/workspaces.js'
import { Left } from './components/left.js'
import { Right } from './components/right.js'
import Corner from "../.common/widgets/Corner.js"

function BarLayoutNormal() {
    return Widget.CenterBox({
        class_name: 'bar-layout-normal',
        homogeneous: false,
        start_widget: Left(),
        center_widget: Workspaces(),
        end_widget: Right(),
    })
}

export function Bar(monitor = 0) {

    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        anchor: ['top','left','right'],
        exclusivity: 'exclusive',
        visible: true,
        class_name: 'bar',
        child: Widget.Stack({
            class_name: 'bar-background',
            children: [
                BarLayoutNormal(),
            ]
        })
    })
}


export function BarCorners(monitor = 0) {
    return [
        Widget.Window({
            monitor,
            name: `bar-corner-tl${monitor}`,
            anchor: ['top','left'],
            exclusivity: 'exclusive',
            visible: true,
            class_name: '',
            child: Corner('top-left', { class_name: 'bar-corner' })
        }),
        Widget.Window({
            monitor,
            name: `bar-corner-tr${monitor}`,
            anchor: ['top','right'],
            exclusivity: 'exclusive',
            visible: true,
            class_name: '',
            child: Corner('top-right', { class_name: 'bar-corner' })
        }),
    ]
}
