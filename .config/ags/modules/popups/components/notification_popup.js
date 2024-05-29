import NotificationList from '../../.common/widgets/NotificationList.js';

export default (props) => {
    return Widget.Box({
	child: NotificationList(true),
    });
}       
