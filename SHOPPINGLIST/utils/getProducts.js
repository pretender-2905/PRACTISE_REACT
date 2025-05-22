export async function getAllProducts(){
        try{
            const products = await fetch('https://api.escuelajs.co/api/v1/products')
        .then((res)=> res.json())
        return products
        }
        catch{
            throw Error("Something went wrong!!!")
        }
}