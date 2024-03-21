/* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';
// import Stripe from 'stripe';
// const stripe = Stripe(
//   'pk_test_51OuD4vSDH3GoCA0gmwFaVU6H8HkZpUNtN4SUcKTOyN9UAq7hDF4MTG0YVlGlJpMmC59K3OIlNmmJDAvCWdJZbkYe00egPNl8IF'
// );

// export const bookTour = async (tourId) => {
//   try {
//     // 1) Get checkout session from API
//     const session = await axios(
//       `http://localhost:5000/api/v1/bookings/checkout-session/${tourId}`
//     );

//     // 2) Create checkout form + chanre credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id,
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
