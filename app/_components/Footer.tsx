// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Footer() {
//   const router = useRouter();
//   return (
//     <footer className="relative z-10 px-8 py-20 bg-white border-t border-black/[0.04]">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start pb-20">
//           <div className="space-y-6">
//             <h3 className="text-3xl font-black tracking-tighter uppercase italic">
//               Edufy<span className="text-black/20">.</span>
//             </h3>
//             <p className="text-black/40 text-sm leading-relaxed max-w-[280px] font-medium">
//               Empowering learners worldwide with industry-leading courses and a
//               focused minimalist environment.
//             </p>
//           </div>

//           <div className="flex flex-col md:items-center">
//             <div className="text-left">
//               <h4 className="font-bold text-black mb-6 uppercase text-[10px] tracking-[0.3em] opacity-30">
//                 Explore
//               </h4>
//               <ul className="space-y-4 text-[13px] font-semibold text-black/50">
//                 <li className="hover:text-black transition-colors cursor-pointer">
//                   All Courses
//                 </li>
//                 <li className="hover:text-black transition-colors cursor-pointer">
//                   Categories
//                 </li>
//                 <li className="hover:text-black transition-colors cursor-pointer">
//                   Live Classes
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="flex flex-col md:items-end">
//             <div className="text-left md:text-right">
//               <h4 className="font-bold text-black mb-6 uppercase text-[10px] tracking-[0.3em] opacity-30">
//                 Community
//               </h4>
//               <ul className="space-y-4 text-[13px] font-semibold text-black/50">
//                 <li className="hover:text-black transition-colors">
//                   <Link
//                     href="https://www.facebook.com/pinecone.academy.mongolia"
//                     target="_blank"
//                   >
//                     Facebook
//                   </Link>
//                 </li>
//                 <li className="hover:text-black transition-colors">
//                   <Link
//                     href="https://www.instagram.com/pineconemongolia/"
//                     target="_blank"
//                   >
//                     Instagram
//                   </Link>
//                 </li>
//                 <li className="hover:text-black transition-colors">
//                   <Link
//                     href="https://www.youtube.com/@PineconeAcademy/videos"
//                     target="_blank"
//                   >
//                     Youtube
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-black/[0.04] pt-10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             <p className="text-black/20 text-[10px] font-bold uppercase tracking-[0.2em]">
//               © 2026 Edufy. Pinecone Academy.
//             </p>
//             <div className="flex gap-8">
//               <p className="text-black/30 text-[11px] font-medium hover:text-black transition-colors cursor-pointer">
//                 Privacy Policy
//               </p>
//               <p
//                 className="text-black/30 text-[11px] font-medium hover:text-black transition-colors cursor-pointer"
//                 onClick={() => router.push("/termsOfService")}
//               >
//                 Terms of Service
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
export default function Footer() {
  return <div></div>;
}
