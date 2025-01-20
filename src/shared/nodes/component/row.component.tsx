import { type LocalesEnum } from '@/locale';
import { getNodeInputName, getNodeInputType } from '@/share/utils/get-env';
import { isExist, isString } from '@/share/utils/is-exist';

export const Row = ({
  name,
  label,
  placeholder,
  icon,
  checked,
  isConfig = false,
}: {
  readonly name: string
  readonly label: LocalesEnum
  readonly placeholder?: LocalesEnum
  readonly icon?: string
  readonly checked?: boolean
  readonly isConfig?: boolean
}) => {
  return (
    <div className="form-row">
      <label htmlFor={getNodeInputName(name, isConfig)} style={{ margin: 0 }}>
        {isString(icon) && (
          <>
            <i className={`fa ${icon}`}></i>
            {' '}
          </>
        )}
        <span data-i18n={label}></span>
      </label>
      <input
        data-i18n={`[placeholder]${placeholder ?? label}`}
        defaultChecked={checked}
        id={getNodeInputName(name, isConfig)}
        name={name}
        type={isExist(checked) ? 'checkbox' : 'text'}
      />
      <input id={getNodeInputType(name, isConfig)} type="hidden" />
    </div>
  );
};
