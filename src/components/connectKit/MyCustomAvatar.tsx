import { Types } from "connectkit";

const MyCustomAvatar = ({ size, radius,}: Types.CustomAvatarProps) => {

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
        background: "#A584EC",
      }}
    >

    </div>
  );
};

export default MyCustomAvatar;
