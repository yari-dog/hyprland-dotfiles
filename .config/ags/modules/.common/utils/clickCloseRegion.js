import closeWindowOnAllMonitors from "./closeWindowOnAllMonitors.js";

const { Gdk } = imports.gi;

function getMonitorDimensions(monitor) {
    const geometry = Gdk.Display.get_default().get_monitor(monitor).get_geometry()
    return {
		x: geometry.x,
		y: geometry.y,
		width: geometry.width,
		height: geometry.height,
	}
}

export default ({
    nameToClose,
    monitor = 0,
    fillMonitor = '',
    multiMonitor = false,
    expand = true,
}) => {
    const dimensions = getMonitorDimensions(monitor)
    const css = `min-width: ${fillMonitor.includes('h') ? dimensions.width : 0}px;
                 min-height: ${fillMonitor.includes('v') ? dimensions.height : 0}px;`
    
    return Widget.EventBox({
	cursor: 'default',
	child: Widget.Box({
	    expand: expand,
	    css: css,
	}),
	setup: (self) => {
	    self.on('button-press-event', (self, event) => {
		if (multiMonitor) {
		    closeWindowOnAllMonitors(nameToClose)
		}
		App.closeWindow(nameToClose)
	    });
	},
    })
}
