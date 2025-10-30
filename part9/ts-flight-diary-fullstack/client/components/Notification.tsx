import type { NotificationType } from "../../shared/types";

interface NotificationProps {
  notification: NotificationType;
}

const Notification = (props: NotificationProps) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (props.notification.message === null) {
    return null;
  } else {
    notificationStyle.color = props.notification.isAlert ? "red" : "green";
    return (
      <div style={notificationStyle}>
        <p> {props.notification.message} </p>
      </div>
    );
  }
};

export default Notification;
