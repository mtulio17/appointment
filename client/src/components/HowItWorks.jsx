import {CalendarSearch, Plus} from 'lucide-react'

const HowItWorks = () => {
  return (
    <section className="my-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 lg:px-4">
        <h2 className="text-2xl font-bold text-start mb-10">Cómo funciona Appointment</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-slate-100 rounded-lg p-8 shadow-sm flex-1 cursor-pointer hover:bg-slate-200/50 duration-150">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {/* Asegúrate de que los iconos tengan tamaños definidos */}
                <CalendarSearch className="w-12 h-12 text-Button" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">¿Estás buscando eventos?</h3>
                <p className="text-gray-700 mb-4 font-medium">
                  Descubre quién está organizando eventos relacionados con tus intereses.
                </p>
                <a href="/all-events" className="text-Button hover:underline font-semibold">Buscar eventos</a>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-lg p-8 shadow-sm flex-1 cursor-pointer hover:bg-slate-200/50 duration-150">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Plus className="w-12 h-12 text-Button" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">¿Te animás a crear tu primer evento?</h3>
                <p className="text-gray-700 mb-5 font-medium text-base">
                  Crea tu primer evento y sé el anfitrión de tu propio evento gratis en minutos.
                </p>
                <a href="/post-event" className="text-Button hover:underline font-semibold">Crear evento</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


  export default HowItWorks