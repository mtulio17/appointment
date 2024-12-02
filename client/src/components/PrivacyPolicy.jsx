import React from 'react';
import BackButton from '../ui/button/BackButton';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy p-8 my-32 max-w-6xl mx-auto bg-transparent text-justify rounded-lg">
       <div className="absolute top-30 left-16 mb-10">
        <BackButton label="Volver" />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-ambar-700"><strong>Política de Privacidad</strong></h1>
      <p className="text-sm text-gray-500 mb-4"><strong>Fecha de vigencia:</strong> 15 de Agosto de 2024</p>

      <p className="mb-6 text-gray-700">
        Nuestra Política de Privacidad explica cómo Appointment recopila, usa y divulga información sobre ti. 
        Los términos “Appointment,” “nosotros,” “nuestro” y “nos” incluyen a Appointment LLC y nuestras afiliadas. 
        Los términos “miembro,” “tú” y “tu” se refieren a cualquier persona que use nuestra Plataforma o asista a eventos relacionados, 
        incluyendo cualquier organización o persona que use la Plataforma en nombre de una organización. 
        Esta Política de Privacidad se aplica al procesamiento de información de miembros y otras personas que recopilamos 
        cuando usas nuestra &quot;Plataforma&quot;, que incluye cualquier sitio web, aplicación o servicio que ofrecemos, o cuando te comunicas con nosotros.
      </p>

      <p className="mb-6 text-gray-700">
        Para más información sobre las opciones que podrías tener bajo esta política, consulta la sección “Tus Opciones” a continuación. 
        Esta Política de Privacidad no se aplica a la información que podrías proporcionar a terceros, como miembros u otros con quienes 
        puedas compartir información personal. Para más detalles sobre el alcance de nuestra Política de Privacidad, consulta la Sección 4.5.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-ambar-600">1. Recopilación de Información</h2>
      <p className="mb-4 text-gray-700">
        Recopilamos información sobre ti cuando:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Creas una cuenta;</li>
          <li>Usas la Plataforma;</li>
          <li>Asistes a un evento;</li>
          <li>Visitas nuestro sitio web;</li>
          <li>Te comunicas con nosotros.</li>
        </ul>
        También recopilamos información como estadísticas de uso mediante cookies, registros de servidores y tecnologías similares. 
        Si eliges usar ciertas funciones, también recopilamos información de otras fuentes, como servicios de redes sociales, invitaciones y contactos importados.
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">1.1 Información que nos proporcionas</h3>
      <p className="mb-4 text-gray-700">
        Recopilamos la información que nos proporcionas directamente, por ejemplo, cuando creas una cuenta, 
        seleccionas intereses o grupos, completas un formulario o te comunicas con nosotros. 
        Los tipos de información que podríamos recopilar incluyen:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Identificadores como tu nombre, nombre de usuario, contraseña, dirección de correo electrónico, dirección postal y número de teléfono;</li>
          <li>Información de pago y comercial, como el método de pago y las compras realizadas;</li>
          <li>Información demográfica y cualquier otra información personal que elijas proporcionar, como fotos, intereses, género, fecha de nacimiento, grupos a los que te unes, y datos laborales o profesionales.</li>
        </ul>
        Cierta información, como tu género y fecha de nacimiento, es opcional, pero necesaria para algunas funciones, como mostrar que eres miembro de los grupos que elijas. 
        Tu elección de grupos también es opcional, pero es necesaria para administrar tu cuenta.
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">1.2 Información que recopilamos automáticamente</h3>
      <p className="mb-4 text-gray-700">
        Cuando usas nuestra Plataforma, recopilamos información automáticamente sobre tu actividad en internet y otros datos electrónicos, como:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Información de registros: Incluye el tipo de navegador que utilizas, el tiempo y la frecuencia de tu acceso, las páginas vistas en la Plataforma, tu dirección IP, y la página que visitaste antes de llegar a nuestra Plataforma.</li>
          <li>Información del dispositivo: Datos sobre el dispositivo que utilizas para acceder a la Plataforma, como el modelo de hardware, sistema operativo, identificadores únicos y red móvil.</li>
          <li>Información de geolocalización: Podríamos recopilar información sobre la ubicación de tu dispositivo cada vez que uses la Plataforma si has dado tu consentimiento para ello.</li>
          <li>Información de cookies y tecnologías de rastreo: Usamos cookies y etiquetas de píxel para mejorar nuestra Plataforma, tu experiencia y monitorear el uso de la Plataforma. También podríamos recopilar otras informaciones de tu dispositivo, como fotos o datos de tu calendario, si nos das permiso.</li>
        </ul>
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">1.3 Información que recopilamos de otras fuentes</h3>
      <p className="mb-4 text-gray-700">
        Podemos recopilar información de otras fuentes si decides usar ciertas características de la Plataforma, como:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Servicios de redes sociales: Si te registras o inicias sesión a través de una red social, tendremos acceso a cierta información de tu cuenta en ese servicio, como tu nombre y otra información.</li>
          <li>Contenido de los miembros: También podemos recibir información sobre ti cuando tú u otros miembros suben fotos o publican contenido en la Plataforma.</li>
          <li>Afiliadas corporativas: Podríamos recibir información sobre ti de nuestras afiliadas corporativas actuales o futuras.</li>
          <li>Otras fuentes de terceros: Podríamos obtener información de fuentes públicas o comerciales, como redes publicitarias y otros proveedores de servicios.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-ambar-600">2. Uso de la Información</h2>
      <p className="mb-4 text-gray-700">Usamos la información recopilada para:</p>
      <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
        <li>Operar, mejorar, promover y proteger Appointment y nuestra Plataforma;</li>
        <li>Comunicarnos contigo; y</li>
        <li>Personalizar el contenido que ves en la Plataforma.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">2.1 Operación de nuestra Plataforma</h3>
      <p className="mb-6 text-gray-700">
        Usamos la información para operar nuestra Plataforma, lo que incluye:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Proporcionar, mantener y mejorar la Plataforma;</li>
          <li>Mostrar información sobre ti en tu perfil;</li>
          <li>Personalizar el contenido de la Plataforma según tus intereses;</li>
          <li>Monitorear y analizar tendencias de uso en la Plataforma;</li>
          <li>Prevenir fraudes y actividades ilegales; y</li>
          <li>Realizar tareas administrativas y legales.</li>
        </ul>
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">2.2 Comunicación contigo</h3>
      <p className="mb-6 text-gray-700">
        Podemos usar la información para responder a tus comentarios o preguntas, y para enviarte avisos técnicos, actualizaciones de seguridad y otros mensajes de soporte.
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">2.3 Publicidad y otros usos</h3>
      <p className="mb-6 text-gray-700">
        Usamos la información para:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>Ofrecer contenido que coincida con tus intereses;</li>
          <li>Enviarte comunicaciones de marketing, según lo permita la ley;</li>
          <li>Mejorar la relevancia de la publicidad que ves en y fuera de la Plataforma; y</li>
          <li>Facilitar concursos y promociones.</li>
        </ul>
      </p>

      <h3 className="text-xl font-semibold mb-4 text-ambar-500">2.4 Base legal para el procesamiento</h3>
      <p className="mb-6 text-gray-700">
        Dependiendo de tu jurisdicción, procesamos tu información bajo diferentes bases legales, como el cumplimiento de nuestros Términos de Servicio, 
        nuestros intereses legítimos, tu consentimiento o cuando sea necesario para cumplir con una obligación legal.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-ambar-600">3. Compartir información</h2>
      <p className="mb-6 text-gray-700">
        No compartimos tu información personal salvo en los casos descritos en esta política. Podríamos divulgar información:
        <ul className="list-disc list-inside pl-6 mb-6 space-y-2 text-gray-700">
          <li>A otros miembros o servicios de redes sociales, dependiendo de cómo interactúas en la Plataforma;</li>
          <li>A proveedores de servicios que nos ayudan a operar o mejorar nuestra Plataforma;</li>
          <li>Para cumplir con obligaciones legales o proteger nuestros derechos;</li>
          <li>En una transacción corporativa o entre nuestras empresas afiliadas;</li>
          <li>Según lo indiques al usar la Plataforma.</li>
        </ul>
        También podríamos compartir información de manera anónima o agregada, la cual no está sujeta a esta Política de Privacidad.
      </p>

    </div>
  );
};

export default PrivacyPolicy;

