// import React from "react";
// import { useNavigate } from "react-router-dom";
// import templates from "../templates/templateData";

// function Home() {
//   const navigate = useNavigate();

//   const openTemplate = (id) => {
//     navigate(`/template/${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* HEADER */}
//       <header className="border-b border-slate-200 bg-white">
//         <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">
//               Proposal Studio
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Business Proposal Builder
//             </p>
//           </div>

         
//         </div>
//       </header>

//       {/* MAIN */}
//       <main className="mx-auto max-w-[1500px] px-8 py-12">
//         {/* TITLE */}
//         <div className="mb-10">
//           <h2 className="text-4xl font-bold tracking-tight">
//             Choose Your Template
//           </h2>

//           <p className="mt-3 text-base text-slate-500">
//             Select a professionally designed template to start your proposal.
//           </p>
//         </div>

//         {/* TEMPLATE GRID */}
//         <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
//           {templates.map((template) => {
//             const TemplateComponent = template.component;

//             if (!TemplateComponent) {
//               return null;
//             }

//             return (
//               <div key={template.id} className="group">
//                 {/* PREVIEW AREA */}
//                 <div
//                   onClick={() => openTemplate(template.id)}
//                   className="relative flex h-[420px] cursor-pointer items-center justify-center overflow-hidden rounded-[24px] bg-[#f3f4f6] p-6 transition-all duration-300 hover:bg-[#eceef1]"
//                 >
//                   {/* TEMPLATE PREVIEW */}
//                   <div className="relative h-full w-full overflow-hidden">
//                     <div
//                       className="absolute left-1/2 top-0 origin-top"
//                       style={{
//                         transform: "translateX(-50%) scale(0.48)",
//                       }}
//                     >
//                       <div className="w-[794px] min-h-[1123px] overflow-hidden rounded-sm bg-white shadow-xl">
//                         <TemplateComponent>
//                           <div className="space-y-4">
//                             <h2 className="text-xl font-bold">
//                               Executive Summary
//                             </h2>

//                             <p>
//                               Professional business proposal content preview.
//                             </p>

//                             <h3 className="font-bold">
//                               Our Services
//                             </h3>

//                             <p>
//                               Strategic solutions designed for your business.
//                             </p>
//                           </div>
//                         </TemplateComponent>
//                       </div>
//                     </div>
//                   </div>

//                   {/* HOVER BUTTON */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10">
//                     <button
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         openTemplate(template.id);
//                       }}
//                       className="translate-y-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
//                     >
//                       Open Template →
//                     </button>
//                   </div>
//                 </div>

//                 {/* TEMPLATE INFO */}
//                 <div className="mt-5">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="min-w-0">
//                       <h3 className="truncate text-lg font-semibold text-slate-900">
//                         {template.name}
//                       </h3>

//                       <p className="mt-1 truncate text-sm text-slate-500">
//                         {template.description}
//                       </p>
//                     </div>

//                     <span className="shrink-0 text-sm font-medium text-slate-400">
//                       {String(template.id).padStart(2, "0")}
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => openTemplate(template.id)}
//                     className="mt-4 text-sm font-semibold text-slate-900 transition hover:text-slate-500"
//                   >
//                     Preview →
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {/* FOOTER */}
//       <footer className="mt-12 border-t border-slate-200">
//         <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-6">
//           <p className="text-sm text-slate-400">
//             Proposal Studio
//           </p>

//           <p className="text-sm text-slate-400">
//             Create • Customize • Present
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;

import React from "react";

import { useNavigate } from "react-router-dom";

import templates from "../templates/templateData";

function Home() {
  const navigate =
    useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Proposal Studio
          </h1>

          <p className="mt-1 text-slate-500">
            Choose a professional proposal template
          </p>
        </div>
      </header>

      {/* TEMPLATES */}

      <main className="mx-auto max-w-7xl p-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map(
            (template) => {
              const TemplateComponent =
                template.component;

              return (
                <div
                  key={template.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* PREVIEW */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/template/${template.id}`
                      )
                    }
                    className="block w-full text-left"
                  >
                    <div className="template-thumbnail h-[420px] overflow-hidden bg-slate-200 p-5">
                      <div className="origin-top-left scale-[0.48]">
                        <TemplateComponent
                          pageNumber={1}
                          totalPages={1}
                          isCover={true}
                        >
                          <div className="flex h-full flex-col justify-center">
                            <div className="mb-5 h-1 w-20 bg-blue-600" />

                            <h2 className="text-5xl font-bold text-slate-900">
                              Executive Summary
                            </h2>

                            <p className="mt-5 text-xl text-slate-600">
                              Professional business proposal content preview.
                            </p>

                            <h3 className="mt-10 text-3xl font-bold">
                              Our Services
                            </h3>

                            <p className="mt-3 text-xl">
                              Strategic solutions designed for your business.
                            </p>
                          </div>
                        </TemplateComponent>
                      </div>
                    </div>

                    {/* INFO */}

                    <div className="p-5">
                      <h2 className="text-lg font-bold text-slate-900">
                        {template.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          template.description
                        }
                      </p>
                    </div>
                  </button>

                  {/* BUTTON */}

                  <div className="px-5 pb-5">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/template/${template.id}`
                        )
                      }
                      className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Select Template
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;