import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";

function ProductCart({ data }) {
  const { thumbnail, price, category, title, id, discountPercentage, rating } = data;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const discountedPrice = discountPercentage 
    ? (price - (price * discountPercentage / 100)).toFixed(2)
    : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 opacity-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out group border border-gray-100 overflow-hidden">
        {/* Image with interactive elements */}
        <div className="relative h-56 overflow-hidden">
          {/* <Link to={`/products/${id}`} className="block h-full"> */}
            <img
              alt={title}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
              src={thumbnail}
            />
          {/* </Link> */}
          
          {/* Discount badge */}
          {discountPercentage && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              {Math.round(discountPercentage)}% OFF
            </div>
          )}
          
          {/* Quick actions */}
          <div className={`absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex justify-between items-center">
              <button className="text-white hover:text-pink-300 transition-colors">
                <FiEye size={18} />
              </button>
              <button 
                className={`text-white hover:text-pink-300 transition-colors ${isWishlisted ? 'text-pink-400 fill-pink-400' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <FiHeart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block bg-purple-100/80 text-purple-700 text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {category}
            </span>
            <div className="flex items-center bg-gray-100/80 rounded-full px-2 py-0.5">
              <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-700 text-xs font-medium ml-1">
                {rating || '4.8'}
              </span>
            </div>
          </div>

          {/* <Link to={`/products/${id}`}> */}
            <h3 className="text-gray-900 font-medium text-sm mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
              {title}
            </h3>
          {/* </Link> */}

          <div className="flex items-center justify-between mt-3">
            <div>
              {discountedPrice ? (
                <>
                  <span className="text-lg font-bold text-gray-900">${discountedPrice}</span>
                  <span className="text-xs text-gray-500 line-through ml-1.5">${price}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">${price}</span>
              )}
            </div>
            
            <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 group-[.cart-added]:bg-green-500">
              <FiShoppingCart size={16} />
            </button>
          </div>
        </div>

        {/* Ribbon for special items */}
        {category.toLowerCase().includes('new') && (
          <div className="absolute top-0 left-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-tr rounded-br uppercase tracking-wide shadow-md">
            New Arrival
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCart;



