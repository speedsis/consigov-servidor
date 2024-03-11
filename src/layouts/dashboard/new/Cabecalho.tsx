import { IconeMenu } from 'src/components/icons';

interface CabecalhoProps {
  titulo: string;
  subTitulo: string;
}

const Cabecalho: React.FC<CabecalhoProps> = (props) => (
  <header>
    <div className="grid fixed w-full  text-white">
      <div className="flex flex-wrap md:flex-no-wrap bg-principal md:px-10 px-2 py-1 items-center">
        <div className="py-1 px-4  border border-transparent hover:border-white rounded">
          <i className="text-2xl"> {IconeMenu} </i>
        </div>

        <div className="flex mx-2 py-2">
          <img src="images/logocesodigital.png" alt="Amazon" className="h-10" />
          {/* <span className=" text-2xl font-bold   pl-1 pt-1">CESO DIGITAL</span> */}
        </div>
        <div className="w-full md:w-auto flex-grow md:ml-3 mr:0 pt-1 order-2 md:order-none" />

        <div className="hidden md:block pb-1 text-xs border border-transparent hover:border-white rounded-sm p-2">
          <p className="leading-3">AUTO CONTRASTE</p>
        </div>
      </div>
    </div>
  </header>
);

export default Cabecalho;
