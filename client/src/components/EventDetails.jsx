import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession, useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Share, Bookmark } from "lucide-react";
import { MapPin, Calendar } from "lucide-react";
import { getEventParticipants, getSingleEventAndHost, participateInEvent} from "../api/apievents";
import { EmailConfirmationModal } from "./modal/EmailConfirmationModal ";
import { es } from "date-fns/locale";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ShareModal from "./modal/ShareModal";
import EventParticipants from "./EventParticipants";
import useFetch from "../hooks/use-fetch";
import MapComponent from "./MapComponent";
// import { getUserDetailsFromClerk } from "../utils/clerkService";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingParticipation, setLoadingParticipation] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { isLoaded, user } = useUser();
  const { session } = useSession();
  // fetch evento y participantes
  const { isLoading: loadingEvent, data: event, fn: fetchEvent } = useFetch(getSingleEventAndHost, { event_id: id });
  const { isLoading: loadingParticipants, data: participants = [], fn: fetchParticipants } = useFetch(getEventParticipants, { event_id: id });


  console.log(user)

  useEffect(() => {
    if (isLoaded && id) {
      fetchEvent().then(() => {
        fetchParticipants(Number(id));
      });
    }
  }, [isLoaded, id]);
  
  useEffect(() => {
    if (user && participants?.length > 0) {
      setIsParticipating(participants.some((participant) => participant.user_id === user.id));
    }
  }, [user, participants]);


  const openEmailModal = () => {
    if (!user) {
      navigate("/?sign-in=true");
    } else {
      setIsEmailModalOpen(true);
    }
  };

  const handleConfirmEmail = async (email) => {
    setLoadingParticipation(true);
    setIsEmailModalOpen(false);
  
    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
  
      if (!supabaseAccessToken) {
        throw new Error("No se pudo obtener el token de acceso");
      }
  
      const success = await participateInEvent(supabaseAccessToken, id, user.id, email);
      if (!success) {
        toast.success("¡Participación confirmada! Por favor revisa tu casilla de correo para ver la información del evento.");
        setTimeout(() => {
        navigate(0);
        }, 2000); 

        navigate(0);
        return;
      }
  
      await fetchParticipants(Number(id));
      setIsParticipating(true);
  
      toast.success("¡Participación confirmada! Por favor revisa tu casilla de correo para ver la información del evento.");
      setTimeout(() => {
        navigate(0);
      }, 2000); 
  
    } catch (error) {
      toast.error("Hubo un error al participar en el evento.", error.message);
    } finally {
      setLoadingParticipation(false);
    }
  };
  

  const shareModalOpen = () => {
    setIsShareModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeShareModal = () => {
    setIsShareModalOpen(false);
    document.body.style.overflow = "auto";
  };
  
  if (loadingEvent || loadingParticipants) return <BarLoader className="mt-[72px]" width={"100%"} color="#2C2C2C" />;

  if (!event) return <div>Cargando evento...</div>;
  
  const isHost = user?.id === event.host_id;
  const combinedDateTime = new Date(`${event.start_date}T${event.start_time}`);
  const formattedDate = format(combinedDateTime, "d 'de' MMM yyyy", { locale: es });
  const formattedTime = format(combinedDateTime, "HH:mm'hs'");
  

  return (
    <div>
      <div className="my-32 bg-transparent">
        {/* subNav */}
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="lg:text-5xl font-semibold mb-8">{event.name}</h2>
          {/* avatar y host del evento */}
          <div className="flex items-center mt-2">
            {event.host?.avatar_url && (
              <img
                src={event.host.avatar_url}
                alt={event.host.full_name || "Host"}
                className="w-9 h-9 rounded-full border-2 border-gray-300 mr-2"
              />
            )}
            <p className="text-base">
              Organizado por: <span className="font-semibold">{event.host?.full_name || "Host anónimo"}.</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row-reverse lg:justify-between">
          {/* Card Right Section */}
          <div className="lg:w-1/3 p-4 sticky rounded-md">
            <div className="rounded-lg p-4 mb-4 bg-white shadow">
              <div className="mb-4">
                <div className="px-4 justify-center">
                  <p className="lg:text-md font-semibold">{event.name}</p>
                </div>
              </div>
              <div className="flex justify-start items-center ">
                <div>
                  <Calendar
                    className="text-sm text-gray-500 mb-4 mr-2"
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm text-slate-800 mb-4">
                  {formattedDate} - {formattedTime}
                </p>
              </div>
              <div className="flex justify-start items-start bg-white">
                <div>
                  <MapPin
                    className="text-sm text-gray-500 mb-4 mr-2"
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-sm text-slate-800">
                  {event.address}, {event.city}, {event.country}
                </span>
              </div>
            </div>
            {/* Right Section */}
            {/* Mapa */}
            <div className="relative shadow rounded-lg p-4 mb-4">
              <MapComponent
                address={event.address}
                city={event.city}
                count={event.country}
              />
            </div>
          </div>

          {/* Left Section */}
          <div className="max-w-7xl">
            <div className="w-full h-2/2">
              <img
                src={event.image}
                alt={event.name}
                className="flex items-start rounded-sm shadow justify-start object-cover object-contain mb-4"
                style={{ aspectRatio: "16/9" }}
                height={600}
                width={700}
              />
            </div>

            {/* Detalles */}
            <div className="mt-8 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-2">
                Detalles del Evento:
              </h3>
              <p className="mb-2 lg:text-[14px] text-pretty font-normal text-gray-700 lg:leading-7">
                {event.description}
              </p>
            </div>
            <div>
              {/* Participante y modal*/}
              <EventParticipants
                participants={participants}
                hostId={event.host_id}
                isHost={isHost}
                userId={user ? user.id : null}
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="sticky bottom-0 bg-white py-2 border-t border-gray-100">
        <div className="flex justify-between max-w-7xl mx-auto p-2">
          <div>
            <p className="lg:text-md text-black uppercase font-normal">{formattedDate} - {formattedTime}</p>
            <h4 className="lg:text-md font-semibold">{event.name}</h4>
          </div>
          <div className="flex justify-center space-x-8">
            <button className="p-2 rounded-lg hover:text-slate-800 hover:scale-95 duration-300 focus:outline-none">
              <Bookmark className="text-slate-600" size={22} strokeWidth={1.5} />
            </button>
            <button onClick={shareModalOpen} className="border border-gray-300 bg-white text-[#00798a] hover:scale-95 duration-300 px-5 py-3 rounded-lg flex items-center">
              <Share className="mr-3" size={20} /> Compartir
            </button>
            {!isHost && (
              <button onClick={openEmailModal} disabled={loadingParticipation || isParticipating} className={`px-5 py-3 duration-300 rounded-lg text-white ${
                loadingParticipation ? "bg-gray-500" : isParticipating ? "bg-green-600" : "bg-red-500"
              }`}>
                {loadingParticipation ? "Procesando..." : isParticipating ? "Ya formas parte ✅" : "Solicitar unirme"}
              </button>
            )}
          </div>
        </div>
        <ShareModal showModal={isShareModalOpen} closeShareModal={closeShareModal} eventUrl={event.url} />
      </div>
      {isEmailModalOpen && (
        <EmailConfirmationModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} onConfirm={handleConfirmEmail} />
      )}
    </div>
  );
};

export default EventDetails;
