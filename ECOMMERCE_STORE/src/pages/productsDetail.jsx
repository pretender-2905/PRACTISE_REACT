import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

function ProductsDetail() {
  const params = useParams();
  const { id } = params;
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const { cartItems, addItemToCart, isItemAdded , decreaseItemFromCart} = useContext(CartContext)
  const [loading, setLoading] = useState(true)
  // const [addQuantity, setAddQuantity] = useState(0)
  // const [subtractQuantity, setSubtractQuantity] = useState(0)




  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProductDetail(res);
        console.log("RESPONSE FROM PRODUCT DETAIL PAGE:", res)
        setSelectedImage(0);
        setLoading(false)
      })
      .catch((error) => {
        console.log("ERROR=> ", error);
        setLoading(false)
      });
  }, [id]);
  const itemInCart = isItemAdded(productDetail.id)
  const quantity = itemInCart?.quantity || 0


  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <motion.svg
          key={`full-${i}`}
          fill="currentColor"
          className="w-5 h-5 text-yellow-400"
          viewBox="0 0 20 20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <motion.svg
          key="half"
          fill="currentColor"
          className="w-5 h-5 text-yellow-400"
          viewBox="0 0 20 20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: fullStars * 0.1 }}
        >
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <motion.svg
          key={`empty-${i}`}
          fill="#d1d5db"
          className="w-5 h-5 text-gray-300"
          viewBox="0 0 20 20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      <section className="text-gray-800 body-font overflow-hidden">
        <div className="container px-4 py-8 sm:px-5 sm:py-12 mx-auto">
          {/* Main Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-4/5 mx-auto flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-3 sm:mb-4 bg-gray-100">
                <motion.img
                  key={selectedImage}
                  alt={productDetail.title}
                  className="w-full h-full object-contain"
                  src={productDetail.images?.[selectedImage] || productDetail.thumbnail}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {productDetail.discountPercentage && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {productDetail.discountPercentage}% OFF
                  </div>
                )}
              </div>
              <div className="flex space-x-2 overflow-x-auto py-1 sm:py-2">
                {productDetail.images?.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleImageSelect(index)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 lg:pl-8 lg:py-8 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-widest">
                  {productDetail.brand || 'Premium Brand'}
                </span>
                <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                  {productDetail.title}
                </h1>
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {productDetail.rating ? renderRatingStars(productDetail.rating) : null}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {productDetail.rating || 'No'} rating ({productDetail.reviews?.length || 0} reviews)
                  </span>
                </div>
                <span className={`inline-block ${productDetail.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs px-3 py-1 rounded-full font-semibold mb-3`}>
                  {productDetail.stock ? `${productDetail.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <p className="leading-relaxed text-gray-700 text-sm sm:text-base mb-6">
                {productDetail.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center border-b-2 border-gray-100 pb-5 mb-5 space-y-3 sm:space-y-0">
                <div className="flex items-center mr-6">
                  <span className="mr-3 font-medium text-sm sm:text-base">Category:</span>
                  <span className="text-indigo-600 font-medium">{productDetail.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 font-medium text-sm sm:text-base">SKU:</span>
                  <span className="text-gray-600 font-medium">{id}</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-end mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ${productDetail.price}
                  </span>
                  {productDetail.discountPercentage && (
                    <span className="ml-3 line-through text-gray-500 text-lg">
                      ${(productDetail.price / (1 - productDetail.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                {productDetail.discountPercentage && (
                  <span className="text-green-600 font-semibold">
                    You save ${((productDetail.price / (1 - productDetail.discountPercentage / 100)) - productDetail.price).toFixed(2)} ({productDetail.discountPercentage}%)
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                  onClick={()=> decreaseItemFromCart(productDetail)}
                    disabled={quantity <= 0}
                    className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center text-gray-900 font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={() => {
                      addItemToCart(productDetail)
                    }
                    }
                    className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
         
              <div
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                   <Link to={"/cart"}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >

                  <div className="flex flex-row gap-5 jutify-center items-center">

                    <ShoppingCartIcon style={{ width: "26px", height: "26px" }} />

               Buy Now
                  </div>
          


                </motion.button>
                </Link >

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 flex items-center justify-center space-x-2 border ${isWishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'} py-3 px-6 rounded-xl font-medium shadow-sm hover:shadow-md transition-all`}
                >
                  <svg
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-white rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-lg">Specifications</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-600 w-32 text-sm">Brand</span>
                    <span className="text-gray-800 font-medium">{productDetail.brand || 'N/A'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 w-32 text-sm">Category</span>
                    <span className="text-gray-800 font-medium capitalize">{productDetail.category || 'N/A'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 w-32 text-sm">Availability</span>
                    <span className="text-gray-800 font-medium">{productDetail.stock ? 'In Stock' : 'Out of Stock'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 w-32 text-sm">Weight</span>
                    <span className="text-gray-800 font-medium">Approx. 1.2kg</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-lg">Warranty & Support</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">1 Year Warranty</h5>
                      <p className="text-gray-600 text-sm">Manufacturer warranty against defects</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">24/7 Support</h5>
                      <p className="text-gray-600 text-sm">Dedicated customer service team</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Easy Returns</h5>
                      <p className="text-gray-600 text-sm">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          {productDetail.reviews?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 bg-white rounded-2xl shadow-2xl p-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h3>
              <div className="space-y-6">
                {productDetail.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{review.reviewerName}</h4>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderRatingStars(review.rating)}
                          </div>
                          <span className="text-gray-600 text-sm">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.reviewerEmail}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsDetail;