import { useContext } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { AuthContext } from "./firebase config/Private";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Heading from "../Sheare/Heading";

const Customreq = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { data: Request = [], } = useQuery({
      queryKey: ["Request"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/Request?email=${user?.email}`);
        return res.data;
      },
    });
    const req = Request.filter((req) => req.reason);
    return (
        <div className="mt-32">
            <Heading title={`My Custom Request`}></Heading>
        <div className="mt-10 mb-32">
       {req.length == 0 &&
       <div>
           <h1 className="mt-20 font-semibold text-3xl text-center ">No Custom Resuest</h1>
       </div> 
       }
       {!req.length == 0 &&
       <div>
          <div className="overflow-x-auto mt-10">
     <table className="table table-zebra bg-green-200 w-full">
       <thead>
         <tr>
           <th></th>
           <th>Asset Name</th>
           <th>Asset Type</th>
           <th> Email of requester</th>
           <th>Request Date</th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody>
         {req.map((Req, index) => (
           <tr key={Req._id}>
             <th>{index + 1}</th>
             <td>{Req.name}</td>
             <td>{Req.type}</td>
             <td>{Req.useremail}</td>
             <td>{Req.reqdate}</td>
             <td
               className="text-lg"
               style={{
                 color:
                   Req.Status === "Approved"
                     ? "green"
                     : Req.Status === "Rejected"
                     ? "red"
                     : "",
               }}
             >
               {Req.Status}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
   <Link className="btn bg-pink-400 text-white mt-20" to={`MyAsset`}>View Request</Link>
       </div> 
       }
   </div>
   </div>
    );
};

export default Customreq;