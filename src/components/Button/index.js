import { Link } from "react-router";

const Button = ({
  icon,
  text,
  variant = "light",
  outline,
  size,
  disabled,
  link,
  onClick,
}) => {
  const classNames = [
    "btn",
    outline ? `btn-outline-${variant}` : `btn-${variant}`,
    size && `btn-${size}`,
    disabled && "disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={link} onClick={onClick}>
      <button type="button" className={classNames} disabled={disabled}>
        <span className="d-inline-flex align-items-center gap-1">
          {icon && <i className={`${icon} fs-4`}></i>}
          <span className="text-nowrap">{text}</span>
        </span>
      </button>
    </Link>
  );
};

export default Button;
