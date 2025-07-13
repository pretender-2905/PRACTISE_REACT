import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useContext } from "react";
import { StarIcon, ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductsDetail from "../pages/productsDetail";

function ProductsCart({ data }) {
  const { thumbnail, price, category, title, rating, id } = data;
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef(null);
  const { cartItems, addItemToCart } = useContext(CartContext)


  // Animation variants
  const cardVariants = {
    initial: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.01 },
    tap: { scale: 0.98 }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 }
  };

  const buttonVariants = {
    initial: { y: 50, opacity: 0 },
    hover: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 }
  };

  const likeButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    liked: { scale: [1.2, 1], color: "#ef4444" }
  };

  return (
    <Link to={`/products/${id}`}>
      <div
        ref={cardRef}
        className="cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <motion.div
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          whileTap="tap"
          variants={cardVariants}
          className="p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full"
        >
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            New
          </div>

          {/* Like button */}
          <motion.button
            variants={likeButtonVariants}
            animate={isLiked ? "liked" : "initial"}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
            whileTap={{ scale: 0.9 }}
          >
            <HeartIcon className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </motion.button>

          {/* Product Image */}
          <motion.div
            className="block relative h-60 rounded-xl overflow-hidden mb-4"
            variants={imageVariants}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              alt={title}
              className="object-cover object-center w-full h-full block"
              src={thumbnail}
            />

            {/* Quick add button (appears on hover) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 backdrop-blur-sm"
                  initial="initial"
                  animate="hover"
                  exit="exit"
                  variants={buttonVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();       // ✅ Stop bubbling
                      e.preventDefault();        // ✅ Prevent link navigation
                      addItemToCart(data)
                      setIsAdded(true);
                    
                    }}
                    className="w-full py-2 bg-white text-gray-900 rounded-lg flex items-center justify-center gap-2 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    {isAdded ? "Added!" : "Quick Add"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Rest of your product info... */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {category}
            </span>

            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
              {title}
            </h3>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">{rating}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
                {price > 50 && (
                  <span className="text-xs line-through text-gray-400">${(price * 1.2).toFixed(2)}</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-indigo-600 text-white rounded-full shadow-md"
              >
                <ShoppingBagIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {price > 50 && (
            <motion.div
              className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round((0.2 / 1.2) * 100)}% OFF
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
}

export default ProductsCart;