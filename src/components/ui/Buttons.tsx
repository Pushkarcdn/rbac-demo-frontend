/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

interface ButtonProps {
  title: string;
  className?: string;
  link?: string;
  type?: "submit" | "reset";
  onClick?: any;
  disabled?: boolean;
}

const commonclassName =
  "text-center text-sm py-3 px-5 sm:px-8 text-nowrap font-medium rounded-lg flex justify-center items-center rounded-md transition cursor-pointer";

const LinkBtn = ({ title, link, className }: ButtonProps) => {
  return (
    <Link href={link ? link : "#"} className={className}>
      {title}
    </Link>
  );
};

const TypeBtn = ({ type, className, title }: ButtonProps) => {
  return (
    <button type={type} className={className}>
      {title}
    </button>
  );
};

const ClickBtn = ({ onClick, className, title }: ButtonProps) => {
  return (
    <>
      {onClick && (
        <button onClick={onClick} className={className}>
          {title}
        </button>
      )}
    </>
  );
};

export function PrimaryButton({
  title,
  className,
  link,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const myclassName = `${commonclassName} bg-primary text-white hover:bg-primary-dark ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <>
      {link && <LinkBtn title={title} className={myclassName} link={link} />}

      {type && <TypeBtn title={title} className={myclassName} type={type} />}

      {onClick && (
        <ClickBtn title={title} className={myclassName} onClick={onClick} />
      )}
    </>
  );
}

export function PrimaryOutlineButton({
  title,
  className,
  link,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const myclassName = `${commonclassName} border-2 border-primary text-primary hover:bg-primary hover:text-white ${className} !py-2.5 ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <>
      {link && <LinkBtn title={title} className={myclassName} link={link} />}

      {type && <TypeBtn title={title} className={myclassName} type={type} />}

      {onClick && (
        <ClickBtn title={title} className={myclassName} onClick={onClick} />
      )}
    </>
  );
}

export function SecondaryOutlineButton({
  title,
  className,
  link,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const myclassName = `${commonclassName} border-2 border-secondary text-secondary hover:bg-secondary hover:text-white ${className} !py-2.5 ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <>
      {link && <LinkBtn title={title} className={myclassName} link={link} />}

      {type && <TypeBtn title={title} className={myclassName} type={type} />}

      {onClick && (
        <ClickBtn title={title} className={myclassName} onClick={onClick} />
      )}
    </>
  );
}
