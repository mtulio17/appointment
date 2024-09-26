import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession, useUser } from "@clerk/clerk-react";
import { saveEvent } from "../api/apievents";
import { BarLoader } from "react-spinners";
import { Share, Bookmark } from "lucide-react";
import ShareModal from './ShareModal'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getEventParticipants, getSingleEvent, participateInEvent } from "../api/apievents";
import useFetch from "../hooks/use-fetch";
import { MapPin, Calendar } from "lucide-react";
import EventParticipantsSection from "./EventParticipantsSection";
import MapComponent from "./MapComponent";



const EventDetails = () => {
  const { id } = useParams();
  const [loadingParticipation, setLoadingParticipation] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded, user } = useUser();
  const { session } = useSession();
  const [isParticipating, setIsParticipating] = useState(false);
  // usar useFetch para obtener el evento y los participantes
  const { isLoading: loadingEvent, data: event, fn: fetchEvent } = useFetch(getSingleEvent, { event_id: id });
  const { isLoading: loadingParticipants, data: participants = [], fn: fetchParticipants } = useFetch(getEventParticipants, { event_id: id });


  useEffect(() => {
    if (isLoaded && id) {
      fetchEvent();
      fetchParticipants(Number(id));  // Asegúrate de pasar el ID correctamente
    }
  }, [isLoaded, id]);


  useEffect(() => {
    if (user && participants) {
      // Verificar si el usuario ya está participando
      setIsParticipating(participants.some(participant => participant.user_id === user.id));
    }
  }, [user, participants]);
  console.log(participants);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleParticipate = async () => {
    if (!user) {
      navigate('/?sign-in=true');
      return;
    }

    setLoadingParticipation(true);
    setIsParticipating(true); // Actualiza el estado localmente antes de hacer la llamada a la API

    try {
      const supabaseAccessToken = await session.getToken({ template: "supabase" });
      if (!supabaseAccessToken) {
        throw new Error('No se pudo obtener el token de acceso');
      }

      const res = await participateInEvent(supabaseAccessToken, id, user.id);
      if (res) {
        // si la participación es exitosa, volvemos a obtener los participantes
        fetchParticipants(Number(id));
        alert('Te has registrado exitosamente en el evento.');
      }
    } catch (error) {
      console.error('Error al participar en el evento:', error);
      setIsParticipating(false); // Revertir el estado si hay un error
    } finally {
      setLoadingParticipation(false);
    }
  };


  if (loadingEvent) return <BarLoader className="mt-[74px]" width={"100%"} color="#2C2C2C" />;
  if (!event) return <div>Evento no encontrado.</div>;

  const isHost = user && user.id === event.host_id;

  const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
  // Formatea la fecha y la hora
  const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
  const formattedTime = format(combinedDateTime, "HH:mm'hs'");

  const shareModalOpen = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };
  return (
    <div>
      <div className="mt-16 bg-white">
          {/* subNav */}
          <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold">
              {event.name}
            </h2>
            <div className='flex items-center ml-4'>
              <img className="w-10 h-10 rounded-full" src={event.host?.image} alt="Host"/>
              <p className="ml-3">
                Anfitrión: <span className="font-semibold">{event.host_id}</span>
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto  p-4 flex flex-col lg:flex-row-reverse lg:justify-between p-4">

            {/* Right Section */}
            <div className="lg:w-1/3 p-4">
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                  <div className="ml-3">
                    <p className="text-md font-bold">{event.name}</p>
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <div>
                    <Calendar className="text-sm text-gray-500 mb-4 mr-2" size={16} />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{formattedDate} - {formattedTime}</p>
                </div>
                <div className="flex justify-start items-start">
                  <div>
                    <MapPin className="text-sm text-gray-500 mb-4 mr-2" size={16} />
                  </div>
                  <span className="text-sm text-gray-500">
                    {event.address}, {event.city}, {event.country}
                  </span>
                </div>
              </div>
              {/* Mapa */}
              {/* <div className="relative border rounded-lg p-4 mb-4">
                <MapComponent address={event.address} city={event.city} count={event.country}/>
              </div> */}
            </div>

            {/* Left Section */}
            <div className="w-2/3 p-4">
              {/* imagen del evento */}
              <div className="w-full h-1/2 overflow-hidden" >
                <img
                  src={event.image}
                  alt={event.name}
                  className=" bject-cover w-full h-full rounded-lg mb-4"
                />
              </div>

              {/* Detalles */}
              <div>
                <h3 className="text-lg font-bold mb-2">Details</h3>
                <p className="mb-4">
                  {event.description}
                </p>
              </div>
              <div>

                {/* Participant y modal*/}
                <EventParticipantsSection participants={participants} hostId={event.host_id} isHost={isHost} userId={user ? user.id : null} />
              </div>
            </div>
          </div>
        
      </div>
      {/* Subfooter */}
      <div className="sticky bottom-0 bg-gray-100 py-4">
          <div className="flex justify-between max-w-7xl mx-auto p-4">
            <div>
              <p className="text-xs text-yellow-800 font-semibold mb-1 uppercase">{formattedDate} - {formattedTime}</p>
              <h4 className="text-md font-bold">{event.name}</h4>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="text-gray-800 p-2 rounded-lg hover:bg-gray-200 focus:outline-none"><Bookmark /></button>
              <button className="border border-gray-300 text-gray-800 text-sm px-2 py-2 rounded-lg flex items-center hover:bg-gray-300 focus:outline-none" onClick={shareModalOpen}><Share className="mr-1" />Compartir</button>
              {/* botón para participar */}
              {!isHost && (
                <button
                  onClick={handleParticipate}
                  disabled={loadingParticipants || isParticipating || loadingParticipation}
                  className={`${isParticipating ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'} text-sm text-white py-2 px-4 rounded-lg hover:bg-red-700`}
                >
                  {loadingParticipation ? 'Procesando...' : (isParticipating ? 'Ya formas parte' : 'Unirme')}
                  {isParticipating && <span className="ml-2">✅</span>}
                </button>
              )}
            </div>
          </div>
          <ShareModal showModal={isShareModalOpen} closeShareModal={closeShareModal} eventUrl={event.url} />
        </div>
    </div>
  );
};

export default EventDetails;
