import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Search from './components/Search';
import SignIn from './components/SignIn';
import Favorites from './pages/Favorites';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import Success from './components/Success';
import './App.css';

function App() {
  const foodItems = [
    {
      id: 1,
      food: 'Loaded Bread Stix',
      price: 99,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/o0zibtrbtyjwznptrsgy',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 2,
      food: 'Corn & Cheese Pizza',
      price: 159,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/ckbnw98n6tffy50wvuzm',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 3,
      food: 'Tandoori Paneer Pizza',
      price: 209,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/s5ld93rsknx0fhj6xarn',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 4,
      food: 'Sausage Pizza',
      price: 209,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/aylqpxx08pltowbzxhd3',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 5,
      food: 'Murg Malai Chicken',
      price: 239,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/t1stinhga3alitdpr6yt',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 6,
      food: 'Spicy Baked Chicken',
      price: 239,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/aeems3ogejdzxfjblkx7',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 7,
      food: 'Loaded Chicken BBQ',
      price: 239,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/5410d354e29d05ebbdc0337436c1f67e',
      name: 'Pizza Hut',
      rating: 4.2,
    },
    {
      id: 8,
      food: 'Mini Treat',
      price: 599,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/c09a7c9a2104893edc7c800a1f38d858',
      name: 'The Belgian Waffle Co.',
      rating: 4.6,
    },
    {
      id: 9,
      food: 'Best Of The Best',
      price: 660,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/fc529e8c5a543ceb729d7786d1b01858',
      name: 'The Belgian Waffle Co.',
      rating: 4.6,
    },
    {
      id: 10,
      food: 'Chocolate Waffle Cake',
      price: 580,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/g7v2sn7eezaricdwqcfz',
      name: 'The Belgian Waffle Co.',
      rating: 4.6,
    },
    {
      id: 11,
      food: 'Blazing Chicken Pizza',
      price: 548,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/10/17/ac6f8b27-ee28-46b6-b106-226976ad2008_5e3d3531-285b-472c-8a89-94b69b24337c.jpg',
      name: "Domino's Pizza",
      rating: 4.3,
    },
    {
      id: 12,
      food: 'Cheesy American BBQ',
      price: 299,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/8/9/4718095a-49f3-4187-bf43-399f691ab36e_c981dc74-f278-4d81-a1fb-a23ff33da533.png',
      name: 'Subway',
      rating: 4.0,
    },
    {
      id: 13,
      food: 'Chicken Keema Melt',
      price: 279,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/8/9/4f573dca-8418-445e-8e20-74422a632e24_c7127eea-abae-40df-a2b8-2f10278e63cd.png',
      name: 'Subway',
      rating: 4.0,
    },
    {
      id: 14,
      food: 'Double Chicken Roll',
      price: 169,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/ebcda29a62123bbf8bb8a33bbe2ab847',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 15,
      food: 'Spicy Chicken Meal',
      price: 369,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/5/16/97be0ab8-8b40-41fc-926d-5a0da1feda91_b258475e-5a12-46d1-a5a5-618b3c49e62e.jpg',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 16,
      food: 'Spicy Zinger Burger',
      price: 219,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/13/c399fbf4-8312-48c0-b661-fa2e052845cf_c96b26a6-55c6-43ff-8231-03e6c10cc4b6.jpg',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 17,
      food: 'Biryani',
      price: 220,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/wqbd9zvrtiwxyqhnmliy',
      name: 'Ambur Biryani',
      rating: 4.4,
    },
    {
      id: 18,
      food: 'Saucy Chicken Wings',
      price: 149,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/9/18/3fa2b21a-5ac9-43a8-9c83-46160d33fa55_dc4b5ac7-afb8-48e4-9c12-d1063e0b237a.jpg',
      name: 'Chicken Fiesta',
      rating: 4.2,
    },
    {
      id: 19,
      food: 'Taco Mexicana',
      price: 189,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/118610bb1b497c0090177b709a452636',
      name: 'Chicken Fiesta',
      rating: 4.2,
    },
    {
      id: 20,
      food: 'Boneless Chicken Basket',
      price: 309,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/FOOD_CATALOG/IMAGES/CMS/2024/7/4/7864c235-8882-410e-a47e-15fc70bd5511_b96c1c69-7cf8-41f1-b9c9-e76c17fdaf42.jpg',
      name: 'Popeyes',
      rating: 4.5,
    },
    {
      id: 21,
      food: 'Spicy Chicken Meal',
      price: 369,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/5/16/97be0ab8-8b40-41fc-926d-5a0da1feda91_b258475e-5a12-46d1-a5a5-618b3c49e62e.jpg',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 22,
      food: 'Spicy Zinger Burger',
      price: 219,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/4/13/c399fbf4-8312-48c0-b661-fa2e052845cf_c96b26a6-55c6-43ff-8231-03e6c10cc4b6.jpg',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 23,
      food: 'Chicken Keema Melt',
      price: 279,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/8/9/4f573dca-8418-445e-8e20-74422a632e24_c7127eea-abae-40df-a2b8-2f10278e63cd.png',
      name: 'Subway',
      rating: 4.0,
    },
    {
      id: 24,
      food: 'Classic Roll',
      price: 100,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/ebd8e706049e4fd5ca79ecf708f8ecba',
      name: 'KFC',
      rating: 4.3,
    },
    {
      id: 25,
      food: 'Briyani',
      price: 230,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f60a7f94250ee888893cf2c1a546e732',
      name: 'SS Hyderabad Briyani',
      rating: 4.2,
    },
    {
      id: 26,
      food: 'Smoky Shawarma Combo',
      price: 379,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/9/11/b7684420-c68a-4ed5-a0d6-d73f1fc84d85_d1cd389c-fdb3-498a-98d6-a113c46fbf32.jpeg',
      name: 'Faasos Wraps',
      rating: 4.2,
    },
    {
      id: 27,
      food: 'Alphonso Ice Cream',
      price: 380,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/h8uh8fb7gvbipfhpbuzp',
      name: 'Baskin Robbins',
      rating: 4.2,
    },
    {
      id: 28,
      food: 'Smoky Chicken Wrap Combo',
      price: 379,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/28/119c8f39-b82b-43b6-8d06-e0eb959a33d7_364920.JPG',
      name: 'Faasos Wraps',
      rating: 4.2,
    },
    {
      id: 29,
      food: 'Crispy Chicken Sandwich',
      price: 100,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/aabvgaoaldfyo4ckxd81',
      name: 'Sandwich Club',
      rating: 4.5,
    },
    {
      id: 30,
      food: 'Burger Wraps',
      price: 200,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/7/27/ee2bb107-5603-4be5-8b58-86534ffccf0b_bb45a561-950e-41f8-9095-4a4041ce5e93.jpeg',
      name: 'Faasos Wraps',
      rating: 4.2,
    },
    {
      id: 31,
      food: 'Paneer Roll',
      price: 149,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/e9179f9f2e1a4d2abcdfd6fc097f2e70',
      name: 'Subway',
      rating: 4.1,
    },
    {
      id: 32,
      food: 'Chocolate Lava Cake',
      price: 249,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/4e02f90b-1234-5678-9012-123456789012',
      name: 'Cake Bee',
      rating: 4.6,
    },
    {
      id: 33,
      food: 'Garlic Bread',
      price: 89,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/garlic_bread_example.jpg',
      name: 'Pizza Hut',
      rating: 4.0,
    },
    {
      id: 34,
      food: 'Paneer Delight Pizza',
      price: 329,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/paneer_pizza_example.jpg',
      name: 'Pizza Hut',
      rating: 4.3,
    },
    {
      id: 35,
      food: 'Veggie Supreme Pizza',
      price: 289,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/veggie_pizza_example.jpg',
      name: 'Pizza Hut',
      rating: 4.1,
    },
    {
      id: 36,
      food: 'Chicken Tikka Wrap',
      price: 219,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/chicken_tikka_wrap_example.jpg',
      name: 'Faasos',
      rating: 4.2,
    },
    {
      id: 37,
      food: 'Mango Smoothie',
      price: 159,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/mango_smoothie_example.jpg',
      name: 'Baskin Robbins',
      rating: 4.4,
    },
    {
      id: 38,
      food: 'Butter Chicken Pizza',
      price: 349,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/butter_chicken_pizza_example.jpg',
      name: "Domino's Pizza",
      rating: 4.4,
    },
    {
      id: 39,
      food: 'Paneer Tikka Sub',
      price: 219,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/paneer_tikka_sub_example.jpg',
      name: 'Subway',
      rating: 4.2,
    },
    {
      id: 40,
      food: 'Cheese Burst Pizza',
      price: 389,
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/cheese_burst_pizza_example.jpg',
      name: "Domino's Pizza",
      rating: 4.5,
    },
  ];

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
          <Routes>
            <Route path="/" element={<Home foodItems={foodItems} />} />
            <Route path="/menu" element={<Menu foodItems={foodItems} />} />
            <Route path="/search" element={<Search foodItems={foodItems} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </CartProvider>
    </FavoritesProvider>
  </ThemeProvider>
  );
}

export default App;
