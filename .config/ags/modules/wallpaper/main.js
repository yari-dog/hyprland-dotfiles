import PopupWindow from '../.common/widgets/PopupWindow.js'

// TODO: wallpaper picker? idk i might leave it to a script until
// i rewrite in c
export default () => PopupWindow({
    keymode: 'on-demand',
    name: 'wallpaper-picker',
    anchor: ['top', 'right', 'bottom', 'left'],
}) 
