import { Menu} from '@headlessui/react';
import { Pencil, Trash, X, XCircle } from 'lucide-react';

const OptionsModal = ({ onEdit, onDelete, onCancel }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none">
        Opciones
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="w-5 h-5 mr-2 text-gray-500" />
            Editar
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Trash className="w-5 h-5 mr-2 text-gray-500" />
            Eliminar
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <XCircle className="w-5 h-5 mr-2 text-gray-500" />
            Cancelar
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default OptionsModal;
