import React from 'react';

function ProductsCategory({ 
  category, 
  onClick, 
  isChoosen
}) {
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

export default ProductsCategory;

