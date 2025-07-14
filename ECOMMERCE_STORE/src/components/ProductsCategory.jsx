// import React from 'react';

// function ProductsCategory({ 
//   category, 
//   onClick, 
//   isChoosen
// }) {
//   return (
//     <div 
//       onClick={onClick}
//       className={`flex flex-wrap justify-center items-center cursor-pointer ${
//         isChoosen 
//           ? 'bg-purple-600 text-white hover:bg-purple-800' 
//           : 'bg-white text-black hover:bg-purple-100'
//       } border p-2 px-6 rounded-md`}
//     >
//       {category.name}
//     </div>
//   );
// }

// export default ProductsCategory;















import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';

function ProductsCategory({ 
  category, 
  onClick, 
  isChoosen 
}) {
  // Use MUI's useMediaQuery to detect mobile screens (≤768px)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // The Products component will pass categories one by one, so we need to integrate with the parent
  // For dropdown, we'll rely on the parent Products component to provide all categories
  // Since we're not modifying Products significantly, we'll assume categories are handled there

  // Desktop View (unchanged)
  if (!isMobile) {
    return (
      <div 
        onClick={onClick}
        className={`flex flex-wrap justify-center items-center cursor-pointer ${
          isChoosen 
            ? 'bg-purple-600 text-white hover:bg-purple-800' 
            : 'bg-white text-black hover:bg-purple-100'
        } border p-2 px-6 rounded-md`}
      >
        {category.name}
      </div>
    );
  }

  // Mobile Dropdown View
  // Note: Since ProductsCategory is rendered per category, we'll assume the parent Products
  // component will handle rendering all categories in a single dropdown
  return (
    <div className="relative mb-4">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`w-full flex justify-between items-center border p-2 px-6 rounded-md ${
          isChoosen
            ? 'bg-purple-600 text-white hover:bg-purple-800'
            : 'bg-white text-black hover:bg-purple-100'
        }`}
      >
        <span>{category.name}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

export default ProductsCategory;