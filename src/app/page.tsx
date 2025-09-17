import ClientDashboard from "@/components/ClientDashboard";
import { fetchStudents } from "@/lib/data";

export default async function Home() {
  const payload = await fetchStudents();
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Cognitive Skills & Student Performance Dashboard
      </h1>
      <ClientDashboard initialData={payload} />
    </div>
  );
}
