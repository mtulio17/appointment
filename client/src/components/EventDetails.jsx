import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession, useUser }from "@clerk/clerk-react";
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
import { getUserDetailsFromClerk } from "../utils/clerkService";


const EventDetails = () => {
  const { id } = useParams();
  const [loadingParticipation, setLoadingParticipation] = useState(false);
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [hostDetails, setHostDetails] = useState(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded, user } = useUser();
  const { session } = useSession();
  const [isParticipating, setIsParticipating] = useState(false);
  // const [participantDetails, setParticipantDetails] = useState([]);
  // usar useFetch para obtener el evento y los participantes
  const { isLoading: loadingEvent, data: event, fn: fetchEvent } = useFetch(getSingleEvent, { event_id: id });
  const { isLoading: loadingParticipants, data: participants = [], fn: fetchParticipants } = useFetch(getEventParticipants, { event_id: id });


  useEffect(() => {
    if (isLoaded && id) {
      fetchEvent();
      fetchParticipants(Number(id));  // Asegúrate de pasar el ID correctamente
    }
  }, [isLoaded, id]);

  console.log(user)


  useEffect(() => {
    if (user && participants) {
      setIsParticipating(participants.some(participant => participant.user_id === user.id));  // verificar si el usuario ya está participando
    }
  }, [user, participants]);

  // console.log(participants);

  useEffect(() => {
    const fetchHostDetails = async () => {
      if (event?.host_id) {
        try {
          // Obtener los detalles del host desde Clerk usando su host_id
          const host = await getUserDetailsFromClerk(event.host_id);
          setHostDetails(host); // Guardar los detalles del host en el estado
        } catch (error) {
          console.error('Error obteniendo detalles del host:', error);
        }
      }
    };
    fetchHostDetails();
  }, [event?.host_id]); 


  // useEffect(() => {
  //   const fetchParticipantsDetails = async () => {
  //     try {
  //       const details = await Promise.all(
  //         participants.map(async (participant) => {
  //           const userDetails = await getUserDetailsFromClerk(participant.user_id);
  //           return { ...participant, ...userDetails }; 
  //         })
  //       );
  //       setParticipantDetails(details);
  //     } catch (error) {
  //       console.error('Error al obtener detalles de los participantes:', error);
  //     }
  //   };
  
  //   if (Array.isArray(participants) && participants.length > 0) {
  //     fetchParticipantsDetails();
  //   }
  // }, [participants]);
  

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
  
  useEffect(() => {
    if (isShareModalOpen) {
      document.body.style.overflow = 'hidden'; // Desactiva el scroll
    } else {
      document.body.style.overflow = 'unset'; // Restablece el scroll
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShareModalOpen]);


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

  if (loadingEvent || loadingParticipants) return <BarLoader className="mt-[72px]" width={"100%"} color="#2C2C2C" />;

  if (!event) return <div>Cargando evento...</div>;
  
  
  
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
      <div className="my-32 bg-transparent">
          {/* subNav */}
          <div className="max-w-7xl mx-auto p-4">
            <h2 className="lg:text-4xl font-semibold mb-4">{event.name}</h2>
            <div className='flex items-center'>
            {/* Mostrar avatar y nombre del anfitrión si están disponibles */}
            {hostDetails ? (
                <>
                  <img className="lg:w-8 lg:h-8 rounded-full" src={hostDetails.imageUrl} alt={hostDetails.username} />
                  <p className="ml-3 text-sm">
                    Organizado por: <span className="font-semibold lg:w-96 text-wrap">{hostDetails.username}.</span>
                  </p>
                </>
              ) : (
                <p className="text-base font-normal animate-fade">Cargando datos del anfitrión...</p>
              )}
          </div>
          </div>
          <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row-reverse lg:justify-between">
            {/* Card Right Section */}
            <div className="lg:w-1/3 p-4 sticky rounded-md">
              <div className="rounded-lg p-4 mb-4 bg-white shadow">
                <div className="mb-4">
                  <div className="mr-3 flex text-center justify-center">
                    <p className="lg:text-md font-semibold">{event.name}</p>
                  </div>
                </div>
                <div className="flex justify-start items-center ">
                  <div>
                    <Calendar className="text-sm text-gray-500 mb-4 mr-2" size={16} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-slate-800 mb-4">{formattedDate} - {formattedTime}</p>
                </div>
                <div className="flex justify-start items-start bg-white">
                  <div>
                    <MapPin className="text-sm text-gray-500 mb-4 mr-2" size={16} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-slate-800">
                    {event.address}, {event.city}, {event.country}
                  </span>
                </div>
              </div>
            {/* Right Section */}
              {/* Mapa */}
              <div className="relative shadow rounded-lg p-4 mb-4">
                <MapComponent address={event.address} city={event.city} count={event.country}/>
              </div>
            </div>

            {/* Left Section */}
            <div className="max-w-7xl">
              {/* imagen del evento */}
              <div className="w-full h-1/2 overflow-hidden" >
                <img
                  src={event.image}
                  alt={event.name}
                  className="flex items-start justify-start object-cover object-contain rounded-md mb-4 pt-4"
                  style={{ aspectRatio: "16/9" }}
                  height={400}
                  width={740}
                />
              </div>

              {/* Detalles */}
              <div className="mt-4 w-4xl">
                <h3 className="text-lg font-semibold mb-2">Detalles del Evento</h3>
                <p className="mb-2 lg:text-sm max-w-2xl text-pretty font-normal text-gray-600 leading-8">
                  {event.description}
                </p>
              </div>
              <div>
                {/* Participant y modal*/}
                <EventParticipantsSection 
                 participants={participants}
                 hostId={event.host_id} 
                 isHost={isHost} 
                 userId={user ? user.id : null} />
              </div>
              </div>
             </div>
          </div>
      {/* Subfooter */}
      <div className="sticky bottom-0 bg-white py-4 border-t border-gray-100">
          <div className="flex justify-between max-w-7xl mx-auto p-4">
            <div>
              <p className="lg:text-md text-black uppercase font-normal mb-1">{formattedDate} - {formattedTime}</p>
              <h4 className="lg:text-md font-semibold">{event.name}</h4>
            </div>
            <div className="flex justify-center space-x-8">
              <button className="p-2 rounded-lg hover:text-slate-800 hover:scale-95 duration-300 focus:outline-none">
                <Bookmark className="text-slate-600" size={22} strokeWidth={1.5}/>
              </button>
              <button className="border border-gray-300 bg-white text-[#00798a] border-[#00798a] font-medium text-base px-5 py-3 rounded-lg flex items-center text-center hover:scale-95 duration-300 focus:outline-none" onClick={shareModalOpen}>
                <Share className="mr-3 flex justify-start" size={20} />
                Compartir
              </button>
              {/* botón para participar */}
              {!isHost && (
                <button
                  onClick={handleParticipate}
                  disabled={loadingParticipants || isParticipating || loadingParticipation}
                  className={`${isParticipating ? 'bg-[#f65858]/50 cursor-not-allowed' : 'bg-[#f65858]'} text-base text-white font-medium px-5 py-3 rounded-lg`}
                >
                  {loadingParticipation ? 'Procesando...' : (isParticipating ? 'Ya formas parte' : 'Solicitar unirme')}
                  {isParticipating && <span className="ml-2 text-sm">✅</span>}
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
