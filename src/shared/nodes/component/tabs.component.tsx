import { getNodeInputName } from '@/share/utils/get-env';

export const Tab = ({
  name,
  isConfig = false,
}: {
  readonly name: string
  readonly isConfig?: boolean
}) => {
  return (
    <div className="form-row">
      <ul
        id={getNodeInputName(name, isConfig)}
        style={{
          background: '#fff',
          minWidth: 600,
          marginBottom: 20,
        }}
      />
    </div>
  );
};
