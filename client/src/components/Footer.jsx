import React from 'react';
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"; // Para iconos de redes sociales

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-around items-start px-6">
        {/* Left section */}
        <div className="mb-8 lg:mb-0">
          <h3 className="text-white font-bold mb-4">Crea un evento en Appointment</h3>
          <button className="bg-transparent border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black">
            Comenzar
          </button>
        </div>

        {/* Middle section - Links */}
        <div className="flex flex-col lg:flex-row text-sm space-y-8 lg:space-y-0 lg:space-x-16">
          <div>
            <h4 className="text-white font-semibold mb-4">Tu Cuenta</h4>
            <ul>
              <li><a href="#" className="hover:text-white">Configuraciones</a></li>
              <li><a href="#" className="hover:text-white">Salir</a></li>
              <li><a href="/ayuda" className="hover:text-white">Ayuda</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Discover</h4>
            <ul>
              <li><a href="#" className="hover:text-white">Calendario</a></li>
              <li><a href="#" className="hover:text-white">Topics</a></li>
              <li><a href="#" className="hover:text-white">Cities</a></li>
              <li><a href="#" className="hover:text-white">Online Events</a></li>
              <li><a href="#" className="hover:text-white">Local Guides</a></li>
              <li><a href="#" className="hover:text-white">Make Friends</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Appointment</h4>
            <ul>
              <li><a href="/sobre-nosotros" className="hover:text-white">Nosotros</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6 mt-8 border-t border-gray-600 pt-6">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-6 lg:mb-0">
          <a href="#" className="hover:text-white"><Facebook size={24} /></a>
          <a href="#" className="hover:text-white"><Twitter size={24} /></a>
          <a href="#" className="hover:text-white"><Instagram size={24} /></a>
          <a href="#" className="hover:text-white"><Youtube size={24} /></a>
         
        </div>

        {/* Copyright and Legal Links */}
        <div className="text-sm text-gray-400">
          <p>© 2024 Appointment</p>
          <ul className="flex space-x-4">
            <li><a href="/terminos-de-uso" className="hover:text-white">Terminos de Uso</a></li>
            <li><a href="/politicas-de-privacidad" className="hover:text-white">Politicas de Privacidad</a></li>
            {/* <li><a href="/politicas-de-privacidad" className="hover:text-white"></a></li> */}
            <li><a href="/ayuda" className="hover:text-white">Ayuda</a></li>
          </ul>
        </div>

        {/* App Download Links */}
        <div className="flex space-x-4">
          <a href="#"><img src="https://via.placeholder.com/120x40" alt="Google Play" /></a>
          <a href="#"><img src="https://via.placeholder.com/120x40" alt="App Store" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
