import { useEffect, useRef } from "react";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
  label?: string;
}

export const Checkbox = ({
  indeterminate = false,
  name,
  value,
  onChange,
  checked,
}: CheckBoxProps) => {
  const cRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cRef.current) {
      cRef.current.indeterminate = indeterminate;
    }
  }, [cRef, indeterminate]);

  return (
    <div>
      <label>
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
