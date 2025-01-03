import { useEffect, useRef } from "react";
import "./Checkbox.styles.css";
import classNames from "classnames";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
  label?: string;
}

export const Checkbox = ({
  indeterminate = false,
  label,
  color,
  disabled,
  name,
  value,
  onChange,
  checked,
  ...props
}: CheckBoxProps) => {
  const cRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cRef.current) {
      cRef.current.indeterminate = indeterminate;
    }
  }, [cRef, indeterminate]);

  return (
    <div className="checkbox-content">
      <label
        className={classNames(
          { ...props },
          "checkbox",
          indeterminate && "checkbox-indeterminate"
        )}
      >
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          ref={cRef}
        />
      </label>
    </div>
  );
};
