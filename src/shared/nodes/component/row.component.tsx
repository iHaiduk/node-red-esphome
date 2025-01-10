import { getNodeInputName } from '@/share/utils/get-env';
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
  readonly label: string
  readonly placeholder?: string
  readonly icon?: string
  readonly checked?: boolean
  readonly isConfig?: boolean
}) => (
  <div
    className="form-row"
    style={{
      display: 'flex',
      textAlign: 'left',
    }}
  >
    <div
      style={{
        padding: '4px 8px',
        textAlign: 'left',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <label htmlFor={getNodeInputName(name, isConfig)} style={{ margin: 0 }}>
        {isString(icon) && (
          <>
            <i className={`fa ${icon}`}></i>
            {' '}
          </>
        )}
        {label}
      </label>
    </div>
    <div
      style={{
        padding: 8,
        textAlign: 'left',
        flex: 1,
      }}
    >
      <input
        defaultChecked={checked}
        id={getNodeInputName(name, isConfig)}
        name={name}
        placeholder={placeholder ?? label}
        type={isExist(checked) ? 'checkbox' : 'text'}
        style={{
          width: '100%',
          padding: '4px 8px',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />
    </div>
  </div>
);
