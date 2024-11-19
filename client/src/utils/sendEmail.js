// import emailjs from "@emailjs/browser";

// export const sendEmail = (user, event) => {
//     const params = {
//       user_name: user.fullName || user.name,
//       user_email: user.email,
//       event_name: event.name,
//       event_date: `${event.start_date} ${event.start_time}`,
//       event_location: `${event.address}, ${event.city}, ${event.country}`,
//     }; 

//     emailjs.send('service_widi06p', 'template_jucttkb', params, 'uzTjaS01_juZxiRKq')
//       .then(response => {
//         console.log('Correo enviado exitosamente!', response.status, response.text);
//       })
//       .catch(err => console.error('Error al enviar el correo:', err));
//   };
 