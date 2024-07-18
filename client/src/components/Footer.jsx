import { BsFacebook, BsInstagram } from "react-icons/bs";
import calendar from '../assets/images/calendar3.png';


const Footer = () => {
  return (
    // <footer className='bg-colorGrey mt-4'>
    //   <div className='pt-3'>
    //     <ul className='relative flex justify-center m-5 gap-5'>
    //       <li className='socialIcons-Item'>
    //         <a className="text-facebook text-xl hover:opacity-20" href="">
    //           <h5><BsFacebook /></h5>
    //         </a>
    //       </li>
    //       <li className='socialIcons-Item'>
    //         <a className="text-instagram text-xl hover:opacity-20" href="">
    //           <h5><BsInstagram /></h5>
    //         </a>
    //       </li>
    //     </ul>

    //     <ul className='relative flex justify-center m-5 gap-8 '>
    //       <li className='menu-Item'>
    //         <a className="text-colorWhite text-sm hover:opacity-40" href="#">Términos</a>
    //       </li>
    //       <li className='menu-Item'>
    //         <a className="text-colorWhite text-sm hover:opacity-40" href="#">Nosotros</a>
    //       </li>
    //       <li className='menu-Item'>
    //         <a className="text-colorWhite text-sm hover:opacity-40" href="#">Cookies</a>
    //       </li>
    //     </ul>
    //   </div>
    //   <hr className='my-1 w-11/12 mx-auto text-colorWhite text-xs'/>
    //   <p className='text-colorBlue '>©2024 All Rights Reserved <span className="font-semibold">Appointmet</span></p>
    // </footer>
    <footer className="bg-ButtonHover text-white rounded-t-lg bg-gradient-to-b from-ButtonHover to-Button">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <img className="h-40 sm:h-28 md:h-40 w-50 drop-shadow-2xl" src={calendar} alt="Appointment Logo" />
          <p className="text-center text-xs">© 2024 Todos los derechos reservados.</p>
        </div>
        <div className="flex space-x-4 ">
          <a href="/" className="text-sm text-center hover:underline">Inicio</a>
          <a href="#" className="text-sm text-center hover:underline">Sobre Nosotros</a>
          <a href="#" className="text-sm text-center hover:underline">Contacto</a>
          <a href="#" className="text-sm text-center hover:underline">Política de Privacidad</a>
        </div>
        <ul className='relative flex justify-center m-5 gap-5'>
          <li className='socialIcons-Item'>
            <a className="text-facebook text-xl hover:opacity-20" href="">
              <h5><BsFacebook /></h5>
            </a>
          </li>
          <li className='socialIcons-Item'>
            <a className="text-instagram text-xl hover:opacity-20" href="">
              <h5><BsInstagram /></h5>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer