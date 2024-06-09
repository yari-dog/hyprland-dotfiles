// ags config
import Gdk from 'gi://Gdk'
import GLib from 'gi://GLib'

import settings from './services/settings_service.js'
import theme from './services/theme_service.js'

import { Bar, BarCorners } from './modules/bar/main.js'
import Corner from './modules/screencorners/main.js'
import Popups from './modules/popups/main.js'
import RightSideBar from './modules/sidebars/right/main.js'
// SCSS compilation
const COMPILED_STYLE_DIR = `${GLib.get_user_cache_dir()}/ags/user/generated`
const STATE_DIR = `${GLib.get_user_state_dir()}`

await theme.init().catch(print);

// Some utility for monitors
const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
function forMonitors(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).map(widget).flat(1);
}
function forMonitorsAsync(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).forEach((n) => widget(n))
}


// actually do shit
const Windows = () => [
    // cornes
    forMonitors((id) => Corner(id, 'bottom-left', true)),
    forMonitors((id) => Corner(id, 'bottom-right', true)),
    forMonitors((id) => Corner(id, 'top-left', true)),
    forMonitors((id) => Corner(id, 'top-right', true)),

    // popups (notifs, colorscheme etc)
    forMonitors(Popups),

    // sidebars
    RightSideBar(),
]

App.config({
  windows: Windows().flat(1),
})
forMonitors(Bar)
forMonitors((id) => BarCorners(id))
