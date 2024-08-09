import React from 'react';
import avatar from '../assets/images/user.webp';
import yogaImg from '../assets/images/hero2.jpg';
import { Pin, CalendarClock, TicketPercent, UserCheck, Heart, Share } from "lucide-react";

const participants = [
    { id: 1, name: 'Richie G.', role: 'Co-organizer', isHost: true, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane', role: 'Participant', isHost: false, image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'John', role: 'Participant', isHost: false, image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Emma', role: 'Participant', isHost: false, image: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Liam', role: 'Participant', isHost: false, image: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Ryan', role: 'Co-organizer', isHost: true, image: 'https://via.placeholder.com/50' },
    { id: 7, name: 'Ryan', role: 'Co-organizer', isHost: true, image: 'https://via.placeholder.com/50' },
];

const EventDetails = () => {
    return (
        <div className="relative max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md my-28 ">
            <div className='m-5'>
                <div className='flex align-center justify-between '>
                    <h1 className="text-3xl font-bold mb-4">Yoga al Aire Libre</h1>
                    <button><Heart className='w-6 h-6' /></button>
                </div>
                <div className="flex items-center mb-6">
                    <img src={avatar} alt="Host" className="w-14 h-14 rounded-full mr-4" />
                    <div>
                        <p className="text-sm font-semibold">Anfitrión</p>
                        <p className="text-sm">Richie G.</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center justify-between'>
                    <img src={yogaImg} alt='Yoga' className="max-w-3xl max-h-3xl object-cover rounded-lg mb-4" />
                    <div className="w-full md:w-1/3">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-semibold">Yoga al Aire Libre</p>
                                <button ><Share className='w-5 h-5' /></button>
                                {/* <span className="text-sm text-gray-500 ml-2">Grupo público</span> */}
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-3">
                                <CalendarClock className="w-5 h-5 mr-3 opacity-60" />
                                <span className="mr-2">10-11-2024</span>
                                <span>16:00</span>
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-2">
                                <TicketPercent className="w-5 h-5 mr-3 opacity-60" />
                                <span className="mr-6">$20</span>
                                <UserCheck className="w-5 h-5 mr-2 opacity-60" />
                                <span>5/10 asistirán</span>
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-3 h-auto">
                                <Pin className="w-5 h-5 mr-3 opacity-60" />
                                <span>Parque Guillermina, San Miguel de Tucuman, Tucuman 4000</span>
                            </div>
                            <hr className='py-2' />
                            <div>
                                Aquí iría el mapa de Google
                            </div>
                        </div>
                        <div className="">
                            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-500">
                                Participar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 md:mr-4">
                        <h2 className="text-2xl font-semibold mb-2">Detalles</h2>
                        <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus velit modi porro iure cumque. Expedita voluptate adipisci, neque nesciunt laboriosam ipsam dicta fugit id cupiditate nostrum aliquid, voluptatibus debitis non?
                            Facilis aspernatur autem alias ipsa dignissimos sunt sint sequi placeat expedita molestias quis ratione natus deleniti illo veritatis rerum architecto consequuntur maxime, laboriosam est eius ipsum
                            dolore! Maiores, earum possimus?
                            Sed autem excepturi nihil atque odit voluptate ducimus optio nulla vitae delectus tenetur distinctio numquam, odio fuga earum amet est consectetur accusamus assumenda facere qui iusto corrupti porro eius? Facere?
                            Hic consectetur blanditiis fuga impedit totam consequatur ipsa autem dolor? Perspiciatis id ut veniam! Natus tempore laborum sequi voluptates assumenda quaerat sit adipisci nisi aspernatur soluta?
                            Tempore labore unde dolorem.
                            Minus sequi voluptatum neque beatae officia accusamus iure doloribus qui odit est architecto veritatis iste iusto optio eos quis repellendus expedita sapiente alias, laborum explicabo a. Harum consectetur ut labore!
                            Vero vel excepturi velit magnam eveniet debitis iure incidunt voluptatum dolorem quia assumenda ducimus, consequatur maxime laboriosam. Eum eius natus libero accusamus velit odio nisi, dolor facere necessitatibus tempora nostrum.
                            Ut et, animi laborum fugit, veniam explicabo dolore eius vero optio velit, magnam accusamus itaque. Rem fugiat molestiae repudiandae voluptatem autem. Modi iste, assumenda animi praesentium cumque rem impedit autem?
                            Cumque officia nihil exercitationem inventore non soluta voluptates distinctio sunt, magni atque. Impedit eveniet ratione dolor dolorem. Dolores vel perspiciatis dolore, excepturi ducimus deleniti facere consequuntur aut minima alias reprehenderit.</p>
                    </div>
                </div>
                <div className="max-w-3xl p-4">
                    <div className='flex align-center justify-between my-5'>
                        <h2 className="text-2xl font-semibold">Asistentes ({participants.length}) </h2>
                        <button className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">
                            Ver más
                        </button>
                    </div>
                    <div className='bg-gray-100 px-3 py-3 rounded' >
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
                        {participants.slice(0, 3).map((participant) => (
                            <div key={participant.id} className="bg-white rounded-lg shadow-md p-4 text-center">
                                <img src={participant.image} alt={participant.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
                                <p className="font-semibold">{participant.name}</p>
                                <p className="text-sm text-gray-500">{participant.role}</p>
                                {participant.isHost && <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">Host</span>}
                            </div>
                        ))}

                        {participants.length > 3 && (
                            <div className="bg-white rounded-lg shadow-md p-4 text-center flex items-center justify-center">
                                <div>
                                    <div className="flex align-start justify-center">
                                        {participants.slice(3, 7).map((participant, index) => (
                                            <img
                                                key={participant.id}
                                                src={participant.image}
                                                alt={participant.name}
                                                className="w-16 h-16 rounded-full  mb-2"
                                                style={{ marginLeft: index === 0 ? 0 : '-48px' }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-500 mt-2">+{participants.length - 3} mas</span>

                                </div>

                            </div>
                        )}
                    </div>
                    </div>
            
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
