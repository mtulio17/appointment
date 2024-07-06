// import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import { dataEvents } from "../data/dataEvents";

const EventCard = () => {
  console.log(dataEvents);

  return (
    <div className="flex items-center justify-center min-h-screen transition duration-150 ease-in-out">
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto p-10 cursor-pointer">
        {dataEvents.map((event) => (
          <div className="rounded-lg" key={event.id}>
            <div className="bg-[#fff] rounded-3xl shadow-md transition">
              <div className="w-full h-72 rounded-t-lg overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-3xl m-1"
                />
              </div>
            </div>
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium">{event.title}</h2>
                <div className="text-xs flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${
                        i <= event.rating ? "text-yellow-500" : "text-gray-300"
                      } cursor-pointer mx-1`}
                    />
                  ))}
                </div>
              </div>
            <p className="text-xs font-medium text-gray-600 mb-1">{event.location}</p>
            <p className="text-xs font-medium text-gray-500">
              {new Date(event.start_date).toLocaleDateString()} <br />
              {new Date(event.start_date).toLocaleTimeString()}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// EventCard.propTypes = {
//   event: PropTypes.shape({
//     image_url: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     location: PropTypes.string,
//     start_date: PropTypes.string,
//     rating: PropTypes.number,
//   }).isRequired,
// };

export default EventCard;