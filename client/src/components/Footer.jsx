import { BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className='bg-colorGrey mt-4'>
      <div className='pt-3'>
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

        <ul className='relative flex justify-center m-5 gap-8 '>
          <li className='menu-Item'>
            <a className="text-colorWhite text-sm hover:opacity-40" href="#">Términos</a>
          </li>
          <li className='menu-Item'>
            <a className="text-colorWhite text-sm hover:opacity-40" href="#">Privacidad</a>
          </li>
          <li className='menu-Item'>
            <a className="text-colorWhite text-sm hover:opacity-40" href="#">Cookies</a>
          </li>
        </ul>
      </div>
      <hr className='my-1 w-11/12 mx-auto text-colorWhite text-xs'/>
      <p className='text-colorBlue text-center text-xs'>©2024 All Rights Reserved <span className="font-semibold">Appointmet</span></p>
    </footer>
  )
}

export default Footer