// ags config
import Gdk from 'gi://Gdk'
import GLib from 'gi://GLib'

import settings from './services/settings_service.js'

import { Bar, BarCorners } from './modules/bar/main.js'
import Corner from './modules/screencorners/main.js'
import Popups from './modules/popups/main.js'
import RightSideBar from './modules/sidebars/right/main.js'
// SCSS compilation
const COMPILED_STYLE_DIR = `${GLib.get_user_cache_dir()}/ags/user/generated`
const STATE_DIR = `${GLib.get_user_state_dir()}`

Utils.exec(`mkdir -p "${GLib.get_user_state_dir()}/ags/scss"`);
Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicwal.scss'`); // reset music styles
Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicmaterial.scss'`); // reset music styles
async function applyStyle() {
    Utils.exec(`mkdir -p ${COMPILED_STYLE_DIR}`);
    Utils.exec(`sass -I "${GLib.get_user_state_dir()}/ags/scss" -I "${App.configDir}/scss/fallback" "${App.configDir}/scss/main.scss" "${COMPILED_STYLE_DIR}/style.css"`);
    App.resetCss();
    App.applyCss(`${COMPILED_STYLE_DIR}/style.css`);
    console.log('[LOG] Styles loaded')
}
applyStyle().catch(print);

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
