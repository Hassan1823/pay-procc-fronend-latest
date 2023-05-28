// import React from "react";
// import axios from "axios";
// const Page = () => {
// const [post, setPost]= React.useState({
//     business_name: '',
//     website: '',
// })
//     const handleInput=(event)=>{
//         setPost({...post, [event.target.name]: event.target.value})
//    }

//    function handleSubmit(event){
//     event.preventDefault()
//     axios.post('http://3.78.33.138:8000/api/api_merchant_create', {post})
//     .then(response => console.log(response))
//     .catch(err => console.log(err))

//    }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="text-black">
//         Tittle: <input type="text" name="business_name" onChange={handleInput}/>
//         <br />
//         <br />
//         Post: <input type="text" name="website" onChange={handleInput} />
//         <br />
//         <br />
//         <button type="submit" className="bg-white">Submit</button>
//       </form>
//     </>
//   );
// };

// export default Page;
