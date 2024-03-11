import router from 'next/router';

import {
  IconeBell,
  IconeHome,
  IconeLogout,
  IconeSerch,
  IconeServices,
  IconeSettings,
} from 'src/components/icons';

import MenuItem from './MenuItem';

// interface MenuLateralProps {
//     titulo: string
//     subTitulo: string
//     children?: any
// }

const MenuLateral: React.FC = (props) => (
  <aside
    className={`
                col-span-1 pt-24 hidden md:block  md:px-10
                my-2   text-xs 
        `}
  >
    <ul className="flex-grow">
      <MenuItem url="/" texto="Início" icone={IconeHome} />

      <MenuItem url="/service" texto="Serviços" icone={IconeServices} />

      <MenuItem url="/search" texto="Consultas" icone={IconeSerch} />
    </ul>
    <ul>
      <MenuItem
        onClick={() => {}}
        texto="Sair"
        icone={IconeLogout}
        className={`
                         text-red-600   
                         dark:text-red-200  dark:hover:bg-blu-800
                     `}
      />
    </ul>
  </aside>
);

export default MenuLateral;
