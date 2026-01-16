import React from "react";

// Iconos SVG puros (Heroicons) - No pesan nada y son instantáneos
const IconHome = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);
const IconContract = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);
const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
);

const StatCard = ({ label, value, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#bc81a7]">
      {label}
    </span>
    <div className="text-3xl font-bold text-[#0a070e] mt-2">{value}</div>
    <p className="text-xs text-gray-400 mt-2 font-medium">{description}</p>
  </div>
);

const SidebarLink = ({ children, label, active = false }) => (
  <button
    className={`flex items-center gap-4 w-full px-6 py-3 text-sm font-semibold transition-all border-l-4 ${
      active
        ? "bg-[#7d64ad] text-white border-[#bc81a7]"
        : "text-gray-400 border-transparent hover:bg-[#fbfafd] hover:text-[#7d64ad]"
    }`}
  >
    {children}
    {label}
  </button>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fbfafd] flex flex-col text-[#0a070e]">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7d64ad] rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-bold tracking-tight text-lg">ArriendaApp</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#cea3c9] border-2 border-white shadow-sm" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col py-6">
          <SidebarLink label="Dashboard" active>
            <IconHome />
          </SidebarLink>
          <SidebarLink label="Contratos">
            <IconContract />
          </SidebarLink>
          <SidebarLink label="Inquilinos">
            <IconUsers />
          </SidebarLink>
        </aside>

        {/* Viewport */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl font-bold">Panel de Control</h1>
              <p className="text-sm text-gray-500">
                Bienvenido, aquí está el resumen de hoy.
              </p>
            </div>
            <button className="bg-[#7d64ad] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#7d64ad]/20 hover:scale-105 transition-transform">
              Nuevo Contrato
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Propiedades"
              value="24"
              description="+2 esta semana"
            />
            <StatCard
              label="Recaudación"
              value="$12.3k"
              description="Meta: $15k"
            />
            <StatCard
              label="Alertas"
              value="05"
              description="Vencimientos próximos"
            />
          </div>

          {/* Area para que metas tu logica de Backend mas adelante */}
          <section className="mt-10 bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="w-16 h-16 bg-[#fbfafd] rounded-full flex items-center justify-center mb-4">
              <IconContract />
            </div>
            <h3 className="font-bold text-gray-400">
              Sin datos de contratos todavía
            </h3>
            <p className="text-xs text-gray-300 max-w-[200px] mt-2">
              Cuando conectes tu base de datos, aquí aparecerá el listado.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
