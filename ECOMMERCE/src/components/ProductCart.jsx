// import { Link } from "react-router-dom"

// function ProductCart({item}){

//     const {thumbnail, price, category, title, id} = item
//     return(
        
//      <Link to={`/products/${id}`} >
//       <div>
//             <div className="lg:w-1/4 md:w-1/2 p-4 py-10 w-full shadow ">
//   <a className="block relative h-90 rounded overflow-hidden">
//     <img
//       alt="ecommerce"
//       className="object-cover object-center w-full h-full block"
//       src={thumbnail}
//     />
//   </a>
//   <div className="mt-4">
//     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
//       {category}
//     </h3>
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       {title}
//     </h2>
//     <p className="mt-1">$ {price} </p>
//   </div>
// </div>
// </div>
//      </Link>

        
//     )
// }

// export default ProductCart


import { Link } from "react-router-dom";

function ProductCart({ item }) {
  const { thumbnail, price, category, title, id } = item;

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 py-10 w-full shadow">
      <Link to={`/products/${id}`} className="block relative h-90 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={thumbnail}
        />
      

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <p className="mt-1">$ {price} </p>
      </div>
         </Link>
    </div>
 
  );
}

export default ProductCart;
