// This exports the Workspaces function

const hyprland = await Service.import('hyprland')
const SHOWN = 10; // the number of workspaces that should be shown at all times

const dispatch = (argument) => {
    hyprland.messageAsync(`dispatch workspace ${argument}`)
}


// GroupingActiveStatus is a class that holds the grouping status of a workspace
// background_grouping is a string that represents either the start, middle, end or only of a grouping
// foreground_grouping is a string that represents the start, middle, end, or only of a grouping
// active is a boolean that represents whether the workspace is currently active
class GroupingActiveStatus {
    constructor(active, id, group = null) {
        this.background_grouping
        //this.foreground_grouping
        this.active = active
        this.in_use = group !== null ? true : false
        this.id = id
        this.group = group
        this.determined = false
    }

    setGrouping(grouping) {
        this.background_grouping = grouping
    }

    isActiveOnSecondaryMonitor() {
        const monitors = hyprland.monitors;
        if (monitors.length > 1) {
            // iterate through monitors and check if the 'active' workspace is on the monitor
            for (let i = 0; i < monitors.length; i++) {
                if (monitors[i].activeWorkspace.id === this.id && this.id !== hyprland.active.workspace.id) {
                    return true;
                }
            }
        }
    }

    determineGrouping() {
        let grouping
        if (this.id === this.group.start && this.id === this.group.end) {
            grouping = 'only';
        } else if (this.id === this.group.start) {
            grouping = 'start';
        } else if (this.id === this.group.end) {
            grouping = 'end';
        } else grouping = 'middle';
        this.setGrouping(grouping)
        this.determined = true
    }

    getLabel() {
        if (!this.in_use) return '○';
        if (this.active) return '●';
        if (this.isActiveOnSecondaryMonitor()) return '●';
        return `${this.id}`;
    }

    getClassName() {
	const size = 'txt-small'
        if (!this.in_use) return `bar-workspaces-workspace ${size}`;
        if (!this.determined) this.determineGrouping();
        const active = this.active ? 'bar-workspaces-workspace-active' : ''
        const altActive = this.isActiveOnSecondaryMonitor() ? 'bar-workspaces-workspace-in-use-alt-monitor' : ''
        return `bar-workspaces-workspace bar-workspaces-workspace-in-use ${active} ${altActive} bar-workspaces-workspace-background-${this.background_grouping} ${size}`;
    }
}

class Group {
    constructor() {
        this.start;
        this.end;
    }
}

const getGroupingStatus = (index) => {
    const active = hyprland.active.workspace.id === index;
    // iterate through Hyprland.workspaces, sorting the array of objects by the id attribute
    // the workspace array only contains the workspaces that are currently in use
    // // 1, 2, 4, 10
    const workspaces = hyprland.workspaces.sort((a, b) => a.id - b.id);

    // is the index in the array of workspaces? if not, return early to avoid unnecessary computation
    if (!workspaces.some(workspace => workspace.id === index)) {
        return new GroupingActiveStatus(false, index);
    }

    // group the workspaces into groups of adjacent workspaces
    // 1, 2, 4, 10 -> [1, 2], [4], [10]
    let current_group = new Group();
    current_group.start = workspaces[0].id;
    for (let i = 1; i < workspaces.length; i++) {
        if (workspaces[i].id - workspaces[i - 1].id > 1) {
            current_group.end = workspaces[i - 1].id;
            // check if index is in the current group
            // if it is break early
            if (index >= current_group.start && index <= current_group.end) {
                break;
            }
            current_group = new Group();
            current_group.start = workspaces[i].id;
        }
    }

    // check if the last group has had its end set and if not, set it
    if (current_group.end === undefined) {
        current_group.end = workspaces[workspaces.length - 1].id;
    }

    // the current group is the group that the index is in
    // just need to determine if the index is the start, middle, end or only of the group
    return new GroupingActiveStatus(active, index, current_group)
}

// widget should look like:

// (o) • • (• •) • • • for bars
// adjacent in-use workspaces should have a joint background, with borders
// the currently active workspaces should have a larger dot in the center
// other in-use workspaces should have a -, and adjacent in-use ones should connect

export function Workspaces() {
    const workspaces = Widget.Box({
	vexpand: true,
        class_name: 'bar-workspaces-container bar-group-child',
        children: Array.from({length: SHOWN}, (_, i) => i + 1).map(i => Widget.Button({
            child: Widget.Box({
                attribute: i,
                vpack: 'center',
                hpack: 'center',
                class_name: 'bar-workspaces-workspace',
                child: Widget.Label({
                    label: '',
                    vpack: 'center', hpack: 'center',
                    hexpand: true, vexpand: true,
                    justification: 'fill',
                }),
                setup: (self) => self.hook(hyprland, (label) => {
                    let group = getGroupingStatus(self.attribute);
                    label.child.label = group.getLabel();
                    label.class_name = group.getClassName();
                    return
                }),
            }),
            onClicked: (self) => dispatch(self.child.attribute),
        }))
    })

    return Widget.EventBox({
        vexpand: true,
        hpack: 'center', vpack: 'end',
        class_name: 'bar-workspaces bar-island bar-group',
	cursor: 'pointer',
        child: workspaces,
    })
}
